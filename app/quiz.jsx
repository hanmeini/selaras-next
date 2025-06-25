import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgHome from "../assets/bg-grid.png";
import question from "../assets/question.png";

export const quizQuestions = [
  // --- BAGIAN 1: Menentukan KATEGORI UTAMA (3 Pertanyaan) ---
  {
    question: "Jenis tempat wisata seperti apa yang paling menarik bagi Anda?",
    key: "kategori_1",
    options: [
      { answer: "Pegunungan, danau, atau air terjun", category: "alam" },
      { answer: "Museum, candi, atau kota tua", category: "sejarah" },
      { answer: "Pantai dengan pasir dan ombak", category: "pantai" },
      { answer: "Taman hiburan atau pusat keramaian", category: "hiburan" },
    ],
  },
  {
    question:
      "Aktivitas apa yang paling ingin Anda lakukan di liburan berikutnya?",
    key: "kategori_2",
    options: [
      { answer: "Menjelajah alam dan menikmati udara segar", category: "alam" },
      {
        answer: "Mempelajari budaya dan cerita masa lalu",
        category: "sejarah",
      },
      { answer: "Bermain air dan bersantai di tepi laut", category: "pantai" },
      {
        answer: "Mencoba wahana seru dan mencari keramaian",
        category: "hiburan",
      },
    ],
  },
  {
    question: "Jika Anda punya waktu luang seharian, ke mana Anda akan pergi?",
    key: "kategori_3",
    options: [
      { answer: "Ke kawasan hutan pinus atau kebun teh", category: "alam" },
      { answer: "Mengunjungi bangunan-bangunan kuno", category: "sejarah" },
      { answer: "Menikmati matahari terbenam di pantai", category: "pantai" },
      { answer: "Ke theme park atau pusat perbelanjaan", category: "hiburan" },
    ],
  },

  // --- BAGIAN 2: Menentukan MOOD (1 Pertanyaan) ---
  {
    question:
      "Suasana atau 'mood' seperti apa yang Anda cari untuk liburan kali ini?",
    key: "pilihanMood",
    options: [
      { answer: "Romantis dan penuh kenangan", value: "romantis" },
      { answer: "Menantang dan penuh petualangan", value: "petualangan" },
      { answer: "Seru, ramai, dan penuh energi", value: "seru" },
      { answer: "Santai, tenang, dan damai", value: "santai" },
    ],
  },

  // --- BAGIAN 3: Menentukan PREFERENSI AKSESIBILITAS
  {
    question:
      "Apakah Anda memprioritaskan tempat wisata dengan fasilitas ramah difabel?",
    key: "preferensiDifabel",
    options: [
      { answer: "Ya, ini penting bagi saya", value: true },
      { answer: "Tidak, ini bukan prioritas utama", value: false },
    ],
  },
];

