"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Rocket, 
  Trophy, 
  Cpu, 
  Zap, 
  Users, 
  ChevronRight 
} from "lucide-react";

// --- Cấu hình hiệu ứng cuộn ---
const revealVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- Dữ liệu ---
const activities = [
  { title: "UIT Car Racing", desc: "Cuộc thi xe tự hành kịch tính nhất khu vực.", icon: Rocket, color: "bg-orange-500" },
  { title: "Olympic AMO", desc: "Đấu trường thiết kế vi mạch chuyên sâu.", icon: Cpu, color: "bg-emerald-500" },
  { title: "Career Connect", desc: "Kết nối trực tiếp 20+ tập đoàn công nghệ.", icon: Zap, color: "bg-blue-600" },
  { title: "Alumni Meeting", desc: "Giao lưu cùng các cựu sinh viên CE xuất sắc.", icon: Users, color: "bg-purple-600" },
];

const timeline = [
  { time: "07:30", event: "Check-in & Kit Collection", label: "Preparation" },
  { time: "08:30", event: "Opening Ceremony", label: "Kick-off" },
  { time: "09:30", event: "Grand Final: UIT Car Racing", label: "Main Event" },
  { time: "14:00", event: "Tech Workshop & Recruitment", label: "Career" },
  { time: "16:30", event: "Awarding & Closing", label: "Closing" },
];

export default function CEDayPage() {
  return (
    <div className="bg-white selection:bg-[#047857] selection:text-white antialiased">
      
      {/* 1. HERO SECTION - BLACK & EMERALD GLOW */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden">
        {/* Ambient Light Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#047857]/20 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[#10b981] text-[10px] font-black uppercase tracking-[0.5em] mb-10"
          >
            <Trophy className="w-4 h-4" /> The Grand Traditional Day
          </motion.div>

          <h1 className="text-[18vw] md:text-[14rem] font-[1000] text-white tracking-tighter leading-[0.8] uppercase italic mb-10 select-none">
            CE <span className="text-[#047857] drop-shadow-[0_0_30px_rgba(4,120,87,0.3)]">DAY</span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-16 font-medium tracking-tight leading-relaxed"
          >
            Sự kiện lớn nhất năm của Khoa Kỹ Thuật Máy Tính UIT. <br />
            Phá vỡ giới hạn - Kết nối tương lai.
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <div className="flex items-center gap-4 px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] text-white font-black italic hover:bg-white/10 transition-all">
              <Calendar className="text-[#047857] w-6 h-6" /> 16.11.2024
            </div>
            <div className="flex items-center gap-4 px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] text-white font-black italic hover:bg-white/10 transition-all">
              <MapPin className="text-[#047857] w-6 h-6" /> UIT CAMPUS
            </div>
          </motion.div>
        </motion.div>

        {/* Mouse Scroll Icon */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <motion.div 
              animate={{ y: [0, 12, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-2 bg-[#047857] rounded-full" 
            />
          </div>
        </div>
      </section>

      {/* 2. HIGHLIGHT ACTIVITIES - WHITE BENTO GRID */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariant}
            className="mb-24"
          >
            <h2 className="text-6xl md:text-9xl font-[1000] text-gray-900 uppercase italic tracking-tighter leading-[0.9]">
              EVENT <br /> <span className="text-[#047857]">HIGHLIGHTS</span>
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {activities.map((act, i) => (
              <motion.div 
                key={i}
                variants={revealVariant}
                className="group p-10 rounded-[3.5rem] bg-gray-50 border border-transparent hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] hover:border-[#047857]/20 transition-all duration-500"
              >
                <div className={`w-16 h-16 mb-10 flex items-center justify-center rounded-[1.5rem] ${act.color} text-white shadow-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                  <act.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase italic tracking-tighter leading-tight group-hover:text-[#047857] transition-colors">
                  {act.title}
                </h3>
                <p className="text-gray-500 text-sm font-bold leading-relaxed">
                  {act.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. AGENDA - DARK TIMELINE REVEAL */}
      <section className="py-32 bg-[#020617] relative">
        <div className="absolute top-1/2 left-0 w-full text-[20rem] font-[1000] text-white/[0.02] select-none -translate-y-1/2 whitespace-nowrap pointer-events-none uppercase italic">
          TIMELINE AGENDA TIMELINE
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-white">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariant}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Event Agenda</h2>
            <div className="h-2 w-24 bg-[#047857] mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="space-y-6">
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group flex gap-8 items-center p-10 rounded-[2.5rem] hover:bg-white/5 transition-all duration-500 border-b border-white/5 last:border-none"
              >
                <div className="text-4xl font-black text-[#047857] tabular-nums italic group-hover:scale-110 transition-transform">
                  {item.time}
                </div>
                <div className="h-12 w-[2px] bg-white/10 group-hover:bg-[#047857]/50 transition-colors" />
                <div className="flex-1">
                  <h4 className="text-2xl md:text-3xl font-bold uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                    {item.event}
                  </h4>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mt-2 block italic">{item.label}</span>
                </div>
                <ChevronRight className="w-8 h-8 text-white/10 group-hover:text-[#047857] group-hover:translate-x-2 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SPONSORS - REVEAL GRID */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariant}
            className="text-[10px] font-black text-gray-400 uppercase tracking-[0.6em] mb-24"
          >
            Strategic Enterprise Partners
          </motion.p>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
              <motion.div 
                key={p}
                variants={revealVariant}
                className="group h-36 bg-gray-50 rounded-[2.5rem] border border-transparent p-8 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:border-[#047857]/30 hover:bg-white hover:shadow-2xl transition-all duration-700"
              >
                <div className="text-2xl font-black text-gray-300 group-hover:text-[#047857] uppercase italic transition-colors">Partner {p}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-gray-100 text-center">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-4">
          ASIC LAB • CE DAY 2024 • UIT
        </div>
        <p className="text-[9px] font-bold text-gray-300 uppercase">Faculty of Computer Engineering</p>
      </footer>
    </div>
  );
}