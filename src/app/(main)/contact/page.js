"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, Facebook, Heart } from "lucide-react";

const host = process.env.NEXT_PUBLIC_API_HOST || 'https://asicweb-portal.longpc.xyz';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });
  const [lastSent, setLastSent] = useState(0);

  // Khôi phục thời gian gửi cuối cùng từ localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem('contact_last_sent');
    if (savedTime) setLastSent(parseInt(savedTime));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Bẫy Bot (Honeypot)
    const formData = new FormData(e.target);
    if (formData.get('botcheck')) return;

    // Chống Spam (Rate Limiting)
    const now = Date.now();
    const cooldown = 60 * 1000; 
    if (now - lastSent < cooldown) {
      const remaining = Math.ceil((cooldown - (now - lastSent)) / 1000);
      setStatus({ 
        type: 'error', 
        message: `Please wait ${remaining}s before sending another message.` 
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    const data = Object.fromEntries(formData.entries());
    delete data.botcheck;

    try {
      const response = await fetch(`${host}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed');

      setStatus({ 
        type: 'success', 
        message: 'Message sent successfully.' 
      });
      
      const sentTime = Date.now();
      setLastSent(sentTime);
      localStorage.setItem('contact_last_sent', sentTime.toString());
      e.target.reset();
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Error. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center py-10 px-4 font-sans text-slate-900 dark:text-slate-100">
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-5">
          
          {/* Cột trái: Thông tin liên lạc */}
          <div className="md:col-span-2 bg-slate-900 p-8 text-white relative flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] -mr-24 -mt-24"></div>
            
            <div className="relative z-10">
              <h1 className="text-3xl font-black uppercase tracking-tighter mb-10 leading-none">
                Contact <span className="text-emerald-500">Us</span>
              </h1>
              
              <div className="space-y-5">
                {/* Facebook */}
                <a href="https://www.facebook.com/profile.php?id=61581306724816" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group transition-all">
                  <div className="w-9 h-9 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1877F2] transition-all">
                    <Facebook className="w-4 h-4 text-[#1877F2] group-hover:text-white" fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#1877F2] mb-0.5">Facebook</p>
                    <span className="text-xs font-bold block group-hover:text-emerald-500 transition-colors">ASIC LAB Fanpage</span>
                  </div>
                </a>

                {/* Email */}
                <div className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-500/50 transition-colors">
                    <Mail className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-0.5">Email</p>
                    <a href="mailto:asic@uit.edu.vn" className="text-sm font-bold block">asic@uit.edu.vn</a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-500/50 transition-colors">
                    <Phone className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-0.5">Phone</p>
                    <a href="tel:+84768053826" className="text-xs font-bold block">+84 768 053 826</a>
                  </div>
                </div>

                {/* Office */}
                <div className="flex items-start gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-500/50 transition-colors mt-1">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mb-0.5">Office</p>
                    <p className="text-[11px] font-medium text-slate-400 leading-snug">
                      6th Floor, UIT, Ho Chi Minh City
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lời cảm ơn chân trang */}
            <div className="relative z-10 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Thank You</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">
                "Thank you for your interest in ASIC LAB. We look forward to collaborating and supporting your journey."
              </p>
            </div>
          </div>

          {/* Cột phải: Form gửi tin nhắn */}
          <div className="md:col-span-3 p-8 bg-white dark:bg-slate-900">
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Bẫy Bot ẩn */}
              <input type="text" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                  <input name="name" type="text" required className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-sm" placeholder="Your name" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                  <input name="email" type="email" required className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-sm" placeholder="your@email.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                <input name="subject" type="text" required className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white text-sm" placeholder="Subject" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Message</label>
                <textarea name="message" required rows={3} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white resize-none text-sm" placeholder="Your message..." />
              </div>

              {status.message && (
                <div className={`p-3 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                  status.type === 'success' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                }`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-400 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 mt-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send Message <Send className="w-3 h-3" /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}