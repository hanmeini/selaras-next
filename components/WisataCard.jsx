import React from 'react';
import { FiStar } from 'react-icons/fi'
import { Link } from 'react-router-dom';

const WisataCard = ({ item }) => {
  const { id, galleryImages, name, location, description } = item;
  const mainImage = galleryImages && galleryImages.length > 0 
  ? galleryImages[0] 
  : 'https://via.placeholder.com/400?text=No+Image';

  const truncatedDescription = description 
    ? description.substring(0, 100) + (description.length > 100 ? '...' : '') 
    : 'Tidak ada deskripsi.';

  return (
      <Link 
      to={`/wisata/${id}`}
      className="block relative rounded-2xl overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out h-96"
    >
    <div className="relative rounded-2xl overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <img src={mainImage} alt={name} className="w-full h-96 object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      
      <button className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-white/50 transition-colors">
        Detail
      </button>

      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-xl font-bold text-left">{name}, {location}</h3>
        <p className="text-sm mt-1 opacity-90 text-left">{truncatedDescription}</p>
      </div>
    </div>
    </Link>
  );
};

export default WisataCard;