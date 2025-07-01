"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/Authcontext"; 
import { FiHome, FiHelpCircle, FiSend, FiMail, FiUser, FiChevronRight, FiChevronDown, FiLogOut } from 'react-icons/fi';


const DefaultAvatar = ({ className = 'w-10 h-10' }) => ( 
  <div className={`${className} rounded-full bg-gray-200 flex items-center justify-center border-2 border-white shadow`}>
    <img src='/images/person-icon.png' alt="person icon" className="w-1/2 h-1/2" />
  </div> 
);
const HamburgerIcon = () => ( <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 14.5833H22.9167C23.4692 14.5833 23.9991 14.8028 24.3898 15.1935C24.7805 15.5842 25 16.1141 25 16.6666C25 17.2192 24.7805 17.7491 24.3898 18.1398C23.9991 18.5305 23.4692 18.75 22.9167 18.75H12.5C11.9475 18.75 11.4176 18.5305 11.0269 18.1398C10.6362 17.7491 10.4167 17.2192 10.4167 16.6666C10.4167 16.1141 10.6362 15.5842 11.0269 15.1935C11.4176 14.8028 11.9475 14.5833 12.5 14.5833ZM27.0834 31.25H37.5C38.0526 31.25 38.5825 31.4695 38.9732 31.8602C39.3639 32.2509 39.5834 32.7808 39.5834 33.3333C39.5834 33.8858 39.3639 34.4158 38.9732 34.8065C38.5825 35.1972 38.0526 35.4166 37.5 35.4166H27.0834C26.5308 35.4166 26.0009 35.1972 25.6102 34.8065C25.2195 34.4158 25 33.8858 25 33.3333C25 32.7808 25.2195 32.2509 25.6102 31.8602C26.0009 31.4695 26.5308 31.25 27.0834 31.25ZM12.5 22.9166H37.5C38.0526 22.9166 38.5825 23.1361 38.9732 23.5268C39.3639 23.9175 39.5834 24.4474 39.5834 25C39.5834 25.5525 39.3639 26.0824 38.9732 26.4731C38.5825 26.8638 38.0526 27.0833 37.5 27.0833H12.5C11.9475 27.0833 11.4176 26.8638 11.0269 26.4731C10.6362 26.0824 10.4167 25.5525 10.4167 25C10.4167 24.4474 10.6362 23.9175 11.0269 23.5268C11.4176 23.1361 11.9475 22.9166 12.5 22.9166Z" fill="#003366"/></svg>);
const CloseIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> );


