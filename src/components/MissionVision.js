"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Heart, Zap, Shield, Users, Star } from "lucide-react";

// Danh sách các giá trị cốt lõi
const coreValues = [
  { title: "Quality", desc: "Premium Service Standards", icon: Star, color: "bg-amber-400" },
  { title: "Innovation", desc: "Tech-Driven Solutions", icon: Zap, color: "bg-blue-500" },
  { title: "Collaboration", desc: "Growing Stronger Together", icon: Users, color: "bg-rose-500" },
  { title: "Responsibility", desc: "Commitment to Society", icon: Shield, color: "bg-emerald-500" },
];

const MissionVision = () => {
  // Hiệu ứng mờ dần và trượt lên cho các thẻ Core Values
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  // Hiệu ứng trượt từ hai bên vào giữa với tốc độ cao
  const slideVariants = {
    hidden: (index) => ({
      opacity: 0,
      x: index === 0 ? -200 : index === 1 ? 200 : 0,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.5,
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  return (
    <section className="pt-4 pb-6 md:pt-8 md:pb-12 relative overflow-hidden bg-white antialiased font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Khối Tầm nhìn và Sứ mệnh */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-12 gap-4 md:gap-6"
        >
          
          {/* Vision - Đã bỏ mốc 2030 */}
          <motion.div 
            custom={0}
            variants={slideVariants}
            className="lg:col-span-7 group relative overflow-hidden p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-slate-950 text-white shadow-xl transition-all duration-500 hover:-translate-y-1.5"
          >
            <div className="relative z-10 flex items-start gap-4 md:gap-6">
              <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#047857] transition-all duration-500">
                <Target className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 md:mb-3 leading-none">Vision</h3>
                <p className="text-gray-400 text-sm md:text-base font-bold leading-relaxed max-w-md group-hover:text-white transition-colors">
                  To become a leading organization in education and research, building a sustainable global knowledge community.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#047857] opacity-10 rounded-full blur-3xl transition-all group-hover:opacity-30" />
          </motion.div>

          {/* Mission */}
          <motion.div 
            custom={1}
            variants={slideVariants}
            className="lg:col-span-5 group p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:border-[#047857]/20 hover:-translate-y-1.5"
          >
            <div className="flex items-start gap-4 md:gap-6">
              <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-2xl bg-emerald-50 text-[#047857] group-hover:bg-[#047857] group-hover:text-white transition-all duration-500">
                <Heart className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 md:mb-3 leading-none text-gray-900">Mission</h3>
                <p className="text-gray-500 text-xs md:text-sm font-black leading-relaxed">
                  To provide high-quality educational solutions and drive applied research for professional growth and community development.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div 
            variants={staggerContainer}
            className="lg:col-span-12 mt-2 md:mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {coreValues.map((v, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="group p-4 md:p-6 rounded-2xl md:rounded-3xl bg-gray-50 border border-transparent transition-all duration-500 hover:bg-white hover:shadow-xl hover:border-gray-100 hover:-translate-y-1"
              >
                <div className={`w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-4 flex items-center justify-center rounded-xl ${v.color} text-white shadow-sm transition-all group-hover:rotate-12`}>
                  <v.icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h4 className="font-black text-gray-900 uppercase tracking-tight text-xs md:text-sm mb-1">
                  {v.title}
                </h4>
                <p className="text-gray-500 text-[10px] md:text-[11px] font-bold uppercase tracking-wider leading-tight">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default MissionVision;