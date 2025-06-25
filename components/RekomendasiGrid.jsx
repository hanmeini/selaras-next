import React, { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { collection, query, where, getDocs, limit } from 'firebase/firestore'; 
import WisataCard from './WisataCard';
import { useLocation } from 'react-router-dom'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const RekomendasiGrid = ({ kategori, searchTerm }) => { 
  const [masterData, setMasterData] = useState(null);
  const [displayedData, setDisplayedData] = useState(null);

  const [loading, setLoading] = useState(true);
  
  const location = useLocation(); 
  const searchParams = new URLSearchParams(location.search); 
  const pilihanMood = searchParams.get('mood') || 'semua';
  const butuhAksesDifabel = searchParams.get('aksesDifabel') === 'true';

  //  MENGAMBIL DATA AWAL DARI FIRESTORE ---
  useEffect(() => {
    const fetchDestinasi = async () => {
      setLoading(true);
      setMasterData(null); 
      try {
        if (kategori) {
          let conditions = [where('category', '==', kategori)];
          if (pilihanMood && pilihanMood !== 'semua') conditions.push(where('mood', 'array-contains', pilihanMood));
          if (butuhAksesDifabel) conditions.push(where('aksesDifabel', '==', true));
          
          const q = query(collection(db, 'places'), ...conditions);
          const querySnapshot = await getDocs(q);
          const listDestinasi = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMasterData(listDestinasi);
        } else {
          const categoriesToShow = ['pantai', 'alam', 'sejarah', 'hiburan'];
          const promises = categoriesToShow.map(cat => getDocs(query(collection(db, 'places'), where('category', '==', cat), limit(10))));
          
          const results = await Promise.all(promises);
          
          const newCategorizedData = {};
          results.forEach((snapshot, index) => {
            const categoryName = categoriesToShow[index];
            const places = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (places.length > 0) newCategorizedData[categoryName] = places;
          });
          setMasterData(newCategorizedData);
        }
      } catch (error) {
        console.error("Query Gagal!", error);
      }
      setLoading(false);
    };

    fetchDestinasi();
  }, [kategori, pilihanMood, butuhAksesDifabel]);

  //  MEMFILTER DATA BERDASARKAN PENCARIAN ---
  useEffect(() => {
    if (!masterData) return; 

    const lowercasedTerm = (searchTerm || '').toLowerCase();

    if (!lowercasedTerm) {
      setDisplayedData(masterData);
      return;
    }
    if (Array.isArray(masterData)) {
      const results = masterData.filter(place => place.name.toLowerCase().includes(lowercasedTerm));
      setDisplayedData(results);
    } else {
      const filteredCategorizedData = {};
      Object.entries(masterData).forEach(([categoryName, places]) => {
        const results = places.filter(place => place.name.toLowerCase().includes(lowercasedTerm));
        if (results.length > 0) {
          filteredCategorizedData[categoryName] = results;
        }
      });
      setDisplayedData(filteredCategorizedData);
    }
  }, [searchTerm, masterData]);


  if (loading) return <div className="text-center p-10">Memuat rekomendasi...</div>;
  
  const hasResults = displayedData && (Array.isArray(displayedData) ? displayedData.length > 0 : Object.keys(displayedData).length > 0);

  return (
    <section className="py-12 space-y-12">
      {kategori ? (
        // --- Tampilan jika ada filter kategori (Hasil Kuis) ---
        hasResults ? (
          <div className="px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">Rekomendasi Untukmu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {displayedData.map(item => <WisataCard key={item.id} item={item} />)}
            </div>
          </div>
        ) : (
          <div className="text-center text-xl font-semibold bg-white p-10 rounded-xl shadow-md max-w-md mx-auto">
            <p>Maaf, tidak ada rekomendasi yang ditemukan untuk pencarian Anda.</p>
          </div>
        )
      ) : (
        // --- Tampilan jika TIDAK ada filter kategori (Halaman Jelajah) ---
        hasResults ? (
          Object.entries(displayedData).map(([categoryName, places]) => (
            <div key={categoryName} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 capitalize px-4 md:px-8">Jelajahi Wisata {categoryName}</h2>
              <Swiper slidesPerView={'auto'} spaceBetween={16} grabCursor={true} className="!px-4 md:!px-8">
                {places.map(item => (
                  <SwiperSlide key={item.id} className="!w-[280px] md:!w-[320px]">
                    <WisataCard item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ))
        ) : (
          <div className="text-center text-xl font-semibold p-10">
            <p>Tidak ada hasil yang cocok dengan pencarian "{searchTerm}".</p>
          </div>
        )
      )}
    </section>
  );
};

export default RekomendasiGrid;