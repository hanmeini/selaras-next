import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/Authcontext';
import { updateProfile } from "firebase/auth";
import { db, auth } from '../../firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiCamera } from 'react-icons/fi';

const ProfilePage = () => {
  const { userProfile, logout, refreshUserProfile } = useAuth(); 
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setEmail(userProfile.email || '');
      setPhoneNumber(userProfile.phoneNumber || '');
    }
  }, [userProfile]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Gagal untuk logout", error);
    }
  };

  const handleUpdateProfile = async (e) => {
      e.preventDefault();
      if (!userProfile) return;

      setIsLoading(true);
      setMessage('Menyimpan perubahan...');

      let newPhotoURL = userProfile.photoURL; 

      if (imageFile) {
          console.log("Mengupload gambar baru...");
          const formData = new FormData();
          formData.append('file', imageFile);
          formData.append('upload_preset', 'akk5fymr');

          try {
              const response = await fetch(
                  `https://api.cloudinary.com/v1_1/dtjg8wcls/image/upload`, 
                  { method: 'POST', body: formData }
              );
              const data = await response.json();
              newPhotoURL = data.secure_url;
              console.log("Upload berhasil, URL baru:", newPhotoURL);
          } catch (uploadError) {
              setMessage('Gagal mengupload gambar.');
              console.error("Cloudinary upload error:", uploadError);
              setIsLoading(false);
              return;
          }
      }

      const userDocRef = doc(db, 'users', userProfile.uid);
      const dataToUpdate = {
          name: name,
          phoneNumber: phoneNumber,
          photoURL: newPhotoURL, 
      };

      try {
          await updateProfile(auth.currentUser, { 
              displayName: name, 
              photoURL: newPhotoURL 
          });

          await updateDoc(userDocRef, dataToUpdate);
          await refreshUserProfile(); 

          setMessage('Profil berhasil diperbarui!');
          setIsEditing(false);
          setImageFile(null);
          setImagePreview('');
      } catch (error) {
          setMessage('Gagal memperbarui profil.');
          console.error("Error updating profile:", error);
      } finally {
          setIsLoading(false);
      }
  };

  if (!userProfile) {
    return <div>Memuat data profil...</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4 lg:w-1/5 shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-md text-center h-full">
              <div className="relative w-24 h-24 mx-auto mb-4">
                  <img 
                    src={imagePreview || userProfile.photoURL || `https://ui-avatars.com/api/?name=${name || 'S'}&background=random`} 
                    alt="Foto Profil" 
                    className="w-full h-full object-cover rounded-full border-2 border-gray-200 shadow-sm"
                  />
                  {isEditing && (
                    <label htmlFor="file-upload" className="absolute -bottom-1 -right-1 bg-[#003366] p-2 rounded-full cursor-pointer hover:bg-blue-700 border-2 border-white">
                      <FiCamera className="w-4 h-4 text-white"/>
                      <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleImageChange} />
                    </label>
                  )}
              </div>
              <h2 className="font-bold text-lg">{name}</h2>
              <button onClick={() => setIsEditing(true)} className="text-sm text-blue-600 hover:underline">
                Edit profil
              </button>
              <div className='w-full bg-gray-200 h-[1px] mt-4'></div>
              <nav className="mt-8 space-y-2 text-left">
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm font-medium bg-[#003366] text-white rounded-lg">
                  <FiUser /> Profil Saya
                </a>
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                  <FiLogOut /> Log Out
                </button>
              </nav>
            </div>
          </aside>

          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="p-8 rounded-2xl">
              <h1 className="text-2xl font-bold text-[#003366] justify-start flex">Profil Saya</h1>
              <p className="text-gray-500 mt-1 mb-6 justify-start flex">Kelola informasi profil anda untuk mengkontrol, melindungi dan mengamankan akun anda.</p>
              
              <form onSubmit={handleUpdateProfile}>
                <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 mb-2">
                  <h3 className="font-bold justify-start flex">Data Pribadi</h3>
                  <div className='bg-gray-200 w-full h-[1px]'></div>
                  <div>
                    <label htmlFor="namaLengkap" className="text-sm font-medium text-gray-600 justify-start flex">Nama Lengkap</label>
                    <input id="namaLengkap" type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing}
                           className="w-full mt-1 p-3 border rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"/>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-600 justify-start flex">Email</label>
                    <input id="email" type="email" value={email} disabled 
                           className="w-full mt-1 p-3 border rounded-lg bg-gray-100 cursor-not-allowed"/>
                    <p className="text-xs text-[#003366] mt-1 justify-start flex">Alamat untuk menerima notifikasi</p>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                  <div>
                    <label htmlFor="handphone" className="text-sm font-medium text-gray-600 justify-start flex">No. Handphone</label>
                    {phoneNumber || isEditing ? (
                        <input id="handphone" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={!isEditing}
                               className="w-full mt-1 p-3 border rounded-lg bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"/>
                    ) : (
                        <button type="button" onClick={() => setIsEditing(true)} 
                                className="w-full mt-1 p-3 border border-dashed rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50">
                          + Tambah No. Handphone
                        </button>
                    )}
                  </div>
                </div>
                
                {/* Tombol Simpan & Batal hanya muncul saat mode edit */}
                {isEditing && (
                  <div className="flex justify-end gap-4 mt-6">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                      Nanti saja
                    </button>
                    <button type="submit" disabled={isLoading} className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-blue-300">
                      {isLoading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                  </div>
                )}
                
                {message && <p className="text-right mt-4 text-sm text-green-600">{message}</p>}
              </form>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;