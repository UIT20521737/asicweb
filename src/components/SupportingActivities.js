import { BookOpen, Users, Globe, ChevronRight } from "lucide-react";

const supportingActivities = [
  { 
    id: 1, 
    title: "Education & Training", 
    icon: BookOpen, 
    glow: "group-hover:shadow-indigo-500/20",
    items: ["Professional training", "Scientific workshops", "Scholarship programs"] 
  },
  { 
    id: 2, 
    title: "Community & Collaboration", 
    icon: Users, 
    glow: "group-hover:shadow-emerald-500/20",
    items: ["Networking", "Volunteering activities", "Leadership development"] 
  },
  { 
    id: 3, 
    title: "International Partnerships", 
    icon: Globe, 
    glow: "group-hover:shadow-blue-500/20",
    items: ["Academic exchange", "Joint projects", "Exchange programs"] 
  },
];

const SupportingActivities = () => {
  return (
    <section className="py-24 relative bg-[#fcfcfc] overflow-hidden border-y border-gray-100">
      {/* Ambient Glows - Tạo chiều sâu nhẹ nhàng cho nền */}
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-blue-50 blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-emerald-50 blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter uppercase">
            Supporting <span className="text-[var(--color-primary)]">Activities</span>
          </h2>
          <div className="h-1 w-16 bg-gray-200 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {supportingActivities.map((act) => (
            <div 
              key={act.id} 
              className={`group relative bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${act.glow} hover:border-[var(--color-primary)]/30`}
            >
              {/* Icon Container */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-8 relative flex items-center justify-center">
                  {/* Lớp nền icon biến đổi khi hover */}
                  <div className="absolute inset-0 bg-gray-50 rounded-3xl rotate-6 transition-all duration-500 group-hover:rotate-0 group-hover:bg-[var(--color-primary)] group-hover:shadow-lg group-hover:shadow-[var(--color-primary)]/30"></div>
                  
                  <div className="relative z-10 text-gray-400 transition-colors duration-500 group-hover:text-white">
                    <act.icon className="w-9 h-9" />
                  </div>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight text-center">
                  {act.title}
                </h3>
                
                <ul className="space-y-4 w-full">
                  {act.items.map((item, i) => (
                    <li 
                      key={i} 
                      className="group/item flex items-center p-3 rounded-2xl bg-gray-50/50 border border-transparent transition-all duration-300 hover:bg-white hover:border-[var(--color-primary)]/20 hover:shadow-sm"
                    >
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm transition-colors group-hover/item:bg-[var(--color-primary)]">
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover/item:text-white transition-colors" />
                      </div>
                      <span className="text-sm font-bold text-gray-600 group-hover/item:text-gray-900 transition-colors tracking-tight">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trang trí watermark ẩn dưới card */}
              <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                <act.icon className="w-32 h-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportingActivities;