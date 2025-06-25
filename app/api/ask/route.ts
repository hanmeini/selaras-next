// Menggunakan NextResponse dari Next.js untuk membuat respons API
import { NextResponse } from 'next/server';
// Menggunakan axios untuk melakukan HTTP request ke API Gemini
import axios from 'axios';

// Ini adalah fungsi utama yang akan dijalankan oleh Vercel
// setiap kali ada permintaan POST ke /api/ask
export async function POST(req) {
  // --- KONFIGURASI KEAMANAN (CORS) ---
  // Daftar domain yang diizinkan untuk "berbicara" dengan API ini.
const allowedOrigins = [
  'https://selaras-ai.vercel.app',
  'https://selaras-next.vercel.app', // TAMBAHKAN INI
  'http://localhost:5173',
  'http://localhost:3000'
];

  const origin = req.headers.get('origin');

  // Membuat header respons standar
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Hanya tambahkan header 'Access-Control-Allow-Origin' jika origin-nya ada di daftar
  if (allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  // ------------------------------------

  // Browser akan mengirim request "pre-flight" dengan metode OPTIONS untuk mengecek izin CORS
  // Kita harus meresponsnya dengan status 204 (No Content) dan header yang benar.
  if (req.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers });
  }

  // Ambil API Key dari Environment Variables di Vercel
  const API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const refusalResponse = "Maaf, saya adalah Selaras, asisten pariwisata Indonesia. Saya hanya bisa membantu dengan pertanyaan seputar destinasi, tips liburan, dan rekomendasi tempat wisata. Ada hal lain tentang pariwisata yang bisa saya bantu?";
  const offTopicKeywords = ['politik', 'saham', 'coding', 'kesehatan', 'matematika'];

  try {
    // Ambil data JSON dari body request
    const { message: userMessage, history } = await req.json();

    // Siapkan konten untuk dikirim ke Gemini
    const contents = [
      {
        role: 'user',
        parts: [{ text: "PENTING: Kamu adalah 'Selaras', asisten perjalanan ahli pariwisata Indonesia. Tugasmu HANYA menjawab pertanyaan seputar destinasi, tips liburan, dan rekomendasi. JIKA pengguna bertanya di luar topik itu (misal: politik, coding, kesehatan), kamu WAJIB menolak dengan sopan dan mengarahkan kembali ke topik pariwisata." }]
      },
      {
        role: 'model',
        parts: [{ text: "Tentu, saya Selaras! Siap membantu Anda merencanakan liburan di Indonesia. Ada yang bisa saya bantu?" }]
      },
      // Sebarkan riwayat percakapan sebelumnya untuk memberikan konteks pada AI
      ...(Array.isArray(history) ? history : []),
      // Tambahkan pesan terakhir dari pengguna
      { role: 'user', parts: [{ text: userMessage }] }
    ];

    // Lakukan panggilan ke API Gemini menggunakan axios
    const geminiRes = await axios.post(GEMINI_URL, { contents });

    let reply = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, saya tidak bisa memberikan jawaban saat ini.';

    // Filter jawaban jika di luar topik
    const isOffTopic = offTopicKeywords.some(keyword => reply.toLowerCase().includes(keyword));
    if (isOffTopic) {
      console.log("Jawaban di luar topik — diganti dengan respons default.");
      reply = refusalResponse;
    }
    
    // Kembalikan respons sukses sebagai JSON dengan header CORS
    return NextResponse.json({ reply }, { headers });

  } catch (error) {
    console.error("Kesalahan saat memanggil Gemini:", error.response?.data || error.message);
    // Kembalikan respons error sebagai JSON dengan header CORS
    return NextResponse.json(
        { error: 'Gagal meminta jawaban dari Gemini API.' }, 
        { status: 500, headers }
    );
  }
}
export async function OPTIONS(req: Request) {
const allowedOrigins = [
  'https://selaras-ai.vercel.app',
  'https://selaras-next.vercel.app', // TAMBAHKAN INI
  'http://localhost:5173',
  'http://localhost:3000'
];

  const origin = req.headers.get('origin');

  const headers: HeadersInit = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (allowedOrigins.includes(origin ?? '')) {
    headers['Access-Control-Allow-Origin'] = origin!;
  }

  return new NextResponse(null, {
    status: 204,
    headers,
  });
}

