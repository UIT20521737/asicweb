"use client";
import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  // Cấu hình hiệu ứng xuất hiện linh hoạt theo màn hình
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="pt-8 pb-4 md:pt-16 md:pb-8 bg-white overflow-hidden antialiased">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 md:gap-10 items-center">
          
          {/* CỘT TRÁI: THÔNG TIN CHIẾN LƯỢC */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-7 relative"
          >
            {/* Chữ UIT khổng lồ - Thu nhỏ lại đáng kể */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute -top-8 md:-top-16 -left-4 md:-left-8 text-[4rem] md:text-[8rem] font-black text-gray-50 select-none -z-10 tracking-tighter"
            >
              UIT
            </motion.div>
            
            <div className="relative z-10">
              <motion.h1 
                variants={fadeInUp}
                className="text-3xl sm:text-5xl md:text-6xl font-[1000] text-gray-900 tracking-tighter uppercase mb-4 md:mb-6 leading-none"
              >
                ASIC <span className="text-[#047857]">LAB</span>
              </motion.h1>
              
              <motion.div variants={fadeInUp} className="space-y-4 md:space-y-6">
                <p className="text-lg sm:text-xl md:text-3xl text-gray-800 leading-tight font-black tracking-tight">
                  The Hub of <span className="text-[#047857]">IC Design Excellence</span> at UIT.
                </p>
                
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-1 md:h-1.5 bg-[#047857] rounded-full"
                ></motion.div>
                
                <div className="space-y-3 md:space-y-4 max-w-xl text-gray-600 font-bold text-sm md:text-base leading-relaxed">
                  <p>
                    ASIC LAB UIT is a specialized research unit focused on the entire lifecycle of **Application-Specific Integrated Circuits** — from architectural definition to physical implementation.
                  </p>
                  <p className="hidden sm:block">
                    We empower students and researchers to master industry-standard EDA tools, bridging the gap between academic theory and Silicon reality.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* CỘT PHẢI: BẢN SẮC KỸ THUẬT (CHIP VIBE) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative mt-6 lg:mt-0"
          >
            <div className="relative aspect-square bg-slate-950 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl border-[4px] md:border-[8px] border-white group">
              
              {/* Lưới tọa độ (Grid) */}
              <div className="absolute inset-0 opacity-10 md:opacity-15" 
                   style={{ 
                     backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', 
                     backgroundSize: '25px 25px' 
                   }}>
              </div>

              {/* Đường dẫn mạch điện */}
              <div className="absolute inset-0">
                <div className="absolute top-1/3 left-0 w-full h-[1px] bg-emerald-500/15"></div>
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-emerald-500/15"></div>
              </div>

              {/* Khối trung tâm: Con chip chủ đạo - Thu nhỏ lại */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-28 h-28 md:w-36 md:h-36 mb-4 md:mb-6 border-2 border-[#047857] rounded-2xl md:rounded-[2rem] flex items-center justify-center relative bg-slate-900/60 backdrop-blur-md transition-all duration-500"
                >
                  <div className="absolute inset-2 md:inset-3 border border-[#047857]/20 rounded-lg md:rounded-xl animate-pulse"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-white font-[1000] text-xl md:text-2xl tracking-tighter leading-none">ASIC</span>
                    <span className="text-[#047857] font-black text-[7px] md:text-[9px] tracking-[0.4em] mt-1 uppercase">Core</span>
                  </div>
                </motion.div>
                
                <div className="space-y-1 md:space-y-2">
                  <p className="text-[#047857] font-black text-[9px] uppercase tracking-[0.4em]">Design to Silicon</p>
                  <p className="text-slate-500 text-[8px] uppercase tracking-[0.2em] font-bold">SoC • VLSI • FPGA</p>
                </div>
              </div>

              {/* Scanner Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#047857]/5 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-[scan_3s_linear_infinite] pointer-events-none"></div>
            </div>

            {/* Ambient Glow */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#047857]/10 blur-[80px] -z-10"></div>
          </motion.div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}} />
    </section>
  );
};

export default AboutUs;