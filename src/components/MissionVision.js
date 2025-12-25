import React from "react";
import { Target, Heart, Zap, Shield, Users, Star } from "lucide-react";

const coreValues = [
  { title: "Quality", desc: "High-end services", icon: Star, color: "bg-amber-400" },
  { title: "Innovation", desc: "Tech-driven", icon: Zap, color: "bg-blue-500" },
  { title: "Collaboration", desc: "Stronger together", icon: Users, color: "bg-rose-500" },
  { title: "Responsibility", desc: "For society", icon: Shield, color: "bg-emerald-500" },
];

const MissionVision = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-white">
      {/* Các đốm màu phá cách phía sau nền */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-[100px] opacity-60 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full blur-[100px] opacity-60 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Vision - Card lớn chiếm 7 cột */}
          <div className="lg:col-span-7 group relative overflow-hidden p-10 rounded-[3rem] bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="relative z-10">
              <div className="w-14 h-14 mb-8 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-[var(--color-primary)] transition-all duration-500">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Vision</h3>
              <p className="text-gray-300 text-lg leading-relaxed font-medium max-w-md">
                To become a leading organization in education development and scientific research, building a strong knowledge community by 2030.
              </p>
            </div>
            {/* Họa tiết trang trí phá cách */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[var(--color-primary)] opacity-20 rounded-full blur-3xl transition-all group-hover:scale-150"></div>
          </div>

          {/* Mission - Card chiếm 5 cột */}
          <div className="lg:col-span-5 group p-10 rounded-[3rem] border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:border-[var(--color-primary)] hover:-translate-y-2">
            <div className="w-14 h-14 mb-8 flex items-center justify-center rounded-2xl bg-emerald-50 text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-500">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-4">Mission</h3>
            <p className="text-gray-500 text-base leading-relaxed font-bold">
              Providing high-quality educational solutions and promoting applied research for a professional community.
            </p>
          </div>

          {/* Core Values - Trải dài 12 cột */}
          <div className="lg:col-span-12 mt-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((v, i) => (
                <div key={i} className="group p-6 rounded-[2.5rem] bg-gray-50 border border-transparent transition-all duration-300 hover:bg-white hover:shadow-2xl hover:border-gray-100">
                  <div className={`w-10 h-10 mb-4 flex items-center justify-center rounded-xl ${v.color} text-white shadow-lg transition-transform group-hover:rotate-12`}>
                    <v.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-black text-gray-900 uppercase tracking-tight text-sm mb-1">{v.title}</h4>
                  <p className="text-gray-500 text-[11px] font-bold leading-tight">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionVision;