import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { JSDOM } from 'jsdom';
import TableOfContents from '@/components/TableOfContents';
import RichTextContent from '@/components/RichTextContent';

const host = process.env.NEXT_PUBLIC_API_HOST || 'https://asicweb-portal.longpc.xyz';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#047857',
};

async function getCourseDetail(slug) {
  try {
    const res = await fetch(`${host}/api/courses/slug/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const result = await res.json();
    return result.data || result;
  } catch (error) { return null; }
}

function processContentWithHeadings(htmlContent) {
  if (!htmlContent) return { processedContent: '', headings: [] };
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;
  const headings = [];
  doc.querySelectorAll('h2, h3').forEach((element) => {
    const id = element.textContent.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();
    element.id = id;
    headings.push({ id, text: element.textContent, level: element.tagName.toLowerCase() });
  });
  return { processedContent: doc.body.innerHTML, headings };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = await getCourseDetail(slug);
  if (!course) return { title: 'Course Not Found' };
  return {
    title: `${course.title} | ASIC Training`,
    description: course.description?.slice(0, 160) || 'Professional IC Design and AIoT training course.',
  };
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const course = await getCourseDetail(slug);

  if (!course) notFound();

  const { processedContent, headings } = processContentWithHeadings(course.content || course.description);
  const hasHeadings = headings.length > 0;
  const mainImageUrl = course.thumbnail?.startsWith('http') 
    ? course.thumbnail 
    : `${host}${course.thumbnail}`;

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-20 font-sans text-slate-900 dark:text-slate-100">
      
      {/* --- HEADER SECTION --- */}
      <header className="pt-10 pb-10 bg-slate-50/50 dark:bg-emerald-950/5 border-b border-slate-100 dark:border-emerald-900/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Thumbnail bên trái */}
            <div className="w-full md:w-64 lg:w-80 shrink-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md border border-white dark:border-slate-800">
                <Image 
                  src={mainImageUrl} 
                  alt={course.title} 
                  fill 
                  className="object-cover" 
                  priority 
                />
              </div>
            </div>

            {/* Tiêu đề bên phải */}
            <div className="flex-1 text-center md:text-left">
              <nav className="mb-4 flex items-center justify-center md:justify-start space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <Link href="/services" className="hover:text-emerald-600 transition-colors italic">Services</Link>
                <span>/</span>
                <Link href="/services#courses" className="hover:text-emerald-600 transition-colors italic">Courses</Link>
              </nav>
              
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                 <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                   course.status === 'opening' 
                   ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                   : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                 }`}>
                   {course.status || 'Upcoming'}
                 </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white mb-6">
                {course.title}
              </h1>

              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-full transition-all uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                Contact for Details
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA: TỶ LỆ 9-3 --- */}
      <div className="container mx-auto px-4 mt-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Cột trái: Nội dung chi tiết (9 cột) */}
          <main className="lg:col-span-9 w-full">
            <article className="prose prose-slate dark:prose-invert max-w-none">
              <RichTextContent content={processedContent} />
            </article>
          </main>

          {/* Cột phải: Sidebar Mục lục (3 cột) */}
          <aside className="lg:col-span-3 w-full">
            <div className="sticky top-24">
              {hasHeadings && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-5 flex items-center">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                    Contents
                  </h3>
                  <div className="text-[13px] leading-snug">
                    <TableOfContents headings={headings} />
                  </div>
                </div>
              )}
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}