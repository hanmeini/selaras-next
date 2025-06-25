import React from 'react';
import btr from '../assets/btr.png';
import prambanan from '../assets/prambanan.png';
import gunung from '../assets/gunung.png';
import emoji from '../assets/emoji-senyum.png';
import sparkle from '../assets/sparkle.png';

const About = () => {
  return (
    <section id='about' className='min-h-screen min-w-screen flex items-center justify-center'>
        <img src={btr} className='top-14 mt-40 lg:w-30 lg:h-30 absolute items-start justify-start left-36'/>
        <img src={gunung} className='top-1 mt-40 lg:w-30 lg:h-30 absolute items-start justify-start right-28'/>
        <div className='max-w-2xl text-center top-0 absolute mt-52'>
            <h1 className='text-[#AAB5B5] font-manrope text-md'>Mood kamu, Destinasi kami.</h1>
            <p className='text-4xl mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1E1E1E] to-[#D3CFCF] font-semibold font-manrope'>Selaras adalah platform rekomendasi perjalanan berbasis AI yang membantu kamu menemukan destinasi liburan sesuai mood dan preferensimu.</p>
        </div>  
        <img src={emoji} className='bottom-30 absolute lg:w-20 lg:h-20 left-64'/>
        <img src={prambanan} className='bottom-16 absolute lg:w-36 lg:h-26'/>
        <img src={sparkle} className='bottom-32 right-48 absolute lg:w-36 lg:h-26'/>
    </section>
    
  )
}

export default About