'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function getThumbnailUrl(thumbnail) {
  if (!thumbnail) return null;
  if (thumbnail.startsWith('http')) return thumbnail;
  return `${process.env.NEXT_PUBLIC_API_HOST}${thumbnail}`;
}

export default function NewsListWrapper({ initialArticles }) {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialArticles.length >= 100);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/news/published?page=${nextPage}&limit=100`);
      const { data } = await res.json();

      if (data && data.length > 0) {
        setArticles(prev => [...prev, ...data]);
        setPage(nextPage);
        if (data.length < 100) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Load more error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-24">
      {/* 1. Featured Article (Sử dụng bài đầu tiên của mảng articles) */}
      <section className="relative group">
        <Link href={`/news/${articles[0].slug}`} className="block relative">
          <div className="grid lg:grid-cols-12 gap-0 overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.06)] border border-white dark:border-slate-800">
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
              {getThumbnailUrl(articles[0].thumbnail) ? (
                <Image src={getThumbnailUrl(articles[0].thumbnail)} alt={articles[0].title} fill className="object-cover transition-transform duration-[1.5s] group-hover:scale-105" priority />
              ) : (
                <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center" />
              )}
            </div>
            <div className="lg:col-span-5 p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-white dark:bg-slate-900">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-6 bg-primary/30" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">Featured Story</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tighter group-hover:text-primary">{articles[0].title}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8 line-clamp-3 font-medium">{articles[0].shortDescription}</p>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50 dark:border-slate-800">
                <time className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{new Date(articles[0].createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* 2. Grid Articles (Phần còn lại) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {articles.slice(1).map((article) => {
          const thumb = getThumbnailUrl(article.thumbnail);
          return (
            <Link key={article._id} href={`/news/${article.slug}`} className="group flex flex-col h-full">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 mb-8 shadow-sm border border-white dark:border-slate-800 transition-all duration-500 group-hover:-translate-y-1.5">
                {thumb ? <Image src={thumb} alt={article.title} fill className="object-cover transition-transform duration-[1s] group-hover:scale-110" /> : <div className="w-full h-full bg-slate-100" />}
              </div>
              <div className="px-2">
                <time className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]">{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-4 group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 line-clamp-3">{article.shortDescription}</p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* 3. Button Xem thêm 100 bài tiếp theo */}
      {hasMore && (
        <div className="flex justify-center pt-12">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-12 py-5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 disabled:opacity-50 shadow-xl active:scale-95"
          >
            {loading ? 'Đang tải thêm...' : 'Hiện thêm 100 bài viết'}
          </button>
        </div>
      )}
    </div>
  );
}