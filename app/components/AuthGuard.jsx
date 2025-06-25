"use client";

import { useEffect } from 'react';
import { useAuth } from '@/context/Authcontext'; 
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }) {
  const { userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!userProfile) {
      router.push('/login');
    }
  }, [userProfile, loading, router]); 
  if (loading || !userProfile) {
    return <div className="flex justify-center items-center h-screen">Silahkan Login Terlebih Dahulu...</div>;
  }
  return <>{children}</>;
}
