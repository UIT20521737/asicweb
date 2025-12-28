"use client";
import React from "react";
import { motion } from "framer-motion";
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
    <section className="pt-4 pb-2 md:pt-8 md:pb-4 relative bg-white overflow-hidden border-y border-gray-100 antialiased">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header - Thu nhỏ margin-bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-8 md:mb-10"
        >
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            Supporting <span className="text-[#047857]">Activities</span>
          </h2>
          <div className="h-1 w-10 bg-[#047857] mx-auto mt-2 rounded-full"></div>
        </motion.div>

        {/* Grid Container */}
        <div className="grid md:grid-cols-3 gap-6">
          {supportingActivities.map((act) => (
            <motion.div 
              key={act.id} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="group relative bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:border-[#047857]/20"
            >
              <div className="flex flex-col items-center">
                {/* Icon Box - Thu nhỏ nhẹ tỉ lệ */}
                <div className="w-14 h-14 md:w-16 md:h-16 mb-5 md:mb-6 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gray-50 rounded-2xl rotate-6 transition-all group-hover:rotate-0 group-hover:bg-[#047857]"></div>
                  <act.icon className="relative z-10 w-7 h-7 md:w-8 md:h-8 text-gray-400 group-hover:text-white transition-colors" />
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-black text-gray-900 mb-4 md:mb-6 uppercase tracking-tight text-center leading-tight">
                  {act.title}
                </h3>

                {/* List Items */}
                <ul className="space-y-1.5 md:space-y-2 w-full">
                  {act.items.map((item, i) => (
                    <li 
                      key={i} 
                      className="flex items-center p-2 md:p-3 rounded-xl bg-gray-50/50 text-[11px] md:text-[13px] font-bold text-gray-600 group-hover:bg-white transition-all uppercase"
                    >
                      <ChevronRight className="w-3 md:w-3.5 h-3 md:h-3.5 mr-2 text-[#047857]" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportingActivities;