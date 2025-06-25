import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Authcontext'; // Sesuaikan path

const AdminRoute = ({ children }) => {
  const { userProfile, loading } = useAuth();
   console.log('AdminRoute Check:', { userProfile, loading }); // TAMBAHKAN LOG INI

  // Jika user ada DAN rolenya adalah 'admin', tampilkan halaman.
  if (userProfile && userProfile.role === 'admin') {
    return children;
  }

  // Jika tidak, arahkan ke halaman utama atau halaman login.
  return <Navigate to="/" />;
};

export default AdminRoute;