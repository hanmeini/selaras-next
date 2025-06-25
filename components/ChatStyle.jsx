import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../context/Authcontext'; // Sesuaikan path

// Impor aset-aset yang dibutuhkan
import SelarasAI from '../public/images/selarasAi.png'; // Ganti dengan path ikon AI Anda
import person from '../public/images/person-icon.png'; // Ganti dengan path ikon person default Anda

// Komponen Ikon AI, bisa Anda sesuaikan
const AiIcon = () => ( 
  <img 
    src={SelarasAI} 
    alt="Ikon Selaras AI" 
    className="w-8 h-8 rounded-full object-cover"
  /> 
);

// Terima 'message' dan 'userProfile' sebagai props
const ChatMessage = ({ message }) => {
  const { role, content } = message;
  const isUser = role === 'user';
  const { userProfile } = useAuth();

  const UserIcon = () => {
    if (userProfile && userProfile.photoURL) {
      return (
        <img 
          src={userProfile.photoURL} 
          alt="Foto Profil Anda" 
          className="w-8 h-8 rounded-full object-cover"
        />
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
        <img src={person} alt="Ikon Pengguna" className="w-5 h-5" />
      </div>
    );
  };

  return (
    <div className={`flex w-full items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      
      {!isUser && <AiIcon />}
      
      {/* Chat */}
      <div 
        className={`px-4 py-3 rounded-2xl w-full max-w-xl ${ 
          isUser 
          ? 'bg-[#BEE1E6] text-gray-800' // Gaya untuk user
          : 'bg-white border'          // Gaya untuk AI 
        }`}
      >
        <p className={`font-bold text-sm mb-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {isUser ? 'Anda' : 'Selaras AI'}
        </p>

        <div className="prose prose-sm max-w-none text-justify">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      {isUser && <UserIcon />}
      
    </div>
  );
};

export default ChatMessage;