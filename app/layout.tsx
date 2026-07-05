import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import Nav from "../components/nav/page"
import GridOverlay from "../components/dev/grid-overlay"


const roobert = localFont({
  src: '../fonts/RoobertTRIALVF-BF67243fd545701.ttf',
  weight: '100 900',
  variable: '--font-roobert',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter-google',
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
      className={`${roobert.variable} ${inter.variable} h-full antialiased`}
      
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
        <GridOverlay />
      </body>
    </html>
  );
}
