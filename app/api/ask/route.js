import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  // Ambil API Key dari Environment Variables (di Vercel atau file .env.local)
  const API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const offTopicKeywords = ['politik', 'saham', 'coding', 'javascript', 'python', 'kesehatan', 'penyakit', 'matematika', 'fisika', 'resep masakan'];
  const refusalResponse = "Maaf, saya adalah Selaras, asisten pariwisata Indonesia. Saya hanya bisa membantu dengan pertanyaan seputar destinasi, tips liburan, dan rekomendasi tempat wisata. Ada hal lain tentang pariwisata yang bisa saya bantu?";

  try {
    const { message: userMessage, history } = await req.json();

    const contents = [
      {
        role: 'user',
        parts: [{ text: "PENTING: Kamu adalah 'Selaras', asisten perjalanan ahli pariwisata Indonesia. Tugasmu HANYA menjawab pertanyaan seputar destinasi, tips liburan, dan rekomendasi. JIKA pengguna bertanya di luar topik itu (misal: politik, coding, kesehatan), kamu WAJIB menolak dengan sopan dan mengarahkan kembali ke topik pariwisata." }]
      },
      {
        role: 'model',
        parts: [{ text: "Tentu, saya Selaras! Siap membantu Anda merencanakan liburan di Indonesia. Ada yang bisa saya bantu?" }]
      },
      ...(Array.isArray(history) ? history : []),
      { role: 'user', parts: [{ text: userMessage }] }
    ];

    const geminiRes = await axios.post(GEMINI_URL, { contents });

    let reply = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, saya tidak bisa memberikan jawaban saat ini.';

    const isOffTopic = offTopicKeywords.some(keyword => reply.toLowerCase().includes(keyword));

    if (isOffTopic) {
      console.log("Jawaban di luar topik — diganti dengan respons default.");
      reply = refusalResponse;
    }

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Kesalahan saat memanggil Gemini:", error.response?.data || error.message);
    return NextResponse.json({ error: 'Gagal meminta jawaban dari Gemini API.' }, { status: 500 });
  }
}