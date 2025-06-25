"use client"; // Pastikan ini ada di baris paling atas

import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export function LayoutManager({ children }) {
  const pathname = usePathname();

  const noNavFooterPaths = ['/login', '/register'];

  // Cek kondisi secara terpisah agar lebih mudah dibaca
  const isStaticPathToHide = noNavFooterPaths.includes(pathname);
  const isDetailPage = pathname.startsWith('/wisata/');
  const isChatPage = pathname === '/SelarasAI'; 

  // Gabungkan semua kondisi. Navbar/Footer akan disembunyikan jika salah satu kondisi true.
  const shouldHideNavFooter = isStaticPathToHide || isDetailPage || isChatPage;

  return (
    <>
      {shouldHideNavFooter ? (
        <main>{children}</main>
      ) : (
        <>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </>
      )}
    </>
  );
}