export default function Navbar() {
  const { userProfile, logout, loading  } = useAuth();
  const router = useRouter();
  const [layananOpen, setLayananOpen] = useState(false);
  const layananRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLayananOpen, setMobileLayananOpen] = useState(false);


  const toggleLayanan = () => setLayananOpen(!layananOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      setMobileMenuOpen(false); 
      router.push('/login');
    } catch (error) {
      console.error("Gagal untuk logout", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (layananRef.current && !layananRef.current.contains(event.target)) setLayananOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    console.log("⏳ Auth masih loading, Navbar belum ditampilkan.");
    console.log("📦 Navbar: userProfile =", userProfile);
    return null;
  }

  // animasi
  const sidebarVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  // untuk masing-masing item
  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: "tween" } },
  };


  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-lg shadow-sm p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto h-12">
          
          {/* Hamburger (Mobile) atau Logo (Desktop) */}
          <div className="flex-1 flex justify-start">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 -ml-2 text-gray-700">
              <HamburgerIcon />
            </button>
            <Link href="/" className="hidden md:block">
              <img src='/images/logoSelaras.png' alt="logo" className="h-12 w-auto object-contain" />
            </Link>
          </div>
          
          {/*  Navigasi Desktop */}
          <div className="hidden md:flex flex-auto justify-center items-center gap-10 text-sm font-medium text-[#2E2E2E]">
            <div className="relative" ref={layananRef}>
                <button onClick={toggleLayanan} className="flex items-center gap-1 hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                    Jelajahi
                    <FiChevronDown className={`transition-transform duration-200 ${layananOpen ? 'rotate-180' : ''}`} />
                </button>
                {layananOpen && (
                  <div 
                    ref={layananRef} 
                    className="absolute top-full mt-4 bg-white shadow-lg rounded-xl p-4 z-50 flex flex-col w-max items-start gap-1 border border-gray-100"
                  >
                    <p className="text-gray-400 text-xs font-semibold uppercase px-3 pb-2">Layanan</p>
                    
                    <Link 
                      href='/SelarasAI' 
                      onClick={() => setLayananOpen(false)} 
                      className="flex flex-row gap-3 items-center hover:bg-gray-100 p-3 rounded-lg w-full"
                    >
                      <img className="bg-[#003366] p-3 object-contain rounded-xl w-12 h-12" src='/images/stars.png' alt="Selaras AI"/>
                      <div className="flex-col flex items-start">
                        <p className="font-semibold text-sm">Selaras AI</p>
                        <p className="text-gray-500 text-xs">Tanya AI seputar liburanmu.</p>
                      </div>
                    </Link>
                    
                    <Link 
                      href='/quiz' 
                      onClick={() => setLayananOpen(false)} 
                      className="flex flex-row gap-3 items-center hover:bg-gray-100 p-3 rounded-lg w-full"
                    >
                      <img className="bg-[#003366] p-3 object-contain rounded-xl w-12 h-12" src='/images/quiz.png' alt="Selaras Quiz"/>
                      <div className="flex-col flex items-start">
                        <p className="font-semibold text-sm">Selaras Quiz</p>
                        <p className="text-gray-500 text-xs max-w-[200px] text-left">Cari tahu tempat paling pas untukmu.</p>
                      </div>
                    </Link>
                  </div>
                )}
            </div>
            <Link href="/rekomendasi" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 ease-in-out">Rekomendasi</Link>
            <Link href="/kontak" className="hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 ease-in-out">Kontak Kami</Link>
          </div>
          
          {/* Logo (Mobile) atau Profil/Daftar (Desktop) */}
          <div className="flex-1 flex items-center justify-end">
            <Link href="/" className="md:hidden">
                <img src='/images/logo-pp.png' alt="logo" className="h-12 w-auto" />
            </Link>
            <div className="hidden md:flex">
              {userProfile ? (
                <div className="relative" ref={profileRef}>
                  <button onClick={toggleProfile}>
                    {userProfile.photoURL ? <img src={userProfile.photoURL} alt="Profil" className="w-10 h-10 rounded-full object-cover"/> : <DefaultAvatar />}
                  </button>
                  {profileOpen && ( 
                    <div className="absolute top-full mt-3 right-0 bg-white shadow-lg rounded-xl p-4 z-50 w-60 border">
                      <div className="border-b pb-3 mb-3">
                        <p className="font-bold text-sm truncate text-left">{userProfile.name || 'Pengguna'}</p>
                        <p className="text-xs text-gray-500 truncate text-left">{userProfile.email}</p>
                      </div>
                      <Link href="/profile" onClick={() => setProfileOpen(false)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Profil Saya</Link>
                      {userProfile.role === 'admin' && (
                         <Link href="/admin/dashboard" onClick={() => setProfileOpen(false)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Dashboard Admin</Link>
                      )}
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md font-medium">Logout</button>
                    </div>
                  )}
                </div>
              ) : (
              <Link href='/register' className="hidden md:flex items-center justify-between bg-[#003366] w-32 h-11 rounded-full text-[#FAFAFA] font-medium px-3">
                <span className="ml-2">Daftar</span>
                <div className="ml-auto flex items-center justify-center md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full bg-[#FAFAFA]">
                  <img src='/images/person-icon.png' alt="person icon" className="w-4 h-4" />
                </div>
              </Link>
            )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- Panel Menu Mobile --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 h-full w-full bg-black/50 z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="flex justify-between items-center p-4 border-b">
                <img src='/images/logoSelaras.png' alt="logo" className="h-10 w-auto" />
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 transition hover:rotate-90 duration-300">
                  <CloseIcon />
                </button>
            </div>
            <motion.nav
              className="flex flex-col p-4 space-y-1"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1, // jeda antar item
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {[
                userProfile ? (
                  <motion.div key="profile" variants={{ hidden: { x: -30, opacity: 0 }, show: { x: 0, opacity: 1 } }}>
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 mb-2 rounded-lg bg-gray-100">
                      {userProfile.photoURL ? <img src={userProfile.photoURL} alt="Profil" className="w-10 h-10 rounded-full object-cover"/> : <DefaultAvatar />}
                      <div className="truncate justify-start flex flex-col">
                        <p className="font-bold text-sm text-gray-800 text-left">{userProfile.name || 'Pengguna'}</p>
                        <p className="text-xs text-gray-500">{userProfile.email}</p>
                      </div>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div key="register" variants={{ hidden: { x: -30, opacity: 0 }, show: { x: 0, opacity: 1 } }}>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-3 mb-2 text-gray-700 font-medium rounded-lg bg-blue-50 hover:bg-blue-100">
                      <span className="flex items-center gap-3"><FiUser className="w-6 h-6" />Daftar</span>
                      <FiChevronRight className="w-6 h-6" />
                    </Link>
                  </motion.div>
                ),
                <motion.div key="rekomendasi" variants={{ hidden: { x: -30, opacity: 0 }, show: { x: 0, opacity: 1 } }}>
                  <Link href="/rekomendasi" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100">
                    <FiHome className="w-6 h-6" /> Rekomendasi
                  </Link>
                </motion.div>,
                <motion.div key="jelajahi" variants={{ hidden: { x: -30, opacity: 0 }, show: { x: 0, opacity: 1 } }}>
                  <button onClick={() => setMobileLayananOpen(!mobileLayananOpen)} className="flex items-center justify-between w-full p-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100">
                    <span className="flex items-center gap-3"><FiSend className="w-6 h-6" /> Jelajahi</span>
                    <FiChevronDown className={`transition-transform ${mobileLayananOpen ? 'rotate-180' : ''} w-6 h-6`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileLayananOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden pl-8 pt-1 space-y-1"
                      >
                        <Link href="/SelarasAI" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2 font-medium text-gray-600 rounded-lg hover:bg-gray-100">
                          <img className="w-10 h-10 bg-[#003366] p-2 rounded-xl" src='/images/stars.png' alt="ai icon" /> Selaras AI
                        </Link>
                        <Link href="/quiz" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-2 font-medium text-gray-600 rounded-lg hover:bg-gray-100">
                          <img className="w-10 h-10 bg-[#003366] p-2 rounded-xl" src='/images/quiz.png' alt="quiz icon" /> Selaras Quiz
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>,
                <motion.div key="kontak" variants={{ hidden: { x: -30, opacity: 0 }, show: { x: 0, opacity: 1 } }}>
                  <Link href="/kontak" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-gray-700 font-medium rounded-lg hover:bg-gray-100">
                    <FiMail className="w-6 h-6" /> Kontak Kami
                  </Link>
                </motion.div>,
                userProfile && (
                  <motion.div key="logout" variants={{ hidden: { x: -30, opacity: 0 }, show: { x: 0, opacity: 1 } }}>
                    <hr className="my-2" />
                    <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-600 font-medium rounded-lg hover:bg-red-50">
                      <FiLogOut className="w-6 h-6" /> Logout
                    </button>
                  </motion.div>
                )
              ]}
            </motion.nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}