// src/app/(main)/layout.js

import Footer from '@/components/Footer';
import Header from '@/components/Header';
export const metadata = {
  title: {
    template: '%s | ASicLab', // Sets a title template for all pages in this layout
    default: 'ASicLab Home',
  },
  description: 'A website for the ASicLab.',
};

// Đây là Layout Con, nó chỉ chứa các thành phần UI
export default function RootLayout({ children }) {
  return (
    // Dùng một div hoặc React Fragment để bao bọc
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer/>
      {/* <Footer /> có thể thêm ở đây */}
    </div>
  );
}