const ProgressBar = ({ current, total }) => {
  const percentage = ((current + 1) / total) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const QuizPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(
    Array(quizQuestions.length).fill(null)
  );
  const navigate = useNavigate();

  const handleSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFinish = () => {
    console.log("Tombol 'Selesai' diklik, fungsi handleFinish berjalan!");
    // Filter hanya jawaban dari pertanyaan kategori
    const categoryAnswers = answers.filter((ans) => ans && ans.category);

    // Hitung skor untuk setiap kategori
    const categoryCount = categoryAnswers.reduce((acc, current) => {
      acc[current.category] = (acc[current.category] || 0) + 1;
      return acc;
    }, {});

    const sortedCategories = Object.entries(categoryCount).sort(
      (a, b) => b[1] - a[1]
    );

    const topCategory =
      sortedCategories.length > 0 ? sortedCategories[0][0] : "alam";

    // 2. AMBIL JAWABAN SPESIFIK UNTUK MOOD
    const moodAnswer = answers.find((ans) => ans && ans.key === "pilihanMood");

    const pilihanMood = moodAnswer ? moodAnswer.value : "semua";

    const difabelAnswer = answers.find(
      (ans) => ans && ans.key === "preferensiDifabel"
    );

    const butuhAksesDifabel = difabelAnswer ? difabelAnswer.value : false;

    console.log("--- HASIL KUIS ---");
    console.log("Kategori Terpilih:", topCategory);
    console.log("Mood Pilihan:", pilihanMood);
    console.log("Butuh Akses Difabel:", butuhAksesDifabel);
    console.log("--------------------");

    navigate(
      `/rekomendasi/${topCategory}?mood=${pilihanMood}&aksesDifabel=${butuhAksesDifabel}`
    );
  };

  const answeredQuestions = answers.reduce((acc, val, idx) => {
    if (val !== null) acc.push(idx);
    return acc;
  }, []);

  const currentQuestion = quizQuestions[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Jawaban:", answers[currentIndex]?.answer);
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgHome})` }}
      className="min-h-screen bg-gray-50 p-4 sm:p-8 md:p-12 mt-16 bg-cover bg-center bg-no-repeat font-manrope"
    >
      <div className="text-sm text-gray-600 mt-5 md:mt-0 mb-4 flex justify-start gap-1">
        <Link
          to="/quiz"
          className="text-[#003366] hover:underline font-semibold"
        >
          Layanan
        </Link>
        <span>/</span>
        <Link
          to="/quiz"
          className="text-[#003366] hover:underline font-semibold"
        >
          Quiz
        </Link>
        <span>/</span>
        <Link
          className="text-gray-400 hover:underline font-semibold"
        >
          Rekomendasi Wisata
        </Link>
      </div>
      {/* Header (tidak berubah) */}
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          QUIZ
        </h1>
        <img
          src={question}
          alt="question"
          className="object-contain w-12 h-16 md:w-14 md:h-20 mt-[-10px]"
        />
      </div>
      <div className="text-center mb-6">
        <p className="text-gray-500">
          Berikan jawabanmu untuk merekomendasikan wisata yang terbaik
        </p>
      </div>

      {/* === PERUBAHAN LAYOUT UTAMA DI SINI === */}
      {/* Menggunakan flexbox untuk layout responsif */}
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto gap-8">
        {/* Kiri: Kartu Pertanyaan Utama */}
        <div className="w-full lg:w-2/3 bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          {/* Progress Bar (Hanya Muncul di Mobile) */}
          <div className="lg:hidden">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Pertanyaan {currentIndex + 1} dari {quizQuestions.length}
              </span>
              <span>
                {Math.round(((currentIndex + 1) / quizQuestions.length) * 100)}%
              </span>
            </div>
            <ProgressBar current={currentIndex} total={quizQuestions.length} />
          </div>

          <h2 className="text-xl font-semibold mb-4 text-left">
            {currentQuestion.question}
          </h2>
          <p className="mb-4 text-gray-500 text-left">Berikan Jawabanmu :</p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-6">
              {currentQuestion.options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`flex items-center gap-3 border px-4 py-3 rounded-xl cursor-pointer transition-all ${
                    answers[currentIndex]?.answer === opt.answer
                      ? "bg-blue-50 border-blue-600 shadow"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={opt.answer}
                    checked={answers[currentIndex]?.answer === opt.answer}
                    onChange={() => handleSelect(opt)}
                    className="w-5 h-5 accent-blue-600"
                  />
                  <span className="font-medium">{opt.answer}</span>
                </label>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-gray-200 px-6 py-2 rounded-full font-semibold disabled:opacity-50 hover:bg-gray-300"
              >
                Prev
              </button>
              {currentIndex < quizQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={answers[currentIndex] === null}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold disabled:bg-blue-300 hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  disabled={answers[currentIndex] === null}
                  className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold disabled:bg-green-300 hover:bg-green-700"
                >
                  Selesai
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Kanan: List Pertanyaan (Hanya Muncul di Desktop) */}
        <div className="hidden lg:block w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-md font-semibold mb-4 border-b pb-3">
            List Kuis Pertanyaan
          </h3>
          <div className="flex flex-col gap-2">
            {quizQuestions.map((_, i) => (
              <div
                key={i}
                className={`flex justify-between items-center px-4 py-3 rounded-xl text-sm font-medium ${
                  currentIndex === i
                    ? "bg-blue-100 text-blue-900"
                    : answeredQuestions.includes(i)
                    ? "bg-green-100 text-green-900"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <span>Pertanyaan {i + 1}</span>
                {answeredQuestions.includes(i) && (
                  <span className="text-green-600">✔️</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
