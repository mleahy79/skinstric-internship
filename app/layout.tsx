import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import Nav from "../components/nav/page"


const roobert = localFont({
  src: '../fonts/RoobertTRIALVF-BF67243fd545701.ttf',
  weight: '100 900',
  variable: '--font-roobert',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Skinstric",
  description: "Sophisticated skincare analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roobert.variable} h-full antialiased`}
      
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
      </body>
    </html>
  );
}
