"use client";
import React, { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase-config";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        try {
          console.log("🟡 Login terdeteksi. UID:", user.uid);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("✅ Dokumen user ditemukan di Firestore");

            // Perbarui photoURL jika kosong
            if (!docSnap.data().photoURL && user.photoURL) {
              console.log("🔁 Memperbarui photoURL di Firestore...");
              await setDoc(docRef, { photoURL: user.photoURL }, { merge: true });
            }

            setUserProfile({
              ...docSnap.data(),
              uid: user.uid,
              email: user.email,
              photoURL: docSnap.data().photoURL || user.photoURL || null, // fallback
              name: user.displayName || docSnap.data().name || "Pengguna",
            });

          } else {
            console.log("📄 Dokumen tidak ditemukan. Membuat user baru...");
            const newUserProfile = {
              name: user.displayName || "Pengguna",
              email: user.email,
              photoURL: user.photoURL || null,
              role: "user",
            };
            await setDoc(docRef, newUserProfile);
            console.log("✅ Profil baru berhasil dibuat");

            setUserProfile({
              uid: user.uid,
              ...newUserProfile,
            });
          }

        } catch (error) {
          console.error("❌ Gagal memuat profil pengguna:", error);
          setUserProfile({
            uid: user.uid,
            email: user.email,
            name: user.displayName || "Pengguna",
            photoURL: user.photoURL || null,
          });
        }
      } else {
        console.log("👤 Tidak ada user login");
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => {
    return signOut(auth);
  };

  const refreshUserProfile = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile({
          uid: currentUser.uid,
          email: currentUser.email,
          photoURL: docSnap.data().photoURL || currentUser.photoURL || null,
          name: docSnap.data().name || currentUser.displayName || "Pengguna",
          ...docSnap.data(),
        });
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
