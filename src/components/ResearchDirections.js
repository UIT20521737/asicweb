import React from "react";
import { Cpu, Network, CircuitBoard, Layers, Binary } from "lucide-react";

const researchAreas = [
  { id: 1, title: "System-on-Chip (SoC)", icon: Cpu, color: "text-amber-500", glow: "from-amber-500/20", description: "Design and development of integrated systems on a single chip, focusing on energy efficiency and performance optimization." },
  { id: 2, title: "Embedded IoT", icon: Network, color: "text-indigo-500", glow: "from-indigo-500/20", description: "Development of embedded systems for IoT, including smart devices, sensors, and connected networks." },
  { id: 3, title: "ASIC Design", icon: CircuitBoard, color: "text-rose-500", glow: "from-rose-500/20", description: "Application-specific integrated circuit (ASIC) design, from RTL to verification and fabrication." },
  { id: 4, title: "VLSI", icon: Layers, color: "text-emerald-500", glow: "from-emerald-500/20", description: "Very Large-Scale Integration with millions of transistors, focusing on layout, testing, and simulation." },
  { id: 5, title: "FPGA & Digital Design", icon: Binary, color: "text-sky-500", glow: "from-sky-500/20", description: "FPGA prototyping and digital system design for signal processing and computer architecture." },
];

const ResearchDirections = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#fafafa]">
      {/* --- BACKGROUND DECORATION (Hiện đại nằm ở đây) --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-100/50 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter uppercase">
            Research <span className="text-[var(--color-primary)]">Directions</span>
          </h2>
          <div className="h-1.5 w-20 bg-[var(--color-primary)] mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(4,120,87,0.4)]"></div>
          <p className="text-gray-500 max-w-2xl mx-auto mt-6 text-base font-medium leading-relaxed">
            ASIC LAB pushes the boundaries of chip design and embedded technologies through specialized research pillars.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((area) => (
            <div 
              key={area.id} 
              className="group relative h-full transition-all duration-500"
            >
              {/* Card Shadow/Glow hiệu ứng khi hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${area.glow} to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500`}></div>
              
              {/* Main Card (Glassmorphism) */}
              <div className="relative h-full p-8 rounded-[2.5rem] border border-white bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-3 group-hover:bg-white/90 group-hover:border-[var(--color-primary)]/30">
                
                {/* Icon Box */}
                <div className={`w-16 h-16 mb-8 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-50 transition-all duration-500 group-hover:bg-[var(--color-primary)] group-hover:shadow-[0_10px_20px_rgba(4,120,87,0.2)]`}>
                  <area.icon className={`w-8 h-8 ${area.color} group-hover:text-white transition-colors duration-500`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight group-hover:text-[var(--color-primary)] transition-colors italic">
                  {area.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed font-medium transition-colors group-hover:text-gray-700">
                  {area.description}
                </p>

                {/* Decorative Element */}
                <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <area.icon className="w-12 h-12 text-[var(--color-primary)]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchDirections;