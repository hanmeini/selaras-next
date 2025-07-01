"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "swiper/css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css/autoplay";
import ppAhmad from "../../public/images/pp-ahmad.png";
import ppByan from "../../public/images/pp-byan.png";
import ppErland from "../../public/images/pp-erland.png";
import ppNobel from "../../public/images/pp-nobel.png";

const LandingPage = () => {
  const router = useRouter();
  const testimonyCards = [
    {
      name: "Byantara Nadif",
      role: "Traveler",
      image: ppByan,
      text: "Baru kali ini cari tempat liburan gampang banget. Tinggal pilih mood, langsung dapat rekomendasi yang pas! Selaras sangat ngebantu aku nemuin tempat liburan.",
      tags: ["#Eksplor", "#Tenang"],
      date: "Mei 2025",
    },
    {
      name: "Erland Pramatta",
      role: "Globaltraveler",
      image: ppErland,
      text: "Pilihan tempatnya sesuai banget sama moodku waktu itu. Dapat rekomendasi hidden gem yang nggak kepikiran sebelumnya!",
      date: "April 2025",
    },
    {
      name: "Amanda Nobela",
      role: "Product Designer",
      image: ppNobel,
      text: "Selaras ngasih rekomendasi ke Ubud saat aku lagi butuh ketenangan. Suasana alamnya bikin rileks banget!",
      date: "Maret 2025",
    },
    {
      name: "Ahmad Raihan",
      role: "IT Consultan",
      image: ppAhmad,
      text: "Awalnya aku bingung mau liburan ke mana karena lagi butuh suasana yang tenang tapi tetap punya pemandangan yang indah. Setelah isi kuis di Selaras, aku direkomendasikan ke Sumba, dan ternyata itu spot yang luar biasa!",
      tags: ["#Eksplor", "#Tenang"],
      date: "Feb 2025",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return (
    <section id="landingpage" className="overflow-x-hidden">
      {/* home */}
      <section
        id="home"
        style={{ backgroundImage: `url('/images/bg-grid.png')` }}
        className="flex flex-col pt-20 bg-cover bg-center bg-no-repeat h-full min-w-screen"
      >
        <div className="flex flex-col p-20 justify-center items-center relative">
          <div className="absolute top-1/4 md:top-1/10 left-3 md:left-auto md:right-8 lg:right-72">
            <img
              src="/images/Smiley Fun.png"
              className="animate-float-y w-16 md:w-20 lg:w-24"
              alt="smile"
            />
          </div>
          <div
            className="flex flex-col gap-10 items-center"
            data-aos="fade-right"
            data-aos-duration="2000"
          >
            <h1 className="font-bold text-[2rem] md:text-5xl text-center">
              Jelajahi sesuai{" "}
              <span className="font-light text-[2rem] md:text-5xl">MOOD</span>
              -mu
            </h1>
            <p className="text-[#8A9497] max-w-[80%] text-center">
              Selaras bantu kamu temukan liburan terbaik sesuai mood, dengan
              rekomendasi dari <span className="font-bold text-black">AI</span>{" "}
              ✨
            </p>
          </div>
          <button
            onClick={() => router.push("/quiz")}
            className="bg-[#003366] text-white px-5 py-3 rounded-full font-semibold mt-10 hover:scale-90 duration-300 cursor-pointer font-manrope"
          >
            Mulai Sekarang
          </button>
        </div>
        <div className="flex flex-col justify-center relative">
          <div className="flex flex-row gap-5 justify-center items-center">
            <img
              className="object-contain min-w-30 lg:h-96 lg:w-96 lg:min-w-[200px]"
              src="/images/home1.png"
              alt="home1"
            />
            <img
              className="object-contain min-w-30 lg:h-[300px] lg:w-[400px] lg:min-w-[200px] mt-[70px] lg:mt-[130px]"
              src="/images/home2.png"
              alt="home2"
            />
            <img
              className="object-contain min-w-30 lg:h-96 lg:w-96 lg:min-w-[200px]"
              src="/images/home3.png"
              alt="home3"
            />
          </div>
          <div className="w-full h-[60%] absolute right-0 left-0 bottom-[10%] bg-gradient-to-t mb-20 from-white to-transparent"></div>
          <div className="bg-white w-full lg:flex lg:flex-row flex flex-col justify-between items-start z-20 p-6">
            <h2 className="text-[#8A9497] text-md lg:text-[27px] font-semibold">
              Terintegrasi dengan 5+ Travel Startup{" "}
            </h2>
            <div className="flex flex-row gap-3 mr-3 lg:justify-end">
              <img
                className="object-contain max-w-1/4 md:max-w-1/6"
                src="/images/airbnb.png"
                alt="airbnb"
              />
              <img
                className="object-contain max-w-1/4 md:max-w-1/6"
                src="/images/traveloka.png"
                alt="traveloka"
              />
              <img
                className="object-contain max-w-1/4 md:max-w-1/6"
                src="/images/trivago.png"
                alt="trivago"
              />
              <img
                className="object-contain max-w-1/4 md:max-w-1/6"
                src="/images/oyo.png"
                alt="oyo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* about */}
      <section
        id="about"
        className="min-h-screen min-w-screen flex items-center justify-center relative overflow-x-hidden overflow-y-hidden mb-32"
      >
        <img
          src="/images/btr.png"
          className="absolute lg:top-40 md:top-0 md:left-36 top-[560px] -left-20 sm:top-[580px] w-56 h-56 md:w-30 md:h-30 items-start justify-start"
        />
        <img
          src="/images/gunung.png"
          className="absolute lg:top-40 md:top-0 md:right-28 top-[560px] -right-10 sm:top-[580px] w-56 h-56 md:w-30 md:h-30 items-start justify-start"
        />

        <div
          className="max-w-2xl text-center z-10 top-0 absolute mt-52"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="text-[#AAB5B5] font-manrope text-md">
            Mood kamu, Destinasi kami.
          </h1>
          <p className="md:text-4xl px-5 text-3xl mt-4 text-transparent bg-clip-text bg-gradient-to-r from-[#1E1E1E] to-[#D3CFCF] font-semibold font-manrope">
            Selaras adalah platform rekomendasi perjalanan berbasis AI yang
            membantu kamu menemukan destinasi liburan sesuai mood dan
            preferensimu.
          </p>
        </div>

        <img
          src="/images/emoji-senyum.png"
          className="absolute animate-float-x lg:top-[505px] lg:left-64 md:top-[480px] md:left-24 sm:top-[380px] sm:left-24 left-5 top-[480px] lg:w-20 lg:h-20 w-14 h-14"
        />
        <img
          src="/images/prambanan.png"
          className="absolute md:top-[500px] lg:top-[500px] lg:left-[610px] md:left-[300px] sm:top-[580px] top-[580px] w-64 h-48 md:w-36 md:h-26"
        />
        <img
          src="/images/sparkle.png"
          className="lg:top-[505px] animate-float-y md:top-[480px] lg:right-64 md:right-[70px] sm:top-[380px] absolute lg:w-36 right-7 top-[480px] lg:h-26 w-24 h-24"
        />
      </section>

      {/* overview */}
      <section id="overview">
        <div className="min-w-screen h-fit overflow-hidden bg-[#003366] px-8 pt-8 relative lg:-mt-32 md:-mt-60">
          <div className="flex flex-col items-start justify-start">
            <img
              src="/images/logo-noname.png"
              alt="logononame"
              className="lg:w-14 lg:h-14 w-10 h-10"
            />
            <div className="text-start font-manrope font-semibold lg:text-5xl text-3xl mt-5 relative" data-aos="fade-right" data-aos-duration="1000">
              <h1 className="text-[#FAFAFA] leading-snug">
                Nikmati <span className="text-[#B9D7F5]">Liburan </span>Dengan{" "}
                <span className="text-[#FFC300] relative inline-block">
                  Cara Baru
                  <img
                    src="/images/ciprat.png"
                    alt="ciprat"
                    className="absolute animate-rotate-swing lg:-top-5 lg:-right-10 lg:w-16 lg:h-14 w-14 h-14 -top-4 -right-12"
                  />
                </span>
              </h1>
            </div>
            <p className="text-[#DBDBDB] font-manrope lg:text-xl max-w-md text-start">
              Rasakan pengalaman liburan yang lebih personal, sesuai mood dan
              gayamu.
            </p>
            <button
              onClick={() => router.push("/quiz")}
              className="font-semibold font-manrope text-[#003366] items-center lg:text-center text-sm lg:text-md bg-[#FAFAFA] lg:w-44 lg:h-11 w-36 h-11 rounded-4xl mt-6 flex hover:scale-85 duration-250 cursor-pointer"
            >
              <img
                src="/images/emot-coba.png"
                alt="emot coba"
                className="lg:w-5 lg:h-5 w-3 h-3 mx-3"
              />
              Coba Sekarang
            </button>
          </div>

          {/* map */}
          <div className=" flex mt-10 bottom-2 relative" data-aos="fade-up" data-aos-duration="1000">
            <img
              src="/images/map.png"
              alt="map"
              className="lg:w-[800px] lg:h-[320px] md:w-[560px] md:h-[200px] lg:mt-5 md:flex hidden"
            />
            <img
              src="/images/sawah.png"
              alt="sawah"
              className="lg:w-[325px] lg:h-[471px] md:w-[240px] md:h-[320px] md:-mt-[118px] sm:mx-auto lg:-mt-[125px] md:ml-1 lg:ml-3 lg:-right-32 relative z-10 items-center justify-center"
            />
            <div className="absolute lg:bottom-[400px] bottom-0 lg:right-[400px] lg:-top-24 top-14 right-64 md:-top-16 md:right-52 sm:top-36 sm:right-[400px] bg-[#FAFAFA] p-4 h-24 w-24  rounded-2xl shadow-md shadow-slate-900 rotate-[25deg] flex items-start z-20">
              <img
                src="/images//emoji-bertanya.png"
                alt="emottanya"
                className="w-8 h-8 absolute top-0 left-0"
              />
              <p className="absolute max-w-1/3 bottom-2 left-2 font-manrope text-md font-semibold">
                Sesuai Moodmu
              </p>
            </div>
            <div className="absolute lg:bottom-20 lg:left-[1075px] md:bottom-6 md:left-[520px] sm:bottom-20 sm:left-60 bottom-28 right-36 bg-[#FAFAFA] p-4 h-24 w-24 rounded-2xl shadow-md shadow-slate-900 rotate-6 flex items-start z-20">
              <img
                src="/images/jam-mountain.png"
                alt="jamMountain"
                className="w-8 h-8 absolute top-0 left-0 -rotate-6"
              />
              <p className="absolute max-w-1/3 bottom-2 left-2 font-manrope text-md font-semibold">
                Jelajah Tempat
              </p>
            </div>
            <div className="absolute lg:-top-44 lg:right-20 -top-8 -right-6 md:-right-6 md:-top-36 sm:-top-4 sm:right-6 bg-[#FAFAFA] p-4 h-24 w-24 rounded-2xl shadow-md shadow-slate-900 -rotate-8 flex items-start z-20">
              <img
                src="/images/emot-coba.png"
                alt="emotCoba"
                className="lg:w-6 lg:h-6 absolute top-0 left-0 -rotate-6"
              />
              <p className="absolute max-w-1/3 bottom-2 left-2 font-manrope text-md font-semibold">
                Artificial Intelligence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* testimony */}
      <section id="testimony">
        <div className="mt-20 mb-48 min-w-screen h-max flex flex-col items-center relative">
          <img
            src="/images/arrow-right.png"
            alt="arrowRight"
            className="hidden md:block left-0 absolute md:w-36 md:h-32 rotate-2"
            data-aos="fade-right"
            data-aos-duration="1000"
          />
          <img
            src="/images/arrow-left.png"
            alt="arrowLeft"
            className="hidden md:block right-0 absolute md:w-36 md:h-32"
            data-aos="fade-left"
            data-aos-duration="1000"
          />
          <img
            src="/images/hand.png"
            alt="hand"
            className="animate-rotate-swing w-15 h-15"
          />
          <h1
            className="text-2xl md:text-5xl font-semibold font-manrope text-[#2E2E2E] mt-3"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Cerita Seru Mereka
          </h1>
          <p
            className="text-[#8A9497] mt-3"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Langsung dari pengalaman mereka.
          </p>

          {/* Desktop layout */}
          <div className="mt-10 min-w-screen min-h-screen lg:flex lg:flex-col items-center relative hidden">
            <div className="lg:flex lg:flex-row gap-4 mt-10">
              {/* Card 1 */}
              <div className="w-[320px] h-[412px] rounded-2xl bg-[#FAFAFA] border-[#D6D6D6] border-2 flex flex-col">
                <div className="flex items-start justify-start">
                  <div className="flex flex-col items-start justtify-start">
                    <img
                      src="/images/pp-byan.png"
                      alt="pp-byan"
                      className="p-2 w-16 h-16"
                    />
                    <img
                      src="/images/petik.png"
                      alt="petik"
                      className="w-8 h-8 ml-3 mt-2"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <h1 className="font-semibold font-manrope text-[#2E2E2E] text-lg mt-2">
                      Byantara Nadif
                    </h1>
                    <p className="font-semibold font-manrope text-[#939393] text-md">
                      Traveler
                    </p>
                  </div>
                </div>
                <p className="font-manrope text-lg mx-4 text-left text-[#939393]">
                  Baru kali ini cari tempat liburan gampang banget. Tinggal
                  pilih mood, langsung dapat rekomendasi yang pas! Selaras
                  sangat ngebantu aku nemuin tempat liburan.
                </p>
                <div className="flex flex-row gap-3 items-start justify-start ml-4 mt-6">
                  <div className="w-20 h-6 bg-[#BEE1E6] rounded-lg items-center flex flex-row justify-center">
                    <p className="text-[#003366] text-sm font-manrope font-semibold">
                      #Eksplor
                    </p>
                  </div>
                  <div className="w-20 h-6 bg-[#BEE1E6] rounded-lg items-center justify-center">
                    <p className="text-[#003366] text-sm font-manrope font-semibold">
                      #Tenang
                    </p>
                  </div>
                </div>
                <p className="text-[#939393] font-manrope font-semibold flex items-end justify-end mt-5 mr-3">
                  Mei 2025
                </p>
              </div>

              {/* Card 2 & 3 */}
              <div className="flex flex-col gap-3">
                <div className="w-[420px] h-[200px] rounded-2xl bg-[#FAFAFA] border-[#D6D6D6] border-2 flex flex-col">
                  <img
                    src="/images/petik.png"
                    alt="petik"
                    className="w-8 h-8 ml-3 mt-2"
                  />
                  <p className="font-manrope text-lg text-left text-[#939393] mx-4">
                    Pilihan tempatnya sesuai banget sama moodku waktu itu. Dapat
                    rekomendasi hidden gem yang nggak kepikiran sebelumnya!
                  </p>
                  <div className="flex items-start">
                    <img
                      src="/images/pp-erland.png"
                      alt="ppErland"
                      className="p-2 w-16 h-16 flex ml-2"
                    />
                    <div className="flex flex-col items-start justify-center my-auto">
                      <h1 className="font-semibold font-manrope text-[#2E2E2E] text-lg">
                        Erland Pramatta
                      </h1>
                      <p className="font-semibold font-manrope text-[#939393] text-md">
                        Globaltraveler
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-[420px] h-[200px] rounded-2xl bg-[#FAFAFA] border-[#D6D6D6] border-2 flex flex-col">
                  <img
                    src="/images/petik.png"
                    alt="petik"
                    className="w-8 h-8 ml-3 mt-2"
                  />
                  <p className="font-manrope text-lg text-left text-[#939393] mx-4">
                    Selaras ngasih rekomendasi ke Ubud saat aku lagi butuh
                    ketenangan. Suasana alamnya bikin rileks banget!
                  </p>
                  <div className="flex items-start">
                    <img
                      src="/images/pp-nobel.png"
                      alt="ppNobel"
                      className="p-2 w-16 h-16 flex ml-2"
                    />
                    <div className="flex flex-col items-start justify-center my-auto">
                      <h1 className="font-semibold font-manrope text-[#2E2E2E] text-lg">
                        Amanda Nobela
                      </h1>
                      <p className="font-semibold font-manrope text-[#939393] text-md">
                        Product Designer
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4*/}
              <div className="lg:w-[320px] lg:h-[412px] rounded-2xl bg-[#FAFAFA] border-[#D6D6D6] border-2 flex flex-col">
                <div className="flex items-start justify-start">
                  <div className="flex flex-col items-start justtify-start">
                    <img
                      src="/images/pp-ahmad.png"
                      alt="pp-byan"
                      className="p-2 w-16 h-16"
                    />
                    <img
                      src="/images/petik.png"
                      alt="petik"
                      className="w-8 h-8 ml-3 mt-2"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-start">
                    <h1 className="font-semibold font-manrope text-[#2E2E2E] text-lg mt-2">
                      Ahmad Raihan
                    </h1>
                    <p className="font-semibold font-manrope text-[#939393] text-md">
                      IT Consultan
                    </p>
                  </div>
                </div>
                <p className="font-manrope text-lg mx-4 text-left text-[#939393]">
                  Awalnya aku bingung mau liburan ke mana karena lagi butuh
                  suasana yang tenang tapi tetap punya pemandangan yang indah.
                  Setelah isi kuis di Selaras, aku direkomendasikan ke Sumba,
                  dan ternyata itu spot yang luar biasa!
                </p>
                <div className="flex flex-row gap-3 items-start justify-start ml-4 mt-6">
                  <div className="w-20 h-6 bg-[#BEE1E6] rounded-lg items-center flex flex-row justify-center">
                    <p className="text-[#003366] text-sm font-manrope font-semibold">
                      #Eksplor
                    </p>
                  </div>
                  <div className="w-20 h-6 bg-[#BEE1E6] rounded-lg items-center justify-center">
                    <p className="text-[#003366] text-sm font-manrope font-semibold">
                      #Tenang
                    </p>
                  </div>
                </div>
                <p className="text-[#939393] font-manrope font-semibold flex items-end justify-end mt-5 mr-3">
                  Feb 2025
                </p>
              </div>
            </div>
          </div>

          {/* Mobile layout with swiper */}
          <div className="lg:hidden w-full px-6 mt-10">
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              autoplay={{ delay: 4000 }}
              loop={true}
              modules={[Autoplay]}
            >
              {testimonyCards.map((card, i) => (
                <SwiperSlide key={i}>
                  <div className="w-full rounded-2xl bg-[#FAFAFA] border-[#D6D6D6] border-2 p-4 h-auto min-h-[300px] flex flex-col">
                    <img
                      src="/images/petik.png"
                      alt="petik"
                      className="w-8 h-8 mb-2"
                    />
                    <p className="font-manrope text-lg text-left text-[#939393]">
                      {card.text}
                    </p>
                    <div className="flex items-center mt-4">
                      <Image
                        src={card.image}
                        alt={`pp-${card.name}`}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-full mr-3"
                      />
                      <div className="flex flex-col">
                        <h1 className="font-semibold font-manrope text-[#2E2E2E] text-lg">
                          {card.name}
                        </h1>
                        <p className="font-semibold font-manrope text-[#939393] text-md">
                          {card.role}
                        </p>
                      </div>
                    </div>
                    {card.tags && (
                      <div className="flex flex-row gap-2 mt-3">
                        {card.tags.map((tag, j) => (
                          <div
                            key={j}
                            className="bg-[#BEE1E6] rounded-lg px-2 py-1"
                          >
                            <p className="text-[#003366] text-sm font-manrope font-semibold">
                              {tag}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-[#939393] font-manrope font-semibold mt-4 text-right">
                      {card.date}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </section>
  );
};

export default LandingPage;
