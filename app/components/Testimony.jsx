import React from 'react'
import hand from '../assets/hand.png'
import arrowRight from '../assets/arrow-right.png'
import arrowLeft from '../assets/arrow-left.png'
import petik from '../assets/petik.png'
import ppAhmad from '../assets/pp-ahmad.png'
import ppByan from '../assets/pp-byan.png'
import ppErland from '../assets/pp-erland.png'
import ppNobel from '../assets/pp-nobel.png'

const Testimony = () => {
  return (
    <div className='mt-10 min-w-screen min-h-screen flex flex-col items-center relative'>
      <img src={arrowRight} alt="arrowRight" className='items-start justify-start flex left-0 absolute w-36 h-32 rotate-2' />
      <img src={arrowLeft} alt="arrowLeft" className='items-start justify-start flex right-0 absolute w-36 h-32' />
      <img src={hand} alt="hand" className='w-15 h-15' />
      <h1 className='text-5xl font-semibold font-manrope text-[#2E2E2E] mt-3'>Cerita Seru Mereka</h1>
      <p className='text-[#8A9497] mt-3'>Langsung dari pengalaman mereka.</p>
      <div className='flex flex-row gap-4 mt-10'>
        {/* Card 1 */}
        <div className='w-[320px] h-[412px] rounded-2xl bg-[#FAFAFA] border-[#D6D6D6] border-2 flex flex-col'>
          <div className='flex items-start justify-start'>
            <div className='flex flex-col items-start justtify-start'>
              <img src={ppByan} alt="pp-byan" className='p-2 w-16 h-16' />
              <img src={petik} alt="petik" className='w-8 h-8 ml-3 mt-2' />
            </div>
            <div className='flex flex-col items-start justify-start'>
              <h1 className='font-semibold font-manrope text-[#2E2E2E] text-lg mt-2'>Biantara Nadif</h1>
              <p className='font-semibold font-manrope text-[#939393] text-md'>Traveler</p>
            </div>
          </div>
          <p className='font-manrope text-lg mx-4 text-left text-[#939393]'>
            Baru kali ini cari tempat liburan gampang banget. Tinggal pilih mood, langsung dapat rekomendasi yang pas! Selaras benar-benar ngebantu aku nemuin tempat-tempat yang belum pernah kepikiran sebelumnya.
          </p>
          <div className='flex flex-row gap-3 items-start justify-start ml-4 mt-6'>
            <div className='w-20 h-6 bg-[#BEE1E6] rounded-lg items-center flex flex-row justify-center'>
              <p className='text-[#003366] text-sm font-manrope font-semibold'>#Eksplor</p>
            </div>
            <div className='w-20 h-6 bg-[#BEE1E6] rounded-lg items-center justify-center'>
              <p className='text-[#003366] text-sm font-manrope font-semibold'>#Tenang</p>
            </div>
          </div>
          <p className='text-[#939393] font-manrope font-semibold flex items-end justify-end mt-5 mr-3'>Mei 2025</p>
        </div>

        {/* Card 2 & 3 */}
        <div className='flex flex-col gap-3'>
          <div className='w-[420px] h-[200px] rounded-2xl bg-[#FAFAFA] border-[#D6D6D6] border-2 flex flex-col'>
            <img src={petik} alt="petik" className='w-8 h-8 ml-3 mt-2' />
            <p className='font-manrope text-lg text-left text-[#939393] mx-4'>
              Pilihan tempatnya sesuai banget sama moodku waktu itu. Dapat rekomendasi hidden gem yang nggak kepikiran sebelumnya!
            </p>
            <div className='flex items-start'>
              <img src={ppErland} alt="ppErland" className='p-2 w-16 h-16 flex ml-2' />
              <div className='flex flex-col items-start justify-center my-auto'>
                <h1 className='font-semibold font-manrope text-[#2E2E2E] text-lg'>Erland Pramatta</h1>
                <p className='font-semibold font-manrope text-[#939393] text-md'>Globaltraveler</p>
              </div>
            </div>
          </div>

          <div className='w-[420px] h-[200px] rounded-2xl bg-[#FAFAFA] border-[#D6D6D6] border-2 flex flex-col'>
            <img src={petik} alt="petik" className='w-8 h-8 ml-3 mt-2' />
            <p className='font-manrope text-lg text-left text-[#939393] mx-4'>
              Selaras ngasih rekomendasi ke Ubud saat aku lagi butuh ketenangan. Suasana alamnya bikin rileks banget!
            </p>
            <div className='flex items-start'>
              <img src={ppNobel} alt="ppNobel" className='p-2 w-16 h-16 flex ml-2' />
              <div className='flex flex-col items-start justify-center my-auto'>
                <h1 className='font-semibold font-manrope text-[#2E2E2E] text-lg'>Amanda Nobela</h1>
                <p className='font-semibold font-manrope text-[#939393] text-md'>Product Designer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4*/}
        <div className='lg:w-[320px] lg:h-[412px] rounded-2xl bg-[#FAFAFA] border-[#D6D6D6] border-2 flex flex-col'>
          <div className='flex items-start justify-start'>
            <div className='flex flex-col items-start justtify-start'>
              <img src={ppAhmad} alt="pp-byan" className='p-2 w-16 h-16' />
              <img src={petik} alt="petik" className='w-8 h-8 ml-3 mt-2' />
            </div>
            <div className='flex flex-col items-start justify-start'>
              <h1 className='font-semibold font-manrope text-[#2E2E2E] text-lg mt-2'>Ahmad Raihan</h1>
              <p className='font-semibold font-manrope text-[#939393] text-md'>IT Consultan</p>
            </div>
          </div>
          <p className='font-manrope text-lg mx-4 text-left text-[#939393]'>
            Awalnya aku bingung mau liburan ke mana karena lagi butuh suasana yang tenang tapi tetap punya pemandangan yang indah. Setelah isi kuis di Selaras, aku direkomendasikan ke Sumba, dan ternyata itu spot yang luar biasa!
          </p>
          <div className='flex flex-row gap-3 items-start justify-start ml-4 mt-6'>
            <div className='w-20 h-6 bg-[#BEE1E6] rounded-lg items-center flex flex-row justify-center'>
              <p className='text-[#003366] text-sm font-manrope font-semibold'>#Eksplor</p>
            </div>
            <div className='w-20 h-6 bg-[#BEE1E6] rounded-lg items-center justify-center'>
              <p className='text-[#003366] text-sm font-manrope font-semibold'>#Tenang</p>
            </div>
          </div>
          <p className='text-[#939393] font-manrope font-semibold flex items-end justify-end mt-5 mr-3'>Feb 2025</p>
        </div>
      </div>
    </div>
  )
}

export default Testimony