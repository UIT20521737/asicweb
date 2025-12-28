import React from 'react';
import Link from 'next/link';

const host = process.env.NEXT_PUBLIC_API_HOST || 'https://asicweb-portal.longpc.xyz';

async function getAllCourses() {
  try {
    // Tăng limit lên 100 để hiển thị toàn bộ trong một lần lướt
    const res = await fetch(`${host}/api/courses?limit=100`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch courses');
    return await res.json();
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return { data: [] };
  }
}

const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '');
};

export default async function AllCoursesPage() {
  const res = await getAllCourses();
  const courses = res.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 font-sans bg-white dark:bg-slate-950 min-h-screen">
      
      {/* 1. Header Section */}
      <div className="mb-20 border-b border-slate-100 dark:border-slate-800 pb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4 uppercase">
          Professional Courses
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base font-medium max-w-2xl leading-relaxed">
          From <span className="text-emerald-600 font-bold">foundational concepts</span> to <span className="text-emerald-600 font-bold">expert-level techniques</span>. 
          Our curriculum covers the entire spectrum of IC Design, Semiconductors, and Embedded Systems.
        </p>
      </div>

      {/* 2. Grid Display - Borderless & Large Style */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {courses.map((course) => {
            const imageUrl = course.thumbnail
              ? (course.thumbnail.startsWith('http') ? course.thumbnail : `${host}${course.thumbnail}`)
              : "/placeholder-course.jpg";

            return (
              <Link key={course._id} href={`/services/courses/${course.slug || course._id}`} className="group block">
                
                {/* Image Container - Borderless & High Impact */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] mb-8 transition-all duration-700">
                  <img 
                    src={imageUrl} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Status Badge - Minimalist */}
                  <div className="absolute top-6 right-6">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl backdrop-blur-md ${
                      course.status === 'opening' 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-white/90 text-slate-900'
                    }`}>
                      {course.status || 'Upcoming'}
                    </span>
                  </div>

                  {/* Subtle Glow Overlay on Hover */}
                  <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-500"></div>
                </div>

                {/* Content - Clean Typography */}
                <div className="px-2 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-emerald-700 transition-colors leading-tight line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                    {course.description || stripHtml(course.content)}
                  </p>
                  
                  {/* Action Link */}
                  <div className="flex items-center justify-center md:justify-start text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 group-hover:gap-4 transition-all gap-2">
                    Explore Course 
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-slate-400 font-medium italic">No courses available at the moment.</p>
        </div>
      )}

      {/* 3. Footer Note */}
      {courses.length > 0 && (
        <div className="mt-40 pb-12 text-center border-t border-slate-50 dark:border-slate-900 pt-10">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 dark:text-slate-800">
            End of Program List
          </p>
        </div>
      )}

    </div>
  );
}