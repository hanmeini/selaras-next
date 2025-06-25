import React from 'react'
import arrow from '../assets/button-arrow.png'
import bgHome from '../assets/bg-grid.png'
import home1 from '../assets/home1.png'
import home2 from '../assets/home2.png'
import home3 from '../assets/home3.png'
import airbnb from '../assets/airbnb.png'
import traveloka from '../assets/traveloka.png'
import trivago from '../assets/trivago.png'
import oyo from '../assets/oyo.png'
import smile from '../assets/Smiley Fun.png'


const Home = () => {
  return (
    <section style={{ backgroundImage: `url(${bgHome})` }} className="flex flex-col py-20 bg-cover bg-center bg-no-repeat h-screen">
      <div className='flex flex-col p-20 justify-center items-center relative'>
        <div className="w-full flex justify-end px-72">
          <img src={smile} alt="smile" />
        </div>
        <div className='flex flex-col gap-10 items-center'>
          <h1 className='font-bold text-5xl flex flex-row'>Jelajahi  sesuai<p className='font-light text-5xl'>MOOD</p>-mu</h1>
          <p className='text-[#8A9497] max-w-[80%]'>Selaras bantu kamu temukan liburan terbaik sesuai mood, dengan rekomendasi dari <text className='font-bold text-black'>AI</text> ✨</p>
        </div>
        <button className='bg-[#003366] text-white px-5 py-3 rounded-full font-semibold mt-10'>Mulai Sekarang</button>
        <img className='absolute left-[35%] top-[60%]' src={arrow}/>
      </div>
      <div className='flex flex-col p-20 justify-center relative'>
        <div className='flex flex-row gap-5 justify-center items-center'>
          <img className='object-contain min-w-[200px]' src={home1} alt="home1" />
          <img className='object-contain min-w-[200px]' src={home2} alt="home2" />
          <img className='object-contain min-w-[200px]' src={home3} alt="home3" />
        </div>
        <div className="w-full h-[60%] absolute right-0 left-0 bottom-[10%] bg-gradient-to-t from-white to-transparent"></div>
        <div className='bg-white w-full flex flex-row justify-between items-center z-20 p-10'>
          <h2 className='text-[#8A9497] text-[27px] font-semibold'>Terintegrasi dengan 5+ Travel Startup </h2>
          <div className='flex flex-row gap-5 justify-end'>
            <img className='object-contain max-w-1/6' src={airbnb} alt="airbnb" />
            <img className='object-contain max-w-1/6' src={traveloka} alt="traveloka" />
            <img className='object-contain max-w-1/6' src={trivago} alt="trivago" />
            <img className='object-contain max-w-1/6' src={oyo} alt="oyo" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home