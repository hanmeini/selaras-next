"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/Authcontext'; // Menggunakan alias path '@/' adalah praktik baik di Next.js
import { db } from '@/lib/firebase-config';      // Sesuaikan path ini dengan struktur Anda
import { collection, doc, addDoc, getDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import ChatMessage from '@/components/ChatStyle'; // Ganti nama file menjadi ChatMessage.jsx
import logo from "@/public/images/logo.png";
import SelarasAI from '@/public/images/selarasAi.png';
import { useRouter } from 'next/navigation';

// --- Komponen Ikon dengan sintaks JSX yang benar (camelCase) ---
const SendIcon = () => ( <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg> );
const AiIcon = () => ( <img src={SelarasAI} alt="Ikon Selaras AI" className="w-8 h-8 rounded-full object-cover"/> );
const NewChatIcon = () => ( <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg> );
const HomeIcon = () => ( <svg className="w-7 h-7" strokeWidth={1.5} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="..." fill="black"/></svg> );
const HamburgerIcon = () => ( <svg className='h-7 w-7' viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="..." fill="#003366"/><path d="..." fill="#003366"/></svg>);
const CloseIcon = () => ( <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> );

const ChatPage = () => {
    const router = useRouter();
    const { userProfile } = useAuth();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

  useEffect(() => { scrollToBottom(); }, [messages, isLoading]);

  // Mengambil riwayat chat dari Firestore untuk sidebar
  useEffect(() => {
    if (!userProfile) return;
    const q = query(collection(db, `users/${userProfile.uid}/chats`), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const history = snapshot.docs.map(doc => ({ id: doc.id, title: doc.data().prompt.substring(0, 30) + '...' }));
      setChatHistory(history);
    });
    return () => unsubscribe();
  }, [userProfile]);

  // Fungsi untuk memulai percakapan baru
  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setInput('');
  };

  // Fungsi untuk memuat percakapan lama dari riwayat
  const handleLoadChat = async (chatId) => {
    if (!userProfile) return;
    setIsLoading(true);
    setMessages([]);
    setCurrentChatId(chatId);
    
    const docRef = doc(db, `users/${userProfile.uid}/chats`, chatId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const chatData = docSnap.data();
      setMessages([
        { role: 'user', content: chatData.prompt },
        { role: 'ai', content: chatData.response }
      ]);
    } else {
      console.error("No such document!");
    }
    setIsLoading(false);
  };

  // Fungsi utama untuk mengirim pesan
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !userProfile) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
            const apiUrl = '/api/ask'; // Cukup path relatif

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: currentInput,
                    history: messages // Mengirim riwayat untuk konteks
                }),
            });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const aiMessage = { role: 'ai', content: data.reply };
      setMessages(prev => [...prev, aiMessage]);

      if (currentChatId === null) {
        const chatCollectionRef = collection(db, `users/${userProfile.uid}/chats`);
        const newDocRef = await addDoc(chatCollectionRef, {
          prompt: currentInput,
          response: data.reply,
          timestamp: serverTimestamp(),
        });
        setCurrentChatId(newDocRef.id);
      }  
      } catch (err) {
        console.error("Fetch Error:", err);
        let errorMessage = 'Maaf, terjadi kesalahan saat menghubungi server.';
        
        // Coba ambil pesan error spesifik dari backend jika ada
        if (err.response && err.response.data && err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.message) {
          // Untuk error jaringan seperti 'Network Error'
          errorMessage = err.message;
        }
        
        setMessages(prev => [...prev, { role: 'ai', content: errorMessage }]);
      } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex h-screen bg-white font-sans">
      {/* --- Sidebar Desktop (Kiri) --- */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-50 shrink-0">
        <div className="p-4 border-b">
          <img src={logo} alt="logo" className="h-12 w-auto" />
        </div>
        <div className="p-2">
          <button onClick={() => router.push('/')} className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-200 font-medium text-sm">
            <HomeIcon /> Beranda
          </button>
        </div>
        <div className="p-2">
          <button onClick={handleNewChat} className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-200 font-medium text-sm">
            <NewChatIcon /> Percakapan Baru
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          <p className="px-3 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase justify-start flex">Riwayat</p>
          {chatHistory.map(chat => (
            <button key={chat.id} onClick={() => handleLoadChat(chat.id)} className={`w-full text-left block p-3 rounded-lg text-sm truncate ${currentChatId === chat.id ? 'bg-gray-200 font-medium' : 'hover:bg-gray-200'}`}>
              {chat.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* --- Panel Riwayat Mobile */}
      <div className={`fixed top-0 left-0 h-full w-full bg-black/50 z-50 transition-opacity md:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)}>
        <div className={`absolute top-0 left-0 h-full w-4/5 max-w-xs bg-gray-50 shadow-xl transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between p-5 border-b">
            <div className='flex items-center gap-2'>
              <img src={logo} className='w-40 object-contain'/>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2"><CloseIcon /></button>
          </div>
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto fixed z-1000">
            <button onClick={() => router.push('/')} className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-200 font-medium text-sm">
              <HomeIcon /> Beranda
            </button>
            <button onClick={()=> {handleNewChat(), setMobileMenuOpen(false);}} className="flex mb-5 items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-200 font-medium text-sm">
              <NewChatIcon /> Percakapan Baru
            </button>
            <p className="px-3 pt-2 pb-2 text-xs font-semibold text-gray-500 uppercase text-left">Percakapan</p>
            {chatHistory.map(chat => (
              <button key={chat.id} onClick={() => { handleLoadChat(chat.id); setMobileMenuOpen(false); }} className={`w-full text-left block p-3 rounded-lg text-sm truncate ${currentChatId === chat.id ? 'bg-gray-200 font-medium' : 'hover:bg-gray-200'}`}>
                {chat.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* --- Area Chat Utama (Kanan) --- */}
       <main className="flex-1 flex flex-col shadow-lg h-screen">
        {/* --- Header Khusus Mobile --- */}
        <header className="md:hidden flex items-center p-4 bg-white">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2">
            <HamburgerIcon />
          </button>
          <button onClick={handleNewChat} className="p-2">
            <NewChatIcon />
          </button>
        </header>
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* --- Tampilan Kosong (Empty State) --- */}
            {messages.length === 0 && !isLoading && (
              <div className="text-left py-20 flex flex-row gap-2 md:gap-10">
                <div className="inline-block p-3 rounded-full">
                  <img src={SelarasAI} />
                </div>
                <h2 className="mt-4 text-xl md:text-2xl font-semibold text-gray-800">Halo! Lagi pengen liburan? Yuk cari tempat seru bareng aku!</h2>
              </div>
            )}

            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                <AiIcon />
                <div className="flex-1 pt-4">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* --- Input Form --- */}
        <div className="p-4 sm:p-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Cari tempat sesuai moodmu..."
                className="w-full py-5 pl-4 pr-14 rounded-full bg-gray-100 border-2 border-t-2 border-gray-200 border-t-[#003366] focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}  
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-4 rounded-full bg-[#003366] text-white hover:bg-[#51769b] disabled:bg-gray-400"
                disabled={isLoading || !input.trim()}
              >
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;