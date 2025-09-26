import Link from 'next/link';

// Fetch news từ server
async function fetchNews() {
  const res = await fetch('https://asicportal.longpc.xyz/api/news', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

export default async function NewsList() {
  const articles = await fetchNews();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Latest News</h1>

      {articles.length === 0 ? (
        <div className="flex items-center justify-center p-8 text-foreground">
          <p>No news available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => {
            const date = new Date(article.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            return (
              <Link key={article._id} href={`/news/${article.slug}`} className="block group">
                <div
                  className="rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                  style={{ backgroundColor: 'var(--color-card)' }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{date}</p>
                    <p className="text-gray-700">{article.shortDescription}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
