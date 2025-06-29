"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/Authcontext'; 
import { db } from '@/lib/firebase-config';      
import { collection, doc, addDoc, getDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import ChatMessage from '../components/ChatStyle'; 
import { useRouter } from 'next/navigation';
import AuthGuard from '../components/AuthGuard';
import Image from 'next/image';

const SendIcon = () => ( <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg> );
const AiIcon = () => (   <Image 
    src="/images/selarasAi.png"
    alt="Ikon Selaras AI" 
    width={32} 
    height={32} 
    className="rounded-full object-cover"
  /> 
 );
const NewChatIcon = () => ( <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg> );
const HomeIcon = () => ( <svg className='w-7 h-7' viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M12.5413 3.60374C13.2234 3.01136 14.0965 2.68518 15 2.68518C15.9035 2.68518 16.7766 3.01136 17.4587 3.60374L26.2087 11.1987C26.6143 11.5509 26.9394 11.986 27.1622 12.4747C27.3849 12.9634 27.5002 13.4942 27.5 14.0312V23.75C27.5 24.7446 27.1049 25.6984 26.4017 26.4016C25.6984 27.1049 24.7446 27.5 23.75 27.5H19.375C18.8777 27.5 18.4008 27.3024 18.0492 26.9508C17.6975 26.5992 17.5 26.1223 17.5 25.625V17.1087H12.5V25.625C12.5 26.1223 12.3025 26.5992 11.9508 26.9508C11.5992 27.3024 11.1223 27.5 10.625 27.5H6.25C5.25544 27.5 4.30161 27.1049 3.59835 26.4016C2.89509 25.6984 2.5 24.7446 2.5 23.75V14.0312C2.49985 13.4942 2.61506 12.9634 2.83783 12.4747C3.0606 11.986 3.38574 11.5509 3.79125 11.1987L12.5413 3.60374ZM15.82 5.49124C15.5926 5.29356 15.3013 5.18469 15 5.18469C14.6987 5.18469 14.4074 5.29356 14.18 5.49124L5.43 13.0875C5.29496 13.2049 5.18669 13.3499 5.11251 13.5127C5.03832 13.6755 4.99996 13.8523 5 14.0312V23.75C5 24.0815 5.1317 24.3995 5.36612 24.6339C5.60054 24.8683 5.91848 25 6.25 25H10V17.1087C10 16.4457 10.2634 15.8098 10.7322 15.341C11.2011 14.8721 11.837 14.6087 12.5 14.6087H17.5C18.163 14.6087 18.7989 14.8721 19.2678 15.341C19.7366 15.8098 20 16.4457 20 17.1087V25H23.75C24.0815 25 24.3995 24.8683 24.6339 24.6339C24.8683 24.3995 25 24.0815 25 23.75V14.0312C24.9999 13.8522 24.9613 13.6753 24.8869 13.5125C24.8125 13.3497 24.704 13.2047 24.5688 13.0875L15.82 5.49124Z" fill="black"/>
</svg>
 );
const HamburgerIcon = () => ( <svg className='w-7 h-7' viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M14.5827 5.83337H5.83268C5.05913 5.83337 4.31727 6.14066 3.77029 6.68765C3.22331 7.23463 2.91602 7.97649 2.91602 8.75004V26.25C2.91602 27.0236 3.22331 27.7655 3.77029 28.3124C4.31727 28.8594 5.05913 29.1667 5.83268 29.1667H14.5827V5.83337ZM6.38539 13.5523C6.112 13.8258 5.95841 14.1967 5.95841 14.5834C5.95841 14.9701 6.112 15.3409 6.38539 15.6144L8.27102 17.5L6.38539 19.3857C6.24611 19.5202 6.13501 19.6811 6.05858 19.859C5.98215 20.037 5.94192 20.2283 5.94023 20.422C5.93855 20.6156 5.97545 20.8076 6.04878 20.9868C6.1221 21.1661 6.23039 21.3289 6.36731 21.4658C6.50424 21.6028 6.66707 21.711 6.84629 21.7844C7.02552 21.8577 7.21755 21.8946 7.41118 21.8929C7.60482 21.8912 7.79618 21.851 7.97411 21.7746C8.15203 21.6981 8.31295 21.587 8.44747 21.4477L11.3641 18.5311C11.6375 18.2576 11.7911 17.8867 11.7911 17.5C11.7911 17.1133 11.6375 16.7425 11.3641 16.469L8.44747 13.5523C8.174 13.2789 7.80313 13.1254 7.41643 13.1254C7.02973 13.1254 6.65887 13.2789 6.38539 13.5523Z" fill="#003366"/>
<path d="M17.5 29.1667H29.1667C29.9402 29.1667 30.6821 28.8594 31.2291 28.3124C31.776 27.7655 32.0833 27.0236 32.0833 26.25V8.75004C32.0833 7.97649 31.776 7.23463 31.2291 6.68765C30.6821 6.14066 29.9402 5.83337 29.1667 5.83337H17.5V29.1667Z" fill="#003366"/>
</svg>
);
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

    const currentInput = input;
    const userMessage = { role: 'user', content: currentInput };
    
    // Siapkan riwayat percakapan dengan format yang benar untuk API Gemini
    const currentHistory = messages.map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user', // Gemini menggunakan 'model', bukan 'ai'
        parts: [{ text: msg.content }]
    }));
    
    // Update UI secara optimis dengan pesan baru pengguna
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const apiUrl = '/api/ask';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: currentInput,
                history: currentHistory 
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Tampilkan pesan error yang lebih detail dari server jika ada
            throw new Error(data.error || 'Terjadi kesalahan pada server AI.');
        }

        const aiMessage = { role: 'ai', content: data.reply };
        setMessages(prev => [...prev, aiMessage]);

        // Simpan ke Firestore jika ini adalah pesan pertama dari percakapan baru
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
        setMessages(prev => [...prev, { role: 'ai', content: `Maaf, terjadi kesalahan: ${err.message}` }]);
    } finally {
        setIsLoading(false);
    }
};
  

  return (
    <AuthGuard>
    <div className="flex h-screen bg-white font-sans">
      {/* --- Sidebar Desktop (Kiri) --- */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-50 shrink-0">
        <div className="p-4 border-b">
          <img src='/images/logo.png' alt="logo" className="h-12 w-auto" />
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
              <img src='/images/logo.png' className='w-40 object-contain'/>
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
                    <Image 
                        src="/images/selarasAi.png" 
                        alt="Ikon Selaras AI" 
                        width={32} 
                        height={32} 
                        className="animate-float-y rounded-full object-cover"
                      /> 
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
    </AuthGuard>
  );
};

export default ChatPage;