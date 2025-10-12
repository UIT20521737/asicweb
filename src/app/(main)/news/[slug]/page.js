import { notFound } from 'next/navigation';
import { fetchNewsFromApi } from '@/data/news';
import Link from 'next/link';
import Image from 'next/image';
import TableOfContents from '../../../../components/TableOfContents';
import { JSDOM } from 'jsdom';

// Hàm gọi API chung để tái sử dụng
async function getArticle(slug) {
  try {
    const article = await fetchNewsFromApi(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/news/slug`,
      'full',
      slug
    );
    return article || null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Hàm format ngày tháng theo GMT+7
function formatDate(isoDate) {
  if (!isoDate) return 'No date available';
  try {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Ho_Chi_Minh',
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'No date available';
  }
}

// Hàm thêm id vào headings và trích xuất chúng
function processContentWithHeadings(htmlContent) {
  if (!htmlContent) return { processedContent: '', headings: [] };
  
  try {
    const dom = new JSDOM(htmlContent);
    const doc = dom.window.document;
    const headings = [];
    
    // Thêm id cho tất cả headings
    doc.querySelectorAll('h1, h2, h3').forEach((element) => {
      const id = element.id || element.textContent.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/-+/g, '-')       // Replace multiple hyphens with single
        .trim();
      
      element.id = id;
      
      headings.push({
        id: id,
        text: element.textContent,
        level: element.tagName.toLowerCase(),
      });
    });
    
    return {
      processedContent: doc.body.innerHTML,
      headings: headings
    };
  } catch (error) {
    console.error('Error processing content:', error);
    return { processedContent: htmlContent, headings: [] };
  }
}

// Dữ liệu giả cho bài viết liên quan
const relatedArticles = [
  {
    id: 1,
    title: 'Tech Trends in 2025: What to Expect',
    slug: 'tech-trends-2025',
    image: '/images/tech-trends.jpg',
    summary: 'Explore the upcoming technology trends shaping the future in 2025.',
    publishedAt: '2025-10-01T10:00:00Z',
  },
  {
    id: 2,
    title: 'AI Innovations Transforming Industries',
    slug: 'ai-innovations',
    image: '/images/ai-innovations.jpg',
    summary: 'How artificial intelligence is revolutionizing various sectors.',
    publishedAt: '2025-09-28T14:30:00Z',
  },
  {
    id: 3,
    title: 'The Future of Web Development',
    slug: 'future-web-development',
    image: '/images/web-dev.jpg',
    summary: 'A look at the tools and techniques defining modern web development.',
    publishedAt: '2025-09-20T09:15:00Z',
  },
];

// Export viewport metadata
export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: 'Not Found',
      description: 'The news article you are looking for does not exist.',
      robots: 'noindex',
    };
  }

  return {
    title: article.title || 'Untitled Article',
    description: article.summary || 'No summary available.',
    openGraph: {
      title: article.title || 'Untitled Article',
      description: article.summary || 'No summary available.',
      images: article.image ? [{ url: article.image, width: 800, height: 320, alt: article.title || 'Article image' }] : [],
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/news/${slug}`,
      type: 'article',
      publishedAt: article.publishedAt || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title || 'Untitled Article',
      description: article.summary || 'No summary available.',
      images: article.image ? [article.image] : [],
    },
    robots: 'index, follow',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/news/${slug}`,
    },
  };
}

// Server-side page component
export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const { processedContent, headings } = processContentWithHeadings(article.content);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/news"
          className="inline-flex items-center text-primary-light hover:text-primary transition-colors text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to News
        </Link>
      </div>

      {/* Three-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table of Contents - Left Column */}
        <aside className="lg:col-span-3 order-2 lg:order-1">
          {headings.length > 0 && <TableOfContents headings={headings} />}
        </aside>

        {/* Article Content - Middle Column */}
        <main className="lg:col-span-6 order-1 lg:order-2">
          <h1 className="text-4xl font-bold text-center mb-4 text-primary">{article.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-8">
            {formatDate(article.publishedAt)}
          </p>
          <div className="rounded-lg shadow-lg p-6 sm:p-8" style={{ backgroundColor: 'var(--color-card)' }}>
            {article.image && (
              <Image
                src={article.image}
                alt={article.title || 'Article image'}
                width={800}
                height={320}
                className="w-full h-80 object-cover rounded-lg mb-8"
                priority
              />
            )}
            <div className="prose prose-slate max-w-none lg:prose-lg">
              {processedContent ? (
                <div
                  className="leading-relaxed 
                    [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-4 [&_h1]:text-slate-800
                    [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-3 [&_h2]:text-slate-700
                    [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-slate-600
                    [&_p]:text-base [&_p]:mb-4 [&_p]:text-slate-700 [&_p]:leading-7
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-slate-700
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-slate-700
                    [&_li]:mb-2
                    [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote]:text-slate-600 [&_blockquote]:italic
                    [&_a]:!text-[#0768ea] [&_a]:hover:!text-[#0557c2] [&_a]:transition-colors [&_a]:!bg-transparent [&_a]:underline
                    [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4 [&_img]:rounded-md [&_img]:shadow-lg
                    [&_video]:max-w-full [&_video]:h-auto [&_video]:my-4 [&_video]:rounded-md
                    [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:text-slate-800
                    [&_pre]:bg-slate-900 [&_pre]:text-slate-100 [&_pre]:p-4 [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_pre]:my-4
                    [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
                    [&_th]:border [&_th]:border-slate-300 [&_th]:bg-slate-100 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold
                    [&_td]:border [&_td]:border-slate-300 [&_td]:px-4 [&_td]:py-2
                    dark:[&_h1]:text-slate-200 dark:[&_h2]:text-slate-300 dark:[&_h3]:text-slate-400
                    dark:[&_p]:text-slate-300 dark:[&_ul]:text-slate-300 dark:[&_ol]:text-slate-300
                    dark:[&_blockquote]:border-slate-600 dark:[&_blockquote]:text-slate-400
                    dark:[&_code]:bg-slate-800 dark:[&_code]:text-slate-200
                    dark:[&_th]:bg-slate-800 dark:[&_th]:border-slate-700
                    dark:[&_td]:border-slate-700"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              ) : (
                <p>No content available.</p>
              )}
            </div>
          </div>
        </main>

        {/* Related Articles - Right Column */}
        <aside className="lg:col-span-3 order-3">
          <h2 className="text-lg font-semibold mb-4 text-primary">Related Articles</h2>
          <div className="space-y-6">
            {relatedArticles.map((related) => (
              <div key={related.id} className="border-b pb-4">
                {related.image && (
                  <Image
                    src={related.image}
                    alt={related.title}
                    width={300}
                    height={120}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                )}
                <Link href={`/news/${related.slug}`} className="text-primary hover:underline">
                  <h3 className="text-base font-medium">{related.title}</h3>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400">{related.summary}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {formatDate(related.publishedAt)}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}