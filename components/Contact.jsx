import React from 'react';
// Impor semua aset gambar Anda
import emailTransparant from '../assets/email-transparan.png';
import emailGray from '../assets/email-gray.png';
import emailBlue from '../assets/email-blue.png';
import personGray from '../assets/person-gray.png';
import personBlue from '../assets/person-blue.png';
import effect from '../assets/effect.png';

const Contact = () => {
  return (
    // Kontainer utama menggunakan flex, dibuat vertikal di mobile dan horizontal di desktop (lg)
    <div className='flex flex-col lg:flex-row items-center justify-center min-h-screen w-full gap-12 lg:gap-16 p-8 lg:p-12 bg-white'>

      {/* --- KOLOM KIRI: INFO KONTAK --- */}
      <div className='w-full lg:w-1/2 max-w-lg flex flex-col items-start relative mt-14 md:mt-0'>
        <div className='self-start mb-4'>
          <img src={emailTransparant} alt="emailTransparant" className='w-14 h-14'/>
          <img src={effect} alt="effect" className='w-16 h-16 absolute top-2 right-10'/>
        </div>
        <h1 className='text-4xl md:text-5xl font-bold font-manrope text-[#2E2E2E] mb-4 text-left'>Sampaikan Ceritamu</h1>
        <p className='text-left text-gray-500 font-manrope font-semibold max-w-md'>
          Ada pertanyaan atau masukan? Tim Selaras siap mendengarkan.
        </p>
        
        {/* Kartu Kontak */}
        <div className='space-y-4 mt-8 w-full'>
            <a href="mailto:haloselaras@gmail.com" className='p-4 rounded-2xl border-t-2 border-[#003366] shadow-md bg-gray-50 flex items-center gap-4 hover:shadow-lg transition w-full'>
              <img src={emailBlue} alt="email icon" className='w-12 h-12'/>
              <div className='text-left'>
                <h2 className='text-[#2E2E2E] text-lg font-semibold'>Email Kami</h2>
                <p className='text-md text-gray-500 font-semibold'>haloselaras@gmail.com</p>
              </div>
            </a>
            <a href="tel:+627725132488" className='p-4 rounded-2xl shadow-md bg-gray-50 flex items-center gap-4 hover:shadow-lg transition w-full'>
              <img src={personBlue} alt="person icon" className='w-12 h-12'/>
              <div className='text-left'>
                <h2 className='text-[#2E2E2E] text-lg font-semibold'>Kontak Kami</h2>
                <p className='text-md text-gray-500 font-semibold'>+62 772 513 2488</p>
              </div>
            </a>
        </div>
      </div>

      {/* --- KOLOM KANAN: FORM --- */}
      <div className='w-full lg:w-1/2 max-w-lg flex flex-col items-center justify-center rounded-3xl bg-gray-50 shadow-lg p-6 sm:p-8 mt-10 lg:mt-0'>
        {/* Menggabungkan semua input dalam satu <form> */}
        <form className='w-full space-y-6'>
          
          <div>
            <label className='text-left block mb-2 font-semibold text-md text-[#2E2E2E]'>Nama Lengkap</label>
            <div className='flex items-center gap-3 w-full p-3 bg-gray-200/70 rounded-xl'>
              <img src={personGray} alt="person icon" className='w-6 h-6' />
              <input placeholder='Masukan namamu' className='w-full bg-transparent focus:outline-none text-gray-700 font-semibold font-manrope' />
            </div>
          </div>
          
          <div>
            <label className='text-left block mb-2 font-semibold text-md text-[#2E2E2E]'>Email</label>
            <div className='flex items-center gap-3 w-full p-3 bg-gray-200/70 rounded-xl'>
              <img src={emailGray} alt="email icon" className='w-6 h-6' />
              <input type="email" placeholder='Masukan emailmu' className='w-full bg-transparent focus:outline-none text-gray-700 font-semibold font-manrope' />
            </div>
          </div>
          
          <div>
            <label className='text-left block mb-2 font-semibold text-md text-[#2E2E2E]'>Pesan Anda</label>
            <textarea placeholder='Isi pesanmu.....' rows="5" className='w-full p-3 bg-gray-200/70 rounded-xl focus:outline-none text-gray-700 font-semibold font-manrope'></textarea>
          </div>
          
          <div className="flex justify-end pt-2">
            <button type="submit" className='bg-[#003366] py-3 px-8 rounded-xl text-white font-semibold hover:bg-blue-800 transition duration-300'>
              Kirim
            </button>
          </div>

        </form>
      </div>
      
    </div>
  );
};

export default Contact;