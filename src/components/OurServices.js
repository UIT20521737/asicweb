"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Monitor, Briefcase, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Short Courses',
    description: 'Intensive professional training programs focusing on IC Design, AIoT, and semiconductor technologies with industry-standard curriculum.',
    icon: <BookOpen className="w-5 h-5 md:w-6 md:h-6" />,
    link: '/services#courses',
    index: '01',
    theme: {
      light: 'bg-emerald-50 border-emerald-100',
      dark: 'dark:bg-emerald-950/20 dark:border-emerald-900/30',
      accent: 'text-emerald-600',
      hover: 'group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/20',
      gradient: 'from-emerald-600 to-teal-500',
      glow: 'shadow-emerald-500/20'
    }
  },
  {
    title: 'Equipments',
    description: 'Provision of cutting-edge industrial measurement tools, development boards, and testing systems with comprehensive technical support.',
    icon: <Monitor className="w-5 h-5 md:w-6 md:h-6" />,
    link: '/services#equipments',
    index: '02',
    theme: {
      light: 'bg-blue-50 border-blue-100',
      dark: 'dark:bg-blue-950/20 dark:border-blue-900/30',
      accent: 'text-blue-600',
      hover: 'group-hover:border-blue-500/50 group-hover:shadow-blue-500/20',
      gradient: 'from-blue-600 to-cyan-500',
      glow: 'shadow-blue-500/20'
    }
  },
  {
    title: 'Internships',
    description: 'Hands-on career development opportunities for students to work on real-world projects alongside experienced semiconductor experts.',
    icon: <Briefcase className="w-5 h-5 md:w-6 md:h-6" />,
    link: '/contact',
    index: '03',
    theme: {
      light: 'bg-orange-50 border-orange-100',
      dark: 'dark:bg-orange-950/20 dark:border-orange-900/30',
      accent: 'text-orange-600',
      hover: 'group-hover:border-orange-500/50 group-hover:shadow-orange-500/20',
      gradient: 'from-orange-600 to-amber-500',
      glow: 'shadow-orange-500/20'
    }
  }
];

const OurServices = () => {
  return (
    <section className="py-12 bg-white dark:bg-slate-950 overflow-hidden relative">
      {/* Decorative Blobs */}
      <div className="absolute top-0 -left-20 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Centered Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <h3 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none mb-3">
            Our <span className="text-[#047857]">Service</span>
          </h3>
          <div className="h-1 w-8 bg-[#047857]/40 mx-auto rounded-full" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <motion.a 
              href={service.link} 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`group relative flex flex-col h-full rounded-[2rem] p-8 border transition-all duration-500 hover:-translate-y-2 shadow-sm ${service.theme.light} ${service.theme.dark} ${service.theme.hover} hover:shadow-xl`}
            >
              {/* Background Glow on Hover */}
              <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Number Label */}
              <div className="absolute top-6 right-8 text-5xl font-black text-slate-900/5 dark:text-white/5 select-none transition-all duration-500 group-hover:text-emerald-500/10 group-hover:scale-110">
                {service.index}
              </div>

              {/* Icon Container with Gradient */}
              <div className={`relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center mb-6 shadow-md ${service.theme.glow} border border-white dark:border-slate-700 transition-all duration-500 group-hover:bg-gradient-to-br ${service.theme.gradient} group-hover:text-white group-hover:scale-110 group-hover:-rotate-12`}>
                <div className={`${service.theme.accent} group-hover:text-white transition-colors`}>
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex-1">
                <h4 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight group-hover:text-[#047857] transition-colors">
                  {service.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-[13px] md:text-[14px] leading-relaxed mb-4 font-bold opacity-80">
                  {service.description}
                </p>
              </div>

              {/* Interactive Button */}
              <div className={`relative z-10 mt-auto flex items-center text-[10px] font-black uppercase tracking-[0.1em] ${service.theme.accent} transition-all duration-300`}>
                <span className="mr-2 border-b-2 border-transparent group-hover:border-current py-1">View Details</span>
                <div className={`w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:bg-gradient-to-r ${service.theme.gradient} group-hover:text-white group-hover:border-transparent group-hover:w-12 transition-all duration-500 shadow-sm`}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Decorative Details */}
              <div className="absolute top-6 left-8 w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700 group-hover:bg-[#047857] transition-all" />
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/20 to-transparent dark:from-white/5 rounded-tr-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;