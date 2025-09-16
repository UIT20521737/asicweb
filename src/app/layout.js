// src/app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Sửa lại đường dẫn import CSS
import { ThemeProvider } from "@/components/ThemeProvider"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ASICLab - UIT",
  description: "The Application-Specific Integrated Circuit (ASIC) Design and Research Laboratory at the University of Information Technology - VNU-HCM.",
};

// Đây là Layout Gốc, nó chứa html và body
export default function RootLayout({ children }) {
  return (
    // Áp dụng các biến font ở đây
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider>
         {children}
        </ThemeProvider>
      </body>
    </html>
  );
}