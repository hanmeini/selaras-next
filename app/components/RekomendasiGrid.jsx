"use client";
import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase-config";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import WisataCard from "./WisataCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import LoadingWisataCard from "./LoadingWisataCard"; 

const RekomendasiGrid = ({ kategori, pilihanMood, butuhAksesDifabel, searchTerm }) => {
  const [masterData, setMasterData] = useState(null);
  const [displayedData, setDisplayedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false); 

  // Ambil data dari Firestore
  const fetchDestinasi = async () => {
    setLoading(true);
    setMasterData(null);
    setIsFallback(false);

    try {
      let q;
      if (kategori) {
        let conditions = [where("category", "==", kategori)];
        if (pilihanMood && pilihanMood !== "semua") conditions.push(where("mood", "array-contains", pilihanMood));
        if (butuhAksesDifabel) conditions.push(where("aksesDifabel", "==", true));
        q = query(collection(db, "places"), ...conditions);
        const querySnapshot = await getDocs(q);
        const listDestinasi = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        if (listDestinasi.length === 0) {
          const categoriesToShow = ["pantai", "alam", "sejarah", "hiburan"];
          const promises = categoriesToShow.map((cat) =>
            getDocs(query(collection(db, "places"), where("category", "==", cat), limit(10)))
          );
          const results = await Promise.all(promises);

          const fallbackData = [];
          results.forEach((snapshot) => {
            const places = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            fallbackData.push(...places);
          });

          setMasterData(fallbackData);
          setIsFallback(true); 
        } else {
          setMasterData(listDestinasi);
        }
      } else {
        const categoriesToShow = ["pantai", "alam", "sejarah", "hiburan"];
        const promises = categoriesToShow.map((cat) =>
          getDocs(query(collection(db, "places"), where("category", "==", cat), limit(10)))
        );
        const results = await Promise.all(promises);

        const newCategorizedData = {};
        results.forEach((snapshot, index) => {
          const categoryName = categoriesToShow[index];
          const places = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          if (places.length > 0) newCategorizedData[categoryName] = places;
        });
        setMasterData(newCategorizedData);
      }
    } catch (error) {
      console.error("Query Gagal!", error);
    }

    setTimeout(()=>{
      setLoading(false);
    }, 1000)
  };

  // Jalankan fetch saat mount atau kategori berubah
  useEffect(() => {
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

  // Loading
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
        hasResults ? (
          <div className="px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
              Rekomendasi Untukmu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={16}
                grabCursor={true}
                className="!px-2 md:!px-8"
              >
                {displayedData.map((item) => (
                  <SwiperSlide key={item.id} className="!w-[280px] md:!w-[320px]">
                    <WisataCard item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 px-6 bg-white rounded-2xl h-max">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops! Tidak ditemukan</h3>
            <p className="mb-6 text-gray-500">
              Kami tidak menemukan hasil yang cocok. Coba ulangi kuis dengan pilihan berbeda.
            </p>
            <button
              onClick={() => (window.location.href = "/quiz")}
              className="bg-[#003366] hover:bg-[#002244] text-white px-6 py-3 rounded-full font-semibold transition"
            >
              Ulangi Kuis
            </button>
            <p className="text-sm text-gray-500 mt-6">
              Sementara itu, berikut rekomendasi umum untukmu 👇
            </p>

            {Array.isArray(masterData) && masterData.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
              >
                {displayedData.map((item) => (
                  <WisataCard key={item.id} item={item} />
                ))}
              </motion.div>
            )}
          </div>
        )
      ) : hasResults ? (
        Object.entries(displayedData).map(([categoryName, places]) => (
          <div key={categoryName} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 capitalize px-4 md:px-8">
              Jelajahi Wisata {categoryName}
            </h2>
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={16}
              grabCursor={true}
              className="!px-4 md:!px-8"
            >
              {places.map((item) => (
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
      )}
    </section>
  );
};

export default RekomendasiGrid;
