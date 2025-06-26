import type { Metadata } from "next";
import './globals.css'
import { Providers } from "./providers";
import { LayoutManager } from "./LayoutManager"; 

export const metadata: Metadata = {
  title: "Selaras",
  icons: {
    icon: "/images/logo-pp.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LayoutManager>{children}</LayoutManager>
        </Providers>
      </body>
    </html>
  );
}
