import { API_HOST } from '@/data/apihost';
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
    const {data} = await res.json();
    console.log('Fetched news data:', data);
    // Validate response is an array
    if (!Array.isArray(data)) {
      console.error('API response is not an array:', data);
      return [];
    }
    return data;
  } catch (error) {
    console.error('Error fetching news:', error.message);
    return null; // Return null to indicate error
  }
}

// Helper function to get full thumbnail URL
function getThumbnailUrl(thumbnail) {
  if (!thumbnail) return null;
  if (thumbnail.startsWith('http')) return thumbnail;
  return `${process.env.NEXT_PUBLIC_API_HOST}${thumbnail}`;
}

// Thumbnail Image Component
function ThumbnailImage({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
}

// Fallback Icon Component
function FallbackIcon({ className = "w-16 h-16" }) {
  return (
    <svg className={`${className} text-gray-300`} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
    </svg>
  );
}

export default async function NewsList() {
  const articles = await fetchNews();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="text-center space-y-3">
            <h1 className="text-5xl md:text-6xl text-primary font-bold tracking-tight text-gray-900">
              News
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed with our curated selection of the most important stories
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {!articles ? (
          <div className="flex items-center justify-center p-12 bg-red-50 border border-red-200 rounded-2xl">
            <div className="text-center">
              <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800 font-semibold text-lg">Error loading news</p>
              <p className="text-red-600 mt-2">Please try again later</p>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="flex items-center justify-center p-12 bg-gray-50 border border-gray-200 rounded-2xl">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-gray-700 font-semibold text-lg">No news available</p>
              <p className="text-gray-500 mt-2">Check back soon for updates</p>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Article (First Article) */}
            {articles.length > 0 && (
              <Link href={`/news/${articles[0]?.slug}`} className="block group mb-12">
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                    <div className="flex flex-col justify-center space-y-6">
                      <div className="inline-flex items-center space-x-2">
                        <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                          NEWEST
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(articles[0].createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                        {articles[0].title || 'Untitled'}
                      </h2>
                      <p className="text-lg text-gray-600 leading-relaxed line-clamp-3">
                        {articles[0].shortDescription || 'No description available.'}
                      </p>
                      <div className="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                        <span>Read More</span>
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                      {getThumbnailUrl(articles[0].thumbnail) ? (
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                          <ThumbnailImage
                            src={getThumbnailUrl(articles[0].thumbnail)}
                            alt={articles[0].title}
                            className="w-full h-full object-contain transition-transform group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="w-full aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                          <FallbackIcon className="w-24 h-24" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid Articles */}
            {articles.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.slice(1).map((article) => {
                  const date = new Date(article.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });
                  const thumbnailUrl = getThumbnailUrl(article.thumbnail);
                  
                  return (
                    <Link key={article._id} href={`/news/${article?.slug}`} className="block group">
                      <article className="h-full bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        {/* Image */}
                        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden">
                          {thumbnailUrl ? (
                            <ThumbnailImage
                              src={thumbnailUrl}
                              alt={article.title}
                              className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            />
                          ) : (
                            <FallbackIcon className="w-16 h-16 transition-transform group-hover:scale-110" />
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 space-y-3">
                          <time className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                            {date}
                          </time>
                          <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                            {article.title || 'Untitled'}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {article.shortDescription || 'No description available.'}
                          </p>
                          <div className="flex items-center text-primary text-sm font-semibold pt-2">
                            <span>Read More</span>
                            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}