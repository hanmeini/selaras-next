import type { Metadata } from "next";
import './globals.css'
import { Providers } from "./providers";
import { LayoutManager } from "./LayoutManager"; 

export const metadata: Metadata = {
  title: "Selaras",
  description: "Jelajahi wisata sesuai mood",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" type="image/png" href="/images/logo-pp.png?v=2" />
      </head>
      <body>
        <Providers>
          <LayoutManager>{children}</LayoutManager>
        </Providers>
      </body>
    </html>
  );
}

