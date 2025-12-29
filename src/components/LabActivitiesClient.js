"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';

const host = process.env.NEXT_PUBLIC_API_HOST || 'https://asicweb-portal.longpc.xyz';

export default function LabActivitiesClient({ activities }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${host}${cleanPath}`;
  };

  if (!activities || activities.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-1">
      {/* Giảm gap-y xuống 10 để các hàng sát nhau hơn */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
        {activities.map((item, index) => {
          // Logic: Ảnh đầu tiên và mỗi 5 ảnh tiếp theo sẽ bự
          const isFeatured = index % 5 === 0;

          if (isFeatured) {
            return (
              <div
                key={item._id || item.id}
                onClick={() => setSelectedImage(item)}
                className="col-span-1 lg:col-span-12 group cursor-pointer"
              >
                {/* Giảm gap giữa ảnh và chữ xuống còn 6 */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* Ảnh bự chiếm 8/12 chiều ngang */}
                  <div className="w-full lg:w-8/12 relative overflow-hidden rounded-[2.5rem] bg-slate-50 aspect-video shadow-sm group-hover:shadow-xl transition-all duration-700">
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Nội dung bên phải sát lên trên */}
                  <div className="w-full lg:w-4/12 space-y-3 pt-1">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="w-10 h-1 bg-blue-600 mb-2" />
                    <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          // Các ô nhỏ (3 cột)
          return (
            <div
              key={item._id || item.id}
              onClick={() => setSelectedImage(item)}
              className="col-span-1 lg:col-span-4 group cursor-pointer flex flex-col"
            >
              <div className="relative overflow-hidden rounded-[2rem] bg-slate-50 aspect-[16/10] mb-3 shadow-sm group-hover:shadow-lg transition-all duration-700">
                <img 
                  src={getImageUrl(item.image)} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
              </div>
              <div className="space-y-1.5 pr-2 text-left">
                <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/98 backdrop-blur-3xl"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-6xl w-full flex flex-col md:flex-row gap-8 items-start overflow-y-auto max-h-[95vh] md:overflow-visible"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="fixed top-4 right-4 p-2 text-slate-400 hover:text-black"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>

            <div className="w-full md:w-[65%] rounded-[2rem] overflow-hidden shadow-2xl bg-black shrink-0">
              <img 
                src={getImageUrl(selectedImage.image)} 
                alt={selectedImage.title} 
                className="w-full h-auto max-h-[85vh] object-contain" 
              />
            </div>

            <div className="w-full md:w-[35%] text-left pt-2">
              <h4 className="text-2xl font-black text-slate-900 leading-tight mb-3">
                {selectedImage.title}
              </h4>
              <div className="w-10 h-1 bg-blue-600 mb-4" />
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}