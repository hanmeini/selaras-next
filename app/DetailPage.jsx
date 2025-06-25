import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiMapPin, FiClock, FiChevronLeft, FiStar, FiCheck } from 'react-icons/fi';

const PlaceContent = ({ place }) => (
  <>
    {/* Highlight Section */}
    <section>
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-left">Highlight</h2>
      <ul className="space-y-3 ">
        {place.highlights?.map((highlight, index) => (
          <ul key={index} className="flex items-start gap-3 text-left list-disc list-outside text-sm md:text-md pl-3">
            <li className="text-gray-600">{highlight}</li>
          </ul>
        ))}
      </ul>
    </section>

    <hr className="my-8" />

    {/* Tentang Section */}
    <section>
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-left">Tentang {place.name}</h2>
      <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-line text-justify text-sm md:text-md">
        {place.description}
      </div>
    </section>
    
    <hr className="my-8" />
    
    <section>
      <h3 className="text-xl font-bold mb-4 text-left">Info Umum</h3>
      <ul className="space-y-3 text-sm text-left list-disc list-outside pl-3">
          {place.infoUmum?.map((info, index) => (
              <li key={index} className="text-gray-700 text-sm md:text-md">{info}</li>
          ))}
      </ul>
    </section>

    <hr className="my-8" />

    <section>
      <h3 className="text-xl font-bold mb-4 text-left">Aksesibilitas Difabel</h3>
      <ul className="space-y-2 list-disc list-outside pl-3 text-sm md:text-md text-gray-700 text-left">
          {place.aksesibilitasDetails?.map((detail, index) => (
              <li key={index}>{detail}</li>
          ))}
      </ul>
    </section>
    <hr className="my-8" />
  </>
);


const DetailPage = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      if (!placeId) { setLoading(false); return; }
      setLoading(true);
      const docRef = doc(db, 'places', placeId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPlace({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("Wisata tidak ditemukan!");
      }
      setLoading(false);
    };
    fetchPlace();
  }, [placeId]);

  const getRatingDescription = (rating) => {
    const numericRating = Number(rating);

    if (numericRating >= 4.6 && numericRating <= 5) {
      return "Fantastis";
    } else if (numericRating >= 4.1 && numericRating <= 4.5) {
      return "Luar Biasa";
    } else if (numericRating === 4.0) { // dibuat === 4.0 agar lebih presisi
      return "Bagus";
    } else if (numericRating >= 3.5 && numericRating < 4.0) {
      return "Cukup Baik";
    } else {
      return "Ulasan"; // Teks default
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen font-semibold">Memuat...</div>;
  if (!place) return <div className="flex justify-center items-center h-screen font-semibold">Maaf, data wisata tidak ditemukan.</div>;
  const ratingText = getRatingDescription(place.rating);

  return (
    <>
      {/* === TAMPILAN MOBILE === */}
      <div className="md:hidden bg-gray-50 min-h-screen">
        <div className="relative">
          <button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-20 bg-white/70 p-2 rounded-full shadow-lg backdrop-blur-sm">
            <FiChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            loop={true} 
            autoplay={{ 
              delay: 3000, 
              disableOnInteraction: false, 
            }}
            className="h-80"
          >
            {place.galleryImages?.map((imgUrl, index) => (
              <SwiperSlide key={index}>
                <img src={imgUrl} alt={`${place.name} ${index + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="bg-gray-50 p-5 rounded-t-3xl -mt-8 relative z-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-left">{place.name}</h1>
          <div className="rounded-2xl flex items-center gap-4 flex-row">
            <div className="bg-blue-100 text-blue-700 font-bold text-2xl p-4 rounded-xl ">
                {place.rating}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-left">{ratingText}</p>
              <p className="text-xs text-gray-500"><span className='font-bold'>Dari {place.reviewCount} review </span>• Ulasan dari Google</p>
            </div>
          </div>

          <hr className="my-8" />

          <div className="mt-6 space-y-4 text-sm">
             <div className="flex items-start gap-3 text-gray-600"><FiClock className="w-5 h-5 mt-0.5 shrink-0"/>{place.jamOperasional}</div>
             <div className="flex items-start gap-3 text-gray-600"><FiMapPin className="w-5 h-5 mt-0.5 shrink-0"/>{place.location}</div>
          </div>

          <hr className="my-6" />
          
          <PlaceContent place={place} />
        </div>
      </div>

      {/* === TAMPILAN DESKTOP === */}
      <div className="hidden md:block bg-white">
        <header className="bg-[#003366] text-white p-12 md:rounded-b-4xl lg:rounded-b-[4rem] relative">
          <button onClick={() => navigate(-1)} className="absolute top-6 left-6 z-20 bg-white/20 p-2 rounded-full hover:bg-white/40 transition">
            <FiChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-6xl mx-auto pt-8">
            <h1 className="text-5xl font-bold text-left">{place.name}</h1>
            <div className="flex items-start flex-col gap-x-6 gap-y-2 mt-4 text-blue-200 opacity-90">
              <p className="flex items-center gap-2"><FiMapPin /> {place.location}</p>
              <p className="flex items-center gap-2"><FiClock /> {place.jamOperasional}</p>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[400px] -mt-10 relative z-10">
              <div className="col-span-2 row-span-2">
                  <img src={place.galleryImages?.[0]} alt={place.name} className="w-full h-full object-cover rounded-2xl shadow-lg"/>
              </div>
              <div className="h-full">
                  <img src={place.galleryImages?.[1]} alt={place.name} className="w-full h-full object-cover rounded-2xl shadow-lg"/>
              </div>
              <div className="h-full">
                  <img src={place.galleryImages?.[2]} alt={place.name} className="w-full h-full object-cover rounded-2xl shadow-lg"/>
              </div>
          </div>

          <div className="my-8 flex justify-between items-center">
              <div className="flex items-center gap-4">
                  <div className="bg-[#B9D7F5] text-[#003366] font-bold text-4xl p-5 rounded-2xl">{place.rating}</div>
                  <div className='flex flex-col items-start'>
                      <p className="text-xl font-bold text-[#003366]">{ratingText}</p>
                      <p className="text-sm font-semibold">Dari {place.reviewCount} review</p>
                      <p className="text-sm text-gray-500">ulasan di Google</p>
                  </div>
              </div>
          </div>

          <PlaceContent place={place} />
        </main>
      </div>
    </>
  );
};

export default DetailPage;