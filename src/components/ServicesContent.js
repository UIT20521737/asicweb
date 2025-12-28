"use client";
import React, { useState, useEffect } from 'react';

/**
 * LƯU Ý: Để đảm bảo mã chạy được trong môi trường xem trước này, 
 * tôi sử dụng các thẻ <a> và <img> tiêu chuẩn. 
 * Trong dự án Next.js của bạn, hãy thay thế:
 * - <a> bằng <Link> từ 'next/link'
 * - <img> bằng <Image> từ 'next/image'
 */

// Giả lập dữ liệu fetch từ hệ thống của bạn
const mockFetch = {
  courses: async () => [
    { id: 1, title: "Fundamental Digital IC Design", description: "Foundational knowledge in Verilog HDL and RTL design flow.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800" },
    { id: 2, title: "SoC Design with ARM Cortex", description: "Integrating complex IP cores and building complete architectures.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800" },
    { id: 3, title: "Industrial AIoT Applications", description: "Deploying AI models on edge devices for industrial ecosystems.", image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800" }
  ],
  equipment: async () => [
    { id: 1, name: "Digital Oscilloscope", brand: "Keysight", model: "InfiniiVision 3000T", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800" },
    { id: 2, name: "Function Generator", brand: "Tektronix", model: "AFG31000", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800" },
    { id: 3, name: "Logic Analyzer", brand: "Saleae", model: "Logic Pro 16", image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=800" },
    { id: 4, name: "Spectrum Analyzer", brand: "Rohde & Schwarz", model: "FPH", image: "https://images.unsplash.com/photo-1581092162384-8987c1794714?q=80&w=800" }
  ],
  internship: async () => "#"
};

export default function ServicesContent() {
  const [data, setData] = useState({ shortCourses: [], labEquipment: [], internshipLink: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      try {
        const [courses, equipment, internship] = await Promise.all([
          mockFetch.courses(),
          mockFetch.equipment(),
          mockFetch.internship()
        ]);
        setData({ shortCourses: courses, labEquipment: equipment, internshipLink: internship });
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAllData();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        {/* Spinner sử dụng màu primary #047857 */}
        <div className="w-10 h-10 border-4 border-emerald-700/20 border-t-emerald-700 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Loading Services...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans bg-white dark:bg-slate-950">
      
      {/* 1. Page Title & Internal Menu */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
          Our Services
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 font-medium">
          Comprehensive solutions for the semiconductor and AIoT industry, ranging from professional training to cutting-edge research facilities.
        </p>

        {/* Sub-navigation Menu */}
        <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {[
            { id: 'courses', label: 'Short Courses' },
            { id: 'equipment', label: 'Lab Equipment' },
            { id: 'internship', label: 'Internship' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-700 transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Short Courses Section */}
      <section id="courses" className="mb-20 scroll-mt-24">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Short Courses</h2>
          <div className="h-px flex-grow bg-slate-100 dark:bg-slate-800"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.shortCourses.map((course) => (
            <a key={course.id} href={`/services/courses/${course.id}`} className="group block">
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-900 mb-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-all group-hover:shadow-xl group-hover:-translate-y-1">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-700 transition-colors leading-tight">
                {course.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                {course.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* 3. Lab Equipment Section */}
      <section id="equipment" className="mb-20 scroll-mt-24">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Lab Equipment</h2>
          <div className="h-px flex-grow bg-slate-100 dark:bg-slate-800"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {data.labEquipment.map((item) => (
            <a key={item.id} href={`/services/equipment/${item.id}`} className="group flex flex-col items-center">
              <div className="w-full aspect-[3/2] rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-center p-6 mb-5 border border-slate-100 dark:border-slate-800 group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:shadow-xl group-hover:shadow-emerald-700/5 transition-all duration-300 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="text-center px-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1 group-hover:text-emerald-700 transition-colors leading-tight">
                  {item.name}
                </h3>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">
                  {item.brand} <span className="mx-1 text-slate-200">|</span> {item.model}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 4. Internship Section */}
      <section id="internship" className="scroll-mt-24">
        <div className="relative rounded-[3rem] bg-slate-900 p-10 md:p-16 lg:p-20 overflow-hidden text-white border border-slate-800 shadow-2xl shadow-emerald-700/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-700/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-700/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-6 block">Career Growth</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tighter">Internship Program</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Our internship program provides students with hands-on experience in IC and SoC design, as well as AIoT applications. You will work on real-world projects and be mentored by experienced engineers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12 w-full">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-emerald-500 font-bold mb-2">01. Apply</div>
                <p className="text-xs text-slate-500">Submit your professional application via our portal.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-emerald-500 font-bold mb-2">02. Interview</div>
                <p className="text-xs text-slate-500">Engage in technical discussions with our leads.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <div className="text-emerald-500 font-bold mb-2">03. Impact</div>
                <p className="text-xs text-slate-500">Start working on high-impact silicon projects.</p>
              </div>
            </div>

            <a
              href={data.internshipLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-10 py-4 bg-emerald-700 hover:bg-white hover:text-slate-950 text-white font-bold rounded-full shadow-lg shadow-emerald-700/20 transition-all group"
            >
              Apply for Internship
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}