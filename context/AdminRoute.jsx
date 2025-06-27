"use client";
import { useAuth } from './Authcontext'; // sesuaikan path
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminOnly = ({ children }) => {
  const { userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!userProfile || userProfile.role !== 'admin')) {
      router.replace('/'); 
    }
  }, [userProfile, loading, router]);

  if (loading || !userProfile) {
    return <p>Loading...</p>;
  }

  if (userProfile.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
};

export default AdminOnly;