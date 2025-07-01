"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase-config";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import WisataCard from "./WisataCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import LoadingWisataCard from './LoadingWisataCard'

const RekomendasiGrid = ({ kategori, pilihanMood, butuhAksesDifabel, searchTerm }) => {
  const [masterData, setMasterData] = useState(null);
  const [displayedData, setDisplayedData] = useState(null);
  const [loading, setLoading] = useState(true);
  
    const [isFallback, setIsFallback] = useState(false); 
  const [fallbackData, setFallbackData] = useState([]);

  // Ambil data dari Firestore
  useEffect(() => {
    const fetchDestinasi = async () => {
      setLoading(true);
      setMasterData(null);
      setIsFallback(false);
      setFallbackData([]);

      try {
        let q;
        if (kategori) {
          // --- LOGIKA JIKA ADA KATEGORI (HASIL KUIS) ---
          let conditions = [where('category', '==', kategori)];
          if (pilihanMood && pilihanMood !== 'semua') conditions.push(where('mood', 'array-contains', pilihanMood));
          if (butuhAksesDifabel) conditions.push(where('aksesDifabel', '==', true));
          q = query(collection(db, 'places'), ...conditions);
          
          const querySnapshot = await getDocs(q);
          const listDestinasi = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          if (listDestinasi.length > 0) {
            setMasterData(listDestinasi);
          } else {
            // JIKA HASIL FILTER KOSONG, CARI DATA FALLBACK
            setIsFallback(true);
            const fallbackQuery = query(collection(db, "places"),limit(6));
            const fallbackSnapshot = await getDocs(fallbackQuery);
            const fallbackList = fallbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFallbackData(fallbackList);
            setMasterData([]); // Set masterData sebagai array kosong agar hasResults menjadi false
          }

        } else {
          // --- LOGIKA UNTUK HALAMAN JELAJAH UMUM (/rekomendasi) ---
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
      setTimeout(() => {
        setLoading(false)
      },1000)
    };

    fetchDestinasi();
  }, [kategori, pilihanMood, butuhAksesDifabel]);

  // Filter berdasarkan pencarian
  useEffect(() => {
    if (!masterData) {
      setDisplayedData(null);
      return;
    }

    const lowercasedTerm = (searchTerm || "").toLowerCase();

    if (!lowercasedTerm) {
      setDisplayedData(masterData);
      return;
    }

    if (Array.isArray(masterData)) {
      const results = masterData.filter((place) => place.name.toLowerCase().includes(lowercasedTerm));
      setDisplayedData(results);
    } else {
      const filteredCategorizedData = {};
      Object.entries(masterData).forEach(([categoryName, places]) => {
        const results = places.filter((place) => place.name.toLowerCase().includes(lowercasedTerm));
        if (results.length > 0) {
          filteredCategorizedData[categoryName] = results;
        }
      });
      setDisplayedData(filteredCategorizedData);
    }
  }, [searchTerm, masterData]);

  if (loading) {
  return (
    <section className="py-12 space-y-12 px-4 md:px-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-6">
          <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse" />

          <Swiper
            slidesPerView={"auto"}
            spaceBetween={16}
            grabCursor={true}
            className="!px-1 md:!px-4"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <SwiperSlide key={i} className="!w-[280px] md:!w-[320px] space-y-4">
                <LoadingWisataCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </section>
  );
}

  const hasResults =
    displayedData &&
    (Array.isArray(displayedData)
      ? displayedData.length > 0
      : Object.keys(displayedData).length > 0);

  return (
    <section className="py-12 space-y-12">
      {kategori ? (
        // --- TAMPILAN HASIL KUIS ---
        <div className="px-4">
          {hasResults ? (
            <div className="flex flex-col">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Rekomendasi Untukmu</h2>
                <p className="text-gray-600 mt-2 capitalize max-w-2xl mx-auto">
                  Destinasi impian, disesuaikan khusus untuk kamu.
                </p>
            </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full mx-auto">
                {displayedData.map(item => <WisataCard key={item.id} item={item} />)}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 px-2 rounded-2xl w-full mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops! Tidak Ditemukan</h3>
                <p className="text-sm text-gray-500 mb-6 ">
                  <Link href="/quiz" className="underline mr-1">
                    Ulangi Kuis
                  </Link>
                  atau berikut rekomendasi umum untukmu 👇
                </p>
              
              {isFallback && fallbackData.length > 0 && (
                <>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {fallbackData.map((item) => (
                      <WisataCard key={item.id} item={item} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        // --- TAMPILAN HALAMAN JELAJAH ---
        hasResults ? (
          Object.entries(displayedData).map(([categoryName, places]) => (
            <div key={categoryName} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 capitalize px-4 md:px-8">
                Jelajahi Wisata {categoryName}
              </h2>
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
              <div className="text-center py-12 px-2 rounded-2xl w-full mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops! Tidak Ditemukan</h3>
              <p className="mb-6 text-gray-500">Tidak ada hasil yang cocok dengan pencarian "{searchTerm}".</p>
              <Link href="/quiz" className="bg-[#003366] hover:bg-blue-800 text-white px-6 py-3 rounded-full font-semibold transition">
                Ulangi Kuis
              </Link>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default RekomendasiGrid;
