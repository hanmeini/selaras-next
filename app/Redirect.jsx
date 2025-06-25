import { useEffect, useState } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Memproses login...');

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const user = result.user;

          // 1. Cek apakah user profile sudah ada
          const profileRef = doc(db, `users/${user.uid}/profile/data`);
          const profileSnap = await getDoc(profileRef);

          // 2. Jika belum, buat profil default
          if (!profileSnap.exists()) {
            await setDoc(profileRef, {
              fullName: user.displayName || user.email,
              email: user.email,
              photoURL: user.photoURL || '',
              createdAt: new Date()
            });
          }

          // 3. Arahkan ke rekomendasi
          setStatus("Login berhasil. Mengarahkan...");
          setTimeout(() => navigate('/rekomendasi'), 1000);
        } else {
          setStatus("Login gagal. Kembali ke login.");
          setTimeout(() => navigate('/login'), 1500);
        }
      } catch (error) {
        console.error("Redirect error:", error);
        setStatus("Terjadi kesalahan saat login.");
        setTimeout(() => navigate('/login'), 1500);
      }
    };

    handleRedirect();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-gray-600">{status}</p>
    </div>
  );
};

export default RedirectHandler;
