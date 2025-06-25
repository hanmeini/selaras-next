// Kode yang benar
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Authcontext'; // Sesuaikan path

const PrivateRoute = ({ children }) => {
  const { userProfile } = useAuth(); // GUNAKAN userProfile, BUKAN currentUser

  // Jika loading state ada, Anda juga bisa menampilkannya di sini
  // const { userProfile, loading } = useAuth();
  // if (loading) return <div>Loading...</div>;

  return userProfile ? children : <Navigate to="/login" />;
};

export default PrivateRoute;