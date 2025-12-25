import React from "react";

const AboutUs = () => {
  return (
    <section className="py-16 bg-white overflow-hidden antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* CỘT TRÁI: THÔNG TIN CHIẾN LƯỢC */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -top-16 -left-10 text-[10rem] font-black text-gray-50 select-none -z-10 tracking-tighter opacity-70">
              UIT
            </div>
            
            <div className="relative z-10">
              <h1 className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tighter uppercase mb-6 leading-none">
                ASIC <span className="text-[var(--color-primary)] italic">LAB</span>
              </h1>
              
              <div className="space-y-6">
                <p className="text-2xl sm:text-3xl text-gray-800 leading-tight font-bold">
                  The Hub of <span className="text-[var(--color-primary)]">IC Design Excellence</span> at UIT.
                </p>
                
                <div className="h-1.5 w-24 bg-[var(--color-primary)] rounded-full"></div>
                
                <div className="space-y-5 max-w-2xl text-gray-600">
                  <p className="text-lg leading-relaxed">
                    ASIC LAB UIT is a specialized research unit focused on the entire lifecycle of **Application-Specific Integrated Circuits** — from architectural definition to physical implementation.
                  </p>
                  <p className="text-lg leading-relaxed font-medium">
                    We empower students and researchers to master industry-standard EDA tools and methodologies, bridging the gap between academic theory and Silicon reality.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: BẢN SẮC KỸ THUẬT (CHIP VIBE) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square sm:aspect-[4/5] lg:aspect-square bg-slate-950 rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white group">
              
              {/* Lưới tọa độ (Grid) mô phỏng môi trường thiết kế vi mạch chuyên nghiệp */}
              <div className="absolute inset-0 opacity-20" 
                   style={{ 
                     backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', 
                     backgroundSize: '30px 30px' 
                   }}>
              </div>

              {/* Đường dẫn mạch điện (Traces) - Biểu tượng của sự kết nối tri thức */}
              <div className="absolute inset-0">
                <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
                <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent"></div>
              </div>

              {/* Khối trung tâm: Biểu tượng con chip chủ đạo */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-36 h-36 mb-6 border-2 border-[var(--color-primary)] rounded-3xl flex items-center justify-center relative bg-slate-900/50 backdrop-blur-md group-hover:scale-105 transition-transform duration-700">
                  {/* Các chi tiết vi mạch mô phỏng bên trong chip */}
                  <div className="absolute inset-3 border border-[var(--color-primary)]/20 rounded-xl"></div>
                  <div className="absolute inset-6 border border-[var(--color-primary)]/10 rounded-lg"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-white font-black text-2xl tracking-tighter italic leading-none">ASIC</span>
                    <span className="text-[var(--color-primary)] font-black text-xs tracking-widest mt-1">CORE</span>
                  </div>
                </div>
                
                <div className="space-y-2 relative z-20">
                  <p className="text-[var(--color-primary)] font-black text-[10px] uppercase tracking-[0.4em]">Front-end to Back-end</p>
                  <p className="text-slate-400 text-[9px] uppercase tracking-[0.2em] font-medium">System-on-Chip • VLSI • FPGA</p>
                </div>
              </div>

              {/* Hiệu ứng quét sáng (Scanner effect) chạy qua lại nhẹ nhàng */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary)]/5 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-[scan_3s_linear_infinite] pointer-events-none"></div>
            </div>

            {/* Đốm màu loang tạo độ sâu (Depth) cho khối thiết kế */}
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[var(--color-primary)] opacity-[0.08] blur-[120px] -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;