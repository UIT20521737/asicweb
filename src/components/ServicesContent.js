import React from 'react';
import Link from 'next/link';

const host = process.env.NEXT_PUBLIC_API_HOST || 'https://asicweb-portal.longpc.xyz';

async function getServicesData() {
  try {
    const [resCourses, resDevices] = await Promise.all([
      fetch(`${host}/api/courses?page=1&limit=3`, { cache: 'no-store' }),
      fetch(`${host}/api/devices?page=1&limit=3`, { cache: 'no-store' })
    ]);

    if (!resCourses.ok || !resDevices.ok) {
      throw new Error(`API error: Courses ${resCourses.status}, Devices ${resDevices.status}`);
    }

    const coursesRes = await resCourses.json();
    const devicesRes = await resDevices.json();

    return {
      shortCourses: coursesRes.data || [],
      labEquipment: devicesRes.data || [],
    };
  } catch (error) {
    console.error("Server-side Fetch Error:", error.message);
    return { shortCourses: [], labEquipment: [] };
  }
}

const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '');
};

export default async function ServicesContent() {
  const { shortCourses, labEquipment } = await getServicesData();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 font-sans bg-white dark:bg-slate-950">

      {/* 1. Header Section */}
      <div className="mb-20">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter uppercase leading-none">
          Our <span className="text-emerald-600">Services</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-medium max-w-2xl leading-relaxed">
          Leading the semiconductor industry with premium education and high-end laboratory infrastructure.
        </p>
      </div>

      {/* 2. Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-24">
        
        {/* LEFT COLUMN: COURSES */}
        <section id="courses">
          <div className="flex items-center justify-between mb-10 border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Professional Courses
            </h2>
            <Link href="/services/courses" className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 hover:text-emerald-500 transition-colors">
              View All &rarr;
            </Link>
          </div>

          <div className="flex flex-col gap-8">
            {shortCourses.map((course) => {
              const imageUrl = course.thumbnail ? (course.thumbnail.startsWith('http') ? course.thumbnail : `${host}${course.thumbnail}`) : "/placeholder-course.jpg";
              return (
                <Link key={course._id} href={`/services/courses/${course.slug || course._id}`} className="group block">
                  <div className="flex gap-5 items-start">
                    <div className="w-24 sm:w-32 aspect-square flex-shrink-0 relative rounded-xl overflow-hidden bg-slate-100">
                      <img src={imageUrl} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="flex-grow">
                      <span className={`inline-block text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest mb-2 ${course.status === 'opening' ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                        {course.status || 'Upcoming'}
                      </span>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 transition-colors leading-tight mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed font-medium">
                        {course.description || stripHtml(course.content)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* RIGHT COLUMN: EQUIPMENT */}
        <section id="equipment">
          <div className="flex items-center justify-between mb-10 border-b border-slate-100 dark:border-slate-800 pb-5">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Lab Equipment
            </h2>
            <Link href="/services/devices" className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 hover:text-emerald-500 transition-colors">
              Explore &rarr;
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {labEquipment.map((item) => {
              const imageUrl = item.thumbnail ? (item.thumbnail.startsWith('http') ? item.thumbnail : `${host}${item.thumbnail}`) : "/placeholder-device.jpg";
              return (
                <Link key={item._id} href={`/services/devices/${item.slug || item._id}`} className="group flex items-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-transparent hover:border-emerald-500/20 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
                  <div className="w-16 h-16 flex-shrink-0 bg-white dark:bg-slate-800 rounded-lg p-2 flex items-center justify-center shadow-sm">
                    <img src={imageUrl} alt={item.deviceName} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform group-hover:scale-110 duration-500" />
                  </div>
                  <div className="ml-6">
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1 block opacity-60">
                      {item.brand}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-600 transition-colors line-clamp-2 leading-tight">
                      {item.deviceName}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

      </div>

      {/* 3. Compact Internship Section */}
      <section id="internship" className="scroll-mt-24">
        <div className="relative rounded-[2rem] bg-slate-950 px-8 py-10 md:p-12 overflow-hidden text-white border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-4 block">Careers</span>
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter uppercase leading-tight">
                Internship <span className="text-emerald-500">Program</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed mb-6">
                Work on real silicon projects mentored by experts. High-impact experience in IC Design and AIoT.
              </p>
              <Link href="/contact" className="inline-block px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-900/20">
                Apply Now
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
              {[
                { step: '01', title: 'Apply', desc: 'Portal' },
                { step: '02', title: 'Test', desc: 'Interview' },
                { step: '03', title: 'Impact', desc: 'Projects' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center p-5 bg-white/5 rounded-2xl border border-white/5 min-w-[120px]">
                  <div className="text-emerald-500 font-black text-2xl mb-1">{item.step}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-white mb-1">{item.title}</div>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}