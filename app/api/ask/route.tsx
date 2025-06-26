import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

const allowedOrigins = [
  'https://selaras-ai.vercel.app',
  'https://selaras-next.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') || '';
  const headers: HeadersInit = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  // Handle preflight CORS request
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers });
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const refusalResponse = "Maaf, saya adalah Selaras, asisten pariwisata Indonesia. Saya hanya bisa membantu dengan pertanyaan seputar destinasi, tips liburan, dan rekomendasi tempat wisata. Ada hal lain tentang pariwisata yang bisa saya bantu?";
  const offTopicKeywords = ['politik', 'saham', 'coding', 'kesehatan', 'matematika'];

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

    return NextResponse.json({ reply }, { headers });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Kesalahan saat memanggil Gemini:", error.message);
    } else {
      console.error("Kesalahan saat memanggil Gemini:", error);
    }
  }
  return NextResponse.json(
    { error: 'Gagal meminta jawaban dari Gemini API.' },
    { status: 500, headers }
  );
}

// Handle request OPTIONS (CORS preflight)
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') || '';
  const headers: HeadersInit = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return new NextResponse(null, {
    status: 204,
    headers,
  });
}
