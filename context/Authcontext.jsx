"use client"
import React, { useContext, useState, useEffect, createContext } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase-config'; // Pastikan path ini benar

// Buat context auth
const AuthContext = createContext(null);

// Custom hook untuk akses context
export function useAuth() {
  return useContext(AuthContext);
}

// Provider utama
export function AuthProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     console.log("⏳ Menunggu auth...");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
         console.log("📌 onAuthStateChanged triggered:", user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        try {
          console.log('🟡 Login terdeteksi. UID:', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log('✅ Dokumen user ditemukan. Menggabungkan data...');
            setUserProfile({
              ...docSnap.data(),
              uid: user.uid,
              email: user.email,
              photoURL: user.photoURL,
              name: user.displayName || docSnap.data().name || 'Pengguna Baru',
            });
          } else {
            console.log('📄 Dokumen tidak ditemukan. Membuat user baru...');
            const newUserProfile = {
              name: user.displayName || 'Pengguna Baru',
              email: user.email,
              photoURL: user.photoURL || null,
              role: 'user',
              createdAt: serverTimestamp(),
            };
            await setDoc(docRef, newUserProfile);
            console.log('✅ Profil baru berhasil dibuat');

            setUserProfile({
              uid: user.uid,
              ...newUserProfile,
            });
          }
        } catch (error) {
          console.error('❌ Gagal memuat profil pengguna:', error);
          await signOut(auth); // logout paksa jika error
        }
      } else {
        console.log('👤 Tidak ada user login');
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = () => {
    return signOut(auth);
  };

  const refreshUserProfile = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      console.log('🔄 Memperbarui profil dari Firestore...');
      const docRef = doc(db, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile({
          ...docSnap.data(),
          uid: currentUser.uid,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          name: currentUser.displayName || docSnap.data().name || 'Pengguna Baru',
        });
        console.log('✅ Profil berhasil diperbarui di state.');
      }
    }
  };

  const value = {
    userProfile,
    loading,
    logout,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
