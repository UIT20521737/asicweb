import NewsListWrapper from './NewsListWrapper';

async function fetchNews(page = 1) {
  try {
    // Mỗi lần lấy đúng 100 bài như bạn yêu cầu
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/news/published?page=${page}&limit=100`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { data } = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching news:', error.message);
    return null;
  }
}

export default async function NewsListPage() {
  const initialArticles = await fetchNews(1);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-slate-950 font-sans pb-32">
      <div className="container mx-auto px-4 max-w-7xl pt-16">
        {!initialArticles ? (
          <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
             <p className="text-slate-900 dark:text-white font-bold text-xl">Unable to reach our stories</p>
          </div>
        ) : initialArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 opacity-60">
            <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">The archives are empty</p>
          </div>
        ) : (
          <NewsListWrapper initialArticles={initialArticles} />
        )}
      </div>
    </div>
  );
}