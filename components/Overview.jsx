import React from 'react';
import logonoName from '../assets/logo-noname.png';
import emotCoba from '../assets/emot-coba.png';
import emotTanya from '../assets/emoji-bertanya.png';
import jamMountain from '../assets/jam-mountain.png';
import ciprat from '../assets/ciprat.png';
import map from '../assets/map.png';
import sawah from '../assets/sawah.png';


const Overview = () => {
  return (
    <div className="min-w-screen min-h-screen max-h-2 bg-[#003366] p-8 relative">
    <div className="flex flex-col items-start justify-start">
      <img src={logonoName} alt="logononame" className="lg:w-14 lg:h-14 w-10 h-10" />
      <div className="text-start font-manrope font-semibold lg:text-5xl text-3xl lg:mt-5 relative">
        <h1 className="text-[#FAFAFA] leading-snug">Nikmati <span className="text-[#B9D7F5]">Liburan </span>Dengan <span className="text-[#FFC300] relative inline-block">Cara Baru<img src={ciprat} alt="ciprat" className="absolute -top-5 -right-10 lg:w-16 lg:h-16" /></span></h1>
      </div>
      <p className="text-[#DBDBDB] font-manrope lg:text-xl max-w-md text-start">Rasakan pengalaman liburan yang lebih personal, sesuai mood dan gayamu.</p>
      <button className="font-semibold font-manrope text-[#003366] items-center text-center bg-[#FAFAFA] lg:w-44 lg:h-11 rounded-4xl mt-6 flex hover:scale-85 duration-250 cursor-pointer"><img src={emotCoba} alt="emot coba" className="w-5 h-5 mx-3"/>Coba Sekarang</button>
    </div>

    {/* map */}
    <div className="flex mt-10 bottom-2 relative">
      <img src={map} alt="map" className="lg:w-[850px] lg:h-[300px]"/>
      <img src={sawah} alt="sawah" className="lg:w-[300px] lg:h-auto -mt-26 ml-3 relative z-10"/>
      <div className='absolute lg:bottom-65 right-78 bg-[#FAFAFA] p-4 h-25 w-25 rounded-2xl shadow-md shadow-slate-900 rotate-[25deg] flex items-start z-20'>
       <img src={emotTanya} alt="emottanya" className='w-8 h-8 absolute top-0 left-0'/>
       <p className='absolute max-w-1/3 bottom-2 left-2 font-manrope text-md font-semibold'>Sesuai Moodmu</p>
      </div>
      <div className='absolute lg:bottom-12 lg:right-35 bg-[#FAFAFA] p-4 h-25 w-25 rounded-2xl shadow-md shadow-slate-900 rotate-6 flex items-start z-20'>
       <img src={jamMountain} alt="jamMountain" className='w-8 h-8 absolute top-0 left-0 -rotate-6'/>
       <p className='absolute max-w-1/3 bottom-2 left-2 font-manrope text-md font-semibold'>Jelajah Tempat</p>
      </div>
      <div className='absolute lg:bottom-90 lg:right-3 bg-[#FAFAFA] p-4 lg:h-25 lg:w-25 rounded-2xl shadow-md shadow-slate-900 -rotate-[20deg] flex items-start z-20'>
       <img src={emotCoba} alt="emotCoba" className='lg:w-6 lg:h-6 absolute top-0 left-0 -rotate-6'/>
       <p className='absolute max-w-1/3 bottom-2 left-2 font-manrope text-md font-semibold'>Artificial Intelligence</p>
      </div>
    </div>
  </div>

  )
}

export default Overview