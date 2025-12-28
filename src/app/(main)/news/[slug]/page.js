import { notFound } from 'next/navigation';
import { fetchNewsFromApi } from '@/data/news';
import Link from 'next/link';
import Image from 'next/image';
import TableOfContents from '../../../../components/TableOfContents';
import { JSDOM } from 'jsdom';

// --- HELPERS ---

function getThumbnailUrl(thumbnail) {
  if (!thumbnail) return null;
  if (thumbnail.startsWith('http')) return thumbnail;
  return `${process.env.NEXT_PUBLIC_API_HOST}${thumbnail}`;
}

async function getArticle(slug) {
  try {
    const article = await fetchNewsFromApi(`${process.env.NEXT_PUBLIC_API_HOST}/api/news/slug`, 'full', slug);
    return article || null;
  } catch (error) { return null; }
}

async function getRelatedArticles(id) {
  try {
    const related = await fetchNewsFromApi(`${process.env.NEXT_PUBLIC_API_HOST}/api/news/${id}/related`, 'full');
    return related || [];
  } catch (error) { return []; }
}

// Hàm format date ổn định hơn
function formatDate(isoDate) {
  if (!isoDate) return 'No date available';
  return new Date(isoDate).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

function processContentWithHeadings(htmlContent) {
  if (!htmlContent) return { processedContent: '', headings: [] };
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;
  const headings = [];
  doc.querySelectorAll('h1, h2, h3').forEach((element) => {
    const id = element.textContent.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();
    element.id = id;
    headings.push({ id, text: element.textContent, level: element.tagName.toLowerCase() });
  });
  return { processedContent: doc.body.innerHTML, headings };
}

// --- MAIN PAGE ---

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  const relatedArticles = await getRelatedArticles(article._id);
  const { processedContent, headings } = processContentWithHeadings(article.content);
  
  // Logic kiểm tra hiển thị Sidebar: Chỉ hiện nếu có Headings
  const hasHeadings = headings.length > 0;
  const mainImageUrl = getThumbnailUrl(article.image || article.thumbnail);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen pb-20 font-sans">
      
      {/* 1. Header Section */}
      <header className="pt-10 pb-10 bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800">
        <div className={`container mx-auto px-4 ${hasHeadings ? 'max-w-7xl' : 'max-w-4xl'}`}>
          <nav className={`mb-6 flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 ${!hasHeadings && 'justify-center'}`}>
            <Link href="/news" className="hover:text-primary transition-colors italic">News</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-100 line-clamp-1 truncate max-w-xs">{article.title}</span>
          </nav>
          
          <h1 className={`font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tighter ${hasHeadings ? 'text-3xl md:text-5xl' : 'text-3xl md:text-4xl text-center'}`}>
            {article.title}
          </h1>
          
          <div className={`text-xs font-bold text-slate-500 uppercase tracking-widest border-l-2 border-primary pl-4 italic ${!hasHeadings && 'flex justify-center border-l-0 pl-0'}`}>
             {/* Sửa lỗi Hydration bằng suppressHydrationWarning */}
             <time suppressHydrationWarning>{formatDate(article.publishedAt)}</time>
          </div>
        </div>
      </header>

      {/* 2. Main Content Container */}
      <div className={`container mx-auto px-4 mt-12 ${hasHeadings ? 'max-w-7xl' : 'max-w-4xl'}`}>
        <div className={hasHeadings ? "grid grid-cols-1 lg:grid-cols-10 gap-12 lg:gap-16" : "flex flex-col"}>
          
          {/* NỘI DUNG CHÍNH */}
          <main className={hasHeadings ? "lg:col-span-7 w-full" : "w-full"}>
            {mainImageUrl && (
              <div className="relative aspect-video w-full mb-10 overflow-hidden rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
                <Image 
                  src={mainImageUrl} 
                  alt={article.title} 
                  fill 
                  className="object-cover" 
                  priority 
                />
              </div>
            )}

            <div 
              className="ql-editor text-lg leading-relaxed text-slate-600 dark:text-slate-300
                [&_li[data-list='bullet']]:list-none [&_li[data-list='bullet']]:relative [&_li[data-list='bullet']]:pl-8
                [&_li[data-list='bullet']]:before:content-['•'] [&_li[data-list='bullet']]:before:absolute [&_li[data-list='bullet']]:before:left-2
                [&_li[data-list='bullet']]:before:text-primary [&_li[data-list='bullet']]:before:font-bold
                [&_li[data-list='ordered']]:list-decimal [&_li[data-list='ordered']]:ml-8 [&_li[data-list='ordered']]:pl-2
                [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-slate-900 dark:[&_h1]:text-white [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:scroll-mt-24
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 dark:[&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:scroll-mt-24
                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 dark:[&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:scroll-mt-24
                [&_img]:rounded-2xl [&_img]:shadow-lg [&_img]:my-8
                [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-slate-50 dark:[&_blockquote]:bg-slate-900/50 [&_blockquote]:p-6 [&_blockquote]:rounded-r-2xl [&_blockquote]:italic
                [&_table]:w-full [&_table]:border-collapse [&_table]:my-6
                [&_th]:border [&_th]:border-slate-200 dark:[&_th]:border-slate-800 [&_th]:p-3 [&_th]:bg-slate-50 dark:[&_th]:bg-slate-900
                [&_td]:border [&_td]:border-slate-200 dark:[&_td]:border-slate-800 [&_td]:p-3
                [&_a]:text-primary [&_a]:font-bold [&_a]:underline
              "
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Nếu không có mục lục, ta đẩy Related News xuống dưới cùng nội dung chính */}
            {!hasHeadings && relatedArticles.length > 0 && (
              <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8">Related News</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.slice(0, 3).map((related) => (
                    <Link key={related._id} href={`/news/${related.slug}`} className="group">
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                         <Image src={getThumbnailUrl(related.thumbnail || related.image)} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">{related.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* SIDEBAR (Chỉ hiện khi có Headings) */}
          {hasHeadings && (
            <aside className="lg:col-span-3 w-full">
              <div className="sticky top-24 space-y-10">
                <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-5 flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    On this page
                  </h3>
                  <TableOfContents headings={headings} />
                </div>

                {relatedArticles.length > 0 && (
                  <div className="space-y-8 px-1">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center">
                      <span className="w-4 h-[1px] bg-slate-200 dark:bg-slate-800 mr-2"></span>
                      Related News
                    </h3>
                    <div className="space-y-6">
                      {relatedArticles.slice(0, 3).map((related) => {
                        const relatedImg = getThumbnailUrl(related.thumbnail || related.image);
                        return (
                          <Link key={related._id} href={`/news/${related.slug}`} className="group block">
                            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-100 dark:border-slate-800 mb-3 shadow-sm">
                              {relatedImg && (
                                <Image src={relatedImg} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                              {related.title}
                            </h4>
                            <time className="text-[10px] text-slate-400 mt-2 block font-medium" suppressHydrationWarning>
                              {formatDate(related.publishedAt)}
                            </time>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          )}
          
        </div>
      </div>
    </div>
  );
}