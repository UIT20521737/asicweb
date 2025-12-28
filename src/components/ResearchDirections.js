"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cpu, Network, CircuitBoard, Layers, Binary } from "lucide-react";

const researchAreas = [
  { id: 1, title: "SoC Design", icon: Cpu, color: "text-amber-500", shadow: "shadow-amber-500/10", description: "Design and development of integrated systems on a single chip." },
  { id: 2, title: "Embedded IoT", icon: Network, color: "text-indigo-500", shadow: "shadow-indigo-500/10", description: "Development of embedded systems for IoT and smart networks." },
  { id: 3, title: "ASIC Design", icon: CircuitBoard, color: "text-rose-500", shadow: "shadow-rose-500/10", description: "Custom IC design from RTL to physical implementation." },
  { id: 4, title: "VLSI System", icon: Layers, color: "text-emerald-500", shadow: "shadow-emerald-500/10", description: "Large-Scale Integration focusing on layout and simulation." },
  { id: 5, title: "FPGA & Digital", icon: Binary, color: "text-sky-500", shadow: "shadow-sky-500/10", description: "Digital system design and FPGA prototyping for architectures." },
];

const ResearchDirections = () => {
  // Biến thể hoạt ảnh: Ráp từ 2 bên vào giữa với khoảng cách rút ngắn để mượt hơn
  const cardVariants = {
    hidden: (i) => ({
      opacity: 0,
      x: i === 0 || i === 3 ? -150 : i === 2 || i === 4 ? 150 : 0,
      y: i === 1 ? 80 : 0,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 0.7,
      }
    }
  };

  return (
    <section className="pt-4 pb-2 md:pt-8 md:pb-4 bg-white antialiased overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header - Đã giảm tối đa margin và padding */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-xl md:text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-2">
            Research <span className="text-[#047857]">Directions</span>
          </h2>
          <div className="h-1 w-8 bg-[#047857]/40 mx-auto rounded-full" />
        </motion.div>

        {/* Grid Container - Khoảng cách gap gọn hơn */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {researchAreas.map((area, i) => (
            <motion.div 
              key={area.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative w-full md:w-[45%] lg:w-[30%] min-w-[280px]"
            >
              {/* Card UI - Giảm padding và bo góc */}
              <div className="relative h-full p-6 md:p-7 rounded-[2rem] border border-gray-100 bg-white 
                              transition-all duration-500 ease-out flex flex-col items-center text-center
                              group-hover:shadow-[0_20px_40px_-12px_rgba(4,120,87,0.12)] 
                              group-hover:border-[#047857]/30
                              group-hover:-translate-y-1.5">
                
                {/* Icon Box - Thu nhỏ tỉ lệ */}
                <div className="w-12 h-12 md:w-14 md:h-14 mb-5 flex items-center justify-center rounded-2xl bg-gray-50 transition-all duration-500 group-hover:bg-[#047857] group-hover:rotate-6 shadow-sm">
                  <area.icon className={`w-6 h-6 md:w-7 md:h-7 ${area.color} group-hover:text-white transition-colors`} />
                </div>

                {/* Title - Nhỏ gọn hơn */}
                <h3 className="text-lg md:text-xl font-black text-gray-900 mb-2 md:mb-3 uppercase tracking-tighter group-hover:text-[#047857]">
                  {area.title}
                </h3>
                
                {/* Description - Nhỏ gọn hơn */}
                <p className="text-gray-500 text-[12px] md:text-[13px] leading-relaxed font-bold opacity-80 max-w-[240px]">
                  {area.description}
                </p>

                {/* Decor Detail */}
                <div className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-gray-100 group-hover:bg-[#047857] transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchDirections;