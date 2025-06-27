"use client"
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase-config';
import AdminOnly from '../../../context/AdminRoute'

const AdminDashboardPage = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [jamOperasional, setJamOperasional] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [highlights, setHighlights] = useState('');
  const [description, setDescription] = useState('');
  const [infoUmum, setInfoUmum] = useState('');
  const [aksesibilitasDetails, setAksesibilitasDetails] = useState('');
  const [category, setCategory] = useState('alam');
  const [moods, setMoods] = useState([]);
  const [aksesDifabel, setAksesDifabel] = useState(false);
  const [message, setMessage] = useState('');

  const moodOptions = ["romantis", "petualangan", "seru", "santai"];

  const handleMoodChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setMoods([...moods, value]);
    } else {
      setMoods(moods.filter((mood) => mood !== value));
    }
  };

  const clearForm = () => {
    setName(''); setLocation(''); setJamOperasional('');
    setImageUrl1(''); setImageUrl2(''); setImageUrl3('');
    setRating(0); setReviewCount(0); setHighlights('');
    setDescription(''); setInfoUmum(''); setAksesibilitasDetails('');
    setCategory('alam'); setMoods([]); setAksesDifabel(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Menyimpan...');


    const highlightsArray = highlights.split('\n').filter(line => line.trim() !== '');
    const infoUmumArray = infoUmum.split('\n').filter(line => line.trim() !== '');
    const aksesDetailsArray = aksesibilitasDetails.split('\n').filter(line => line.trim() !== '');

    const newPlace = {
      name, location, jamOperasional, description, category,
      mood: moods,
      aksesDifabel,
      rating: Number(rating),
      reviewCount: Number(reviewCount),
      galleryImages: [imageUrl1, imageUrl2, imageUrl3],
      highlights: highlightsArray,
      infoUmum: infoUmumArray,
      aksesibilitasDetails: aksesDetailsArray
    };

    try {
      const docRef = await addDoc(collection(db, 'places'), newPlace);
      setMessage(`Data berhasil ditambahkan dengan ID: ${docRef.id}`);
      clearForm();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error("Error adding document: ", error);
    }
  };

  return (
    <AdminOnly>
    // PENYESUAIAN 1: Padding diubah agar lebih kecil di mobile
    <div className="p-4 sm:p-8 lg:p-16 bg-gray-100 min-h-screen"> 
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md">
        
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Tambah Data Wisata Baru</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
         <input type="text" placeholder="Nama Wisata" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 border rounded"/>
          <input type="text" placeholder="Lokasi (Contoh: Kota Semarang)" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full p-3 border rounded"/>
          <input type="text" placeholder="Jam Operasional (Contoh: 08.00 - 17.00)" value={jamOperasional} onChange={(e) => setJamOperasional(e.target.value)} required className="w-full p-3 border rounded"/>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block mb-1 font-medium text-left">Rating</label>
            <input type="number" step="0.1" placeholder="Rating (Contoh: 4.8)" value={rating} onChange={(e) => setRating(e.target.value)} required className="w-full p-3 border rounded"/>
            <label className="block mb-1 font-medium text-left">Jumlah Review</label>
            <input type="number" placeholder="Jumlah Review (Contoh: 67)" value={reviewCount} onChange={(e) => setReviewCount(e.target.value)} required className="w-full p-3 border rounded"/>
          </div>
          <div>
            <label className="block mb-1 font-medium text-left">Kategori</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded">
              <option value="alam">Alam</option>
              <option value="sejarah">Sejarah</option>
              <option value="pantai">Pantai</option>
              <option value="hiburan">Hiburan</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium text-left">Mood</label>
            <div className="flex flex-wrap gap-4 mt-2">
              {moodOptions.map(mood => (
                <label key={mood} className="flex items-center gap-2 capitalize">
                  <input type="checkbox" value={mood} checked={moods.includes(mood)} onChange={handleMoodChange} className="w-4 h-4"/>
                  {mood}
                </label>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-500 -mb-4">Masukkan 3 URL Gambar:</p>
          <input type="url" placeholder="URL Gambar Utama" value={imageUrl1} onChange={(e) => setImageUrl1(e.target.value)} required className="w-full p-3 border rounded"/>
          <input type="url" placeholder="URL Gambar Galeri 2" value={imageUrl2} onChange={(e) => setImageUrl2(e.target.value)} required className="w-full p-3 border rounded"/>
          <input type="url" placeholder="URL Gambar Galeri 3" value={imageUrl3} onChange={(e) => setImageUrl3(e.target.value)} required className="w-full p-3 border rounded"/>
          
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="5" className="w-full p-3 border rounded" placeholder="Deskripsi Tentang Wisata (bisa 2 paragraf, pisahkan dengan Enter)."></textarea>
          <textarea value={highlights} onChange={(e) => setHighlights(e.target.value)} required rows="5" className="w-full p-3 border rounded" placeholder="Highlights / Poin Keseruan (satu poin per baris)."></textarea>
          <textarea value={infoUmum} onChange={(e) => setInfoUmum(e.target.value)} required rows="4" className="w-full p-3 border rounded" placeholder="Info Umum (satu poin per baris)."></textarea>
          <textarea value={aksesibilitasDetails} onChange={(e) => setAksesibilitasDetails(e.target.value)} required rows="3" className="w-full p-3 border rounded" placeholder="Detail Aksesibilitas Difabel (satu poin per baris)."></textarea>          

          <div>
            <label className="block mb-1 font-medium text-left">Akses Ramah Difabel?</label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2"><input type="radio" name="difabel" checked={aksesDifabel === true} onChange={() => setAksesDifabel(true)} /> Ya</label>
              <label className="flex items-center gap-2"><input type="radio" name="difabel" checked={aksesDifabel === false} onChange={() => setAksesDifabel(false)} /> Tidak</label>
            </div>
          </div>

          <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">Simpan Data</button>
        </form>
        {message && <p className="mt-4 text-center text-gray-600 bg-gray-100 p-3 rounded-md">{message}</p>}
      </div>
    </div>
    </AdminOnly>
  );
};

export default AdminDashboardPage;