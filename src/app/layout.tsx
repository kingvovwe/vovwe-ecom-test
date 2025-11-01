// File: src/app/layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import TopBanner from '@/components/layout/TopBanner';
import AuthModal from '@/components/auth/AuthModal';
import CartModal from '@/components/cart/CartModal';
import SearchModal from '@/components/search/SearchModal'; // <-- ADD THIS

const inter = Inter({ subsets: ['latin'] });

// --- ADDED metadata ---
export const metadata = {
  title: 'Vovwe Ecommerce',
  description: 'A modern ecommerce storefront.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" reverseOrder={false} />
        <AuthModal />
        <CartModal />
        <SearchModal /> {/* <-- ADD THIS */}
        
        <div className="flex flex-col min-h-screen">
          <TopBanner />
          <Header />
          
          
          <main className="flex-grow">
            {/* --- UPDATED: Removed the extra Suspense --- */}
            {children}
          </main>
          <Footer />
        </div>
        
      
      </body>
    </html>
  );
}