import Link from 'next/link';
import Image from 'next/image';

// Fetch news từ server
async function fetchNews() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/news/published`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch news: HTTP ${res.status}`);
    }
    const { data } = await res.json();
    if (!Array.isArray(data)) return [];
    return data;
  } catch (error) {
    console.error('Error fetching news:', error.message);
    return null;
  }
}

function getThumbnailUrl(thumbnail) {
  if (!thumbnail) return null;
  if (thumbnail.startsWith('http')) return thumbnail;
  return `${process.env.NEXT_PUBLIC_API_HOST}${thumbnail}`;
}

export default async function NewsListPage() {
  const articles = await fetchNews();

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 font-sans pb-32">
      <div className="container mx-auto px-4 max-w-7xl pt-16">
        
        {!articles ? (
          <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 ring-8 ring-red-50/50 dark:ring-red-900/10">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">Unable to reach our stories</p>
            <p className="text-slate-500 mt-2 text-sm">Please refresh or check back in a moment.</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 opacity-60">
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-slate-300 to-transparent mb-8" />
            <p className="text-slate-400 font-medium tracking-widest uppercase text-[10px]">The archives are currently empty</p>
          </div>
        ) : (
          <div className="space-y-24">
            
            {/* 1. Featured Article - Tin nổi bật */}
            {articles.length > 0 && (
              <section className="relative group">
                <Link href={`/news/${articles[0].slug}`} className="block relative">
                  <div className="grid lg:grid-cols-12 gap-0 overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] dark:shadow-none border border-white dark:border-slate-800">
                    <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                      {getThumbnailUrl(articles[0].thumbnail) ? (
                        <Image
                          src={getThumbnailUrl(articles[0].thumbnail)}
                          alt={articles[0].title}
                          fill
                          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center" />
                      )}
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    
                    <div className="lg:col-span-5 p-8 md:p-10 lg:p-12 flex flex-col justify-center relative bg-white dark:bg-slate-900">
                      <div className="mb-6 flex items-center gap-3">
                        <span className="h-px w-6 bg-primary/30" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Featured Story</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tighter transition-colors group-hover:text-primary">
                        {articles[0].title}
                      </h2>
                      
                      <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8 line-clamp-3 font-medium">
                        {articles[0].shortDescription || 'An insightful look into today\'s most compelling narrative.'}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50 dark:border-slate-800">
                        <time className="text-[9px] font-bold text-slate-400 uppercase tracking-widest" suppressHydrationWarning>
                          {new Date(articles[0].createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </time>
                        <div className="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                          <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* 2. Grid Articles - Danh sách tin phía dưới */}
            {articles.length > 1 && (
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                {articles.slice(1).map((article) => {
                  const thumbnailUrl = getThumbnailUrl(article.thumbnail);
                  return (
                    <Link key={article._id} href={`/news/${article.slug}`} className="group flex flex-col h-full">
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 mb-8 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.05)] border border-white dark:border-slate-800 transition-all duration-500 group-hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] group-hover:-translate-y-1.5">
                        {thumbnailUrl ? (
                          <Image
                            src={thumbnailUrl}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-[1s] group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-200" />
                        )}
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2.5rem]" />
                      </div>
                      
                      <div className="flex-grow flex flex-col px-2">
                        <div className="mb-4">
                          <time className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]" suppressHydrationWarning>
                            {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </time>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-[1.2] group-hover:text-primary transition-colors mb-4 tracking-tight">
                          {article.title}
                        </h3>
                        
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
                          {article.shortDescription}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </section>
            )}
            
          </div>
        )}
      </div>
    </div>
  );
}