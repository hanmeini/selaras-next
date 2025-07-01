"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link'; 
import { useRouter } from 'next/navigation';
import { auth, provider } from "../../lib/firebase-config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect
} from "firebase/auth";
import { useAuth } from "../../context/Authcontext"; 
import { getRedirectResult } from "firebase/auth";

const Login = () => {
    const router = useRouter();
    const { userProfile } = useAuth(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        if (userProfile) {
            console.log("Login dan profil siap, mengarahkan ke /rekomendasi");
            router.replace("/rekomendasi"); 
        }
    }, [userProfile, router]);

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error("Email login error:", err.code, err.message);
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setError("Email atau kata sandi yang Anda masukkan salah.");
            } else {
                setError("Terjadi kesalahan. Silakan coba lagi.");
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchRedirectResult = async () => {
            try {
            const result = await getRedirectResult(auth);
            if (result?.user) {
                console.log("Login berhasil lewat redirect:", result.user);
                router.push("/rekomendasi");
            }
            } catch (err) {
            console.error("❌ Error dari redirect login:", err.code, err.message);
            }
        };

        fetchRedirectResult();
        }, []);

    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error("Google login error:", err.code, err.message);
            if (err.code === 'auth/popup-closed-by-user') {
            setError("Proses login dengan Google dibatalkan.");
            } else {
            setError("Gagal masuk dengan Google. Silakan coba lagi.");
            }
            setLoading(false);
        }
    };


    return (
        <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">
            
            {/*  GAMBAR (Hanya Desktop) */}
            <div className="hidden lg:block relative h-screen">
                <img
                    src='/images/login.png'
                    alt="background"
                    className="h-full w-full object-cover"
                />
                <button onClick={() => router.push('/')} className="z-10 absolute top-5 left-5 w-12 h-12 flex items-center justify-center text-white text-2xl border border-white rounded-full hover:bg-white hover:text-[#003366] transition">
                    ←
                </button>
                <div className="absolute inset-0 bg-[#003366]/55 flex flex-col justify-end p-12 text-white">
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold">Temukan Tempat, Temukan Cerita</h1>
                        <p className="text-xl mt-2">Jelajahi destinasi yang sesuai dengan suasana hatimu.</p>
                    </div>
                </div>
            </div>

            {/* FORM (Layout Responsif) */}
            <div 
                className="
                    relative h-screen flex flex-col justify-center items-center p-4 
                    bg-cover bg-center bg-[url('/images/login.png')] lg:bg-none lg:bg-white"
                >
                <div className="absolute inset-0 bg-[#003366]/55 lg:hidden"></div>
                <button onClick={() => router.push('/')} className="lg:hidden z-10000 absolute top-0 left-5 w-10 h-10 flex items-center justify-center text-white text-2xl border border-white rounded-full hover:bg-white hover:text-[#003366] transition">
                    ←
                </button>

                <div className="relative z-10 w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl lg:shadow-none lg:rounded-none lg:flex lg:flex-col lg:justify-center">
                    <div className="w-full">
                        <div className="flex justify-center mb-6">
                            <img src='/images/Unlock.png' alt="Unlock Icon" />
                        </div>
                        <h2 className="text-3xl font-semibold text-gray-800 text-center">Masuk ke Selaras</h2>
                        <p className="text-gray-500 mt-1 mb-6 text-center">Akses rekomendasi personal hanya untukmu.</p>
                        
                        {error && <p className="bg-red-100 text-red-700 text-center p-3 rounded-lg mb-4 text-sm">{error}</p>}
                        
                        <button onClick={handleGoogleLogin} disabled={loading} className="w-full flex items-center justify-center gap-2 border rounded-full px-6 py-3 hover:bg-gray-50 transition disabled:opacity-50">
                            <img src="https://img.icons8.com/color/48/000000/google-logo.png" className="w-5 h-5" alt="Google Logo"/>
                            <span className="text-sm font-semibold text-gray-700">{loading ? 'Memproses...' : 'Masuk dengan Google'}</span>
                        </button>

                        <div className="my-6 w-full flex items-center justify-between">
                            <hr className="w-2/5 border-gray-300" />
                            <span className="text-xs text-gray-400">ATAU</span>
                            <hr className="w-2/5 border-gray-300" />
                        </div>
                        
                        <form onSubmit={handleEmailLogin} className="w-full flex flex-col gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1 block text-left">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contoh@gmail.com" className="w-full rounded-full bg-gray-100 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1 block text-left">Kata Sandi</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan kata sandi" className="w-full rounded-full bg-gray-100 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <button type="submit" disabled={loading} className="bg-[#003366] text-white rounded-full py-3 mt-2 font-semibold hover:bg-blue-800 transition disabled:bg-blue-300">
                                {loading ? 'Memproses...' : 'Masuk'}
                            </button>
                        </form>

                        <p className="mt-6 text-sm text-gray-500 text-center">
                            Belum punya akun?{" "}
                            <Link href="/register" className="text-[#003366] font-medium hover:underline">
                                Daftar
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;