import React from 'react';
import Link from 'next/link';

const host = process.env.NEXT_PUBLIC_API_HOST || 'https://asicweb-portal.longpc.xyz';

async function getAllDevices() {
  try {
    // Tăng limit lên 100 để show hết trong 1 lần lướt
    const res = await fetch(`${host}/api/devices?limit=100`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch devices');
    return await res.json();
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return { data: [] };
  }
}

export default async function AllDevicesPage() {
  const res = await getAllDevices();
  const devices = res.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 font-sans bg-white dark:bg-slate-950 min-h-screen">
      
      {/* Header Section */}
      <div className="mb-20 border-b border-slate-100 dark:border-slate-800 pb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 uppercase">
          Lab Equipment
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base font-medium max-w-2xl">
          Explore our full range of professional semiconductor research and testing instruments.
        </p>
      </div>

      {/* Grid Display - Borderless Style */}
      {devices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {devices.map((item, index) => {
            const imageUrl = item.thumbnail 
              ? (item.thumbnail.startsWith('http') ? item.thumbnail : `${host}${item.thumbnail}`) 
              : "/placeholder-device.jpg";
              
            return (
              <Link 
                key={item._id} 
                href={`/services/devices/${item.slug || item._id}`} 
                className="group flex flex-col"
              >
                {/* Image Container - No Border */}
                <div className="relative aspect-[16/10] flex items-center justify-center overflow-hidden transition-all duration-500">
                  <img 
                    src={imageUrl} 
                    alt={item.deviceName} 
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                  />
                  {/* Hiệu ứng bóng đổ nhẹ khi lướt qua (hover) */}
                  <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-500 rounded-[2.5rem]"></div>
                </div>

                <div className="mt-8 text-center">
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-3 block">
                    {item.brand}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-xl md:text-2xl group-hover:text-emerald-700 transition-colors leading-tight line-clamp-2">
                    {item.deviceName}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-slate-400">No equipment found.</p>
        </div>
      )}

      {/* Footer Note */}
      {devices.length > 0 && (
        <div className="mt-32 pb-10 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 dark:text-slate-700">
            End of Collection
          </p>
        </div>
      )}

    </div>
  );
}