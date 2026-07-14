import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import Nav from "../components/Nav"


const roobert = localFont({
  src: [
    { path: '../fonts/roobert/RoobertTRIAL-Light-BF67243fd502239.otf', weight: '300', style: 'normal' },
    { path: '../fonts/roobert/RoobertTRIAL-Regular-BF67243fd53fdf2.otf', weight: '400', style: 'normal' },
    { path: '../fonts/roobert/RoobertTRIAL-Medium-BF67243fd53e059.otf', weight: '500', style: 'normal' },
    { path: '../fonts/roobert/RoobertTRIAL-SemiBold-BF67243fd54213d.otf', weight: '600', style: 'normal' },
    { path: '../fonts/roobert/RoobertTRIAL-Bold-BF67243fd540abb.otf', weight: '700', style: 'normal' },
    { path: '../fonts/roobert/RoobertTRIAL-Heavy-BF67243fd53e164.otf', weight: '800', style: 'normal' },
  ],
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
      </body>
    </html>
  );
}
