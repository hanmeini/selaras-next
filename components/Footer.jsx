import React from 'react'
import logoNoName from '../assets/logo-noname.png'
import panahBawah from '../assets/panah-bawah.png'
import line from '../assets/garis.png'
import slack from '../assets/slack.png'
import instagram from '../assets/instagram.png'
import twitter from '../assets/twitter.png'
import linkedin from '../assets/linkedin.png'
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative bg-[#003366] min-w-screen lg:flex flex flex-col">
      <div className="lg:flex lg:flex-row flex flex-col justify-between px-7 pt-3">
        {/* Kiri */}
        <div className="flex flex-col items-start">
          <div className="flex items-center">
            <img src={logoNoName} alt="logo" className='md:w-14 md:h-14 w-10 h-10' />
            <h1 className='font-semibold font-manrope text-3xl md:text-5xl text-white ml-4 mb-3'>selaras</h1>
          </div>
          <p className='text-[#FAFAFA] font-manrope lg:mt-8 mt-4 text-left'>Platform rekomendasi destinasi yang membantumu menemukan <br></br>tempat terbaik sesuai suasana hati dan kebutuhanmu.</p>
        </div>

        {/* Tengah */}
        <img src={panahBawah} alt="panahbawah" className='lg:w-24 lg:h-24 hidden lg:inline-block' />

        {/* Navigasi */}
        <div className='lg:flex lg:flex-row flex items-start justify-start lg:mr-8 mt-12'>
          <div className='flex flex-col'>
          <h1 className='text-white font-semibold text-left lg:text-center mb-2'>Navigasi</h1>
          <div className='text-left flex flex-col lg:ml-10'>
            <HashLink smooth to='/#landingpage' className="text-[#B3B3B3] font-manrope text-md  hover:text-white hover:translate-x-1 transition-all duration-300 ease-in-out">Beranda</HashLink>
            <HashLink smooth to='/#about' className="text-[#B3B3B3] font-manrope text-md  hover:text-white hover:translate-x-1 transition-all duration-300 ease-in-out">Tentang Kami</HashLink>
            <HashLink smooth to='/#testimony' className="text-[#B3B3B3] font-manrope text-md  hover:text-white hover:translate-x-1 transition-all duration-300 ease-in-out">Cerita Mereka</HashLink>
            <HashLink smooth to='/kontak' className="text-[#B3B3B3] font-manrope text-md  hover:text-white hover:translate-x-1 transition-all duration-300 ease-in-out">Kontak Kami</HashLink>
          </div>
        </div>

        {/* Layanan */}
        <div className='flex flex-col lg:ml-10 ml-6'>
          <h1 className='text-white font-semibold text-center mb-2'>Layanan</h1>
          <div className='text-left flex flex-col ml-3'>
            <a href="quiz" className="text-[#B3B3B3] font-manrope text-md  hover:text-white hover:translate-x-1 transition-all duration-300 ease-in-out">Quiz</a>
            <a href="SelarasAI" className="text-[#B3B3B3] font-manrope text-md  hover:text-white hover:translate-x-1 transition-all duration-300 ease-in-out">Selaras AI</a>
          </div>
        </div>
        </div>
      </div>

      {/* Gambar garis di bawah */}
      <div className="mt-28 mx-5">
        <img src={line} alt="line" className='w-full h-auto' />
      </div>

      <div className='flex mx-5 mt-5'>
        <p className='text-[#D6D6D6] text-md font-semibold'>&copy; 2025 Selaras. Semua hak dilindungi.</p>
        <div className='flex flex-row gap-1 md:gap-4 right-4 absolute w-1/2 justify-end'>
          <img src={slack} alt="" className='w-6 h-6'/>
          <img src={linkedin} alt="" className='w-6 h-6'/>
          <img src={twitter} alt="" className='w-6 h-6'/>
          <img src={instagram} alt="" className='w-6 h-6'/>
        </div>
      </div>
    </footer>
  )
}
