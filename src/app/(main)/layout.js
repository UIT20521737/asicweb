import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Header from '@/components/Header'
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <Header/>
          {children}
        </div>
      </body>
    </html>
  );
}
