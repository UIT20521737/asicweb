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

// Hàm gọi API để lấy bài viết liên quan
async function getRelatedArticles(id) {
  try {
    const related = await fetchNewsFromApi(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/news/${id}/related`,
      'full'
    );
    return related || [];
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
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

  // Fetch related articles using article ID
  const relatedArticles = await getRelatedArticles(article._id);

  const { processedContent, headings } = processContentWithHeadings(article.content);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/news"
          className="inline-flex items-center text-primary-light hover:text-primary-dark transition-colors duration-200 text-sm font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Table of Contents - Left Column */}
        <aside className="lg:col-span-3 order-2 lg:order-1">
          {headings.length > 0 && (
            <div className="sticky top-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <TableOfContents headings={headings} />
            </div>
          )}
        </aside>

        {/* Article Content - Middle Column */}
        <main className="lg:col-span-6 order-1 lg:order-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-primary-dark leading-tight">{article.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center font-medium">
            {formatDate(article.publishedAt)}
          </p>
          <div className="rounded-xl shadow-xl p-6 sm:p-8 bg-white dark:bg-gray-800 transition-all duration-200">
            {article.image && (
              <Image
                src={article.image}
                alt={article.title || 'Article image'}
                width={800}
                height={320}
                className="w-full h-64 sm:h-80 object-cover rounded-lg mb-8 shadow-md"
                priority
              />
            )}
            <div className="prose prose-slate max-w-none lg:prose-lg dark:prose-invert">
              {processedContent ? (
                <div
                  className="leading-relaxed
                    [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-slate-800 dark:[&_h1]:text-slate-100
                    [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-slate-700 dark:[&_h2]:text-slate-200
                    [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mt-5 [&_h3]:mb-3 [&_h3]:text-slate-600 dark:[&_h3]:text-slate-300
                    [&_p]:text-base [&_p]:mb-5 [&_p]:text-slate-700 [&_p]:leading-7 dark:[&_p]:text-slate-200
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:text-slate-700 dark:[&_ul]:text-slate-200
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:text-slate-700 dark:[&_ol]:text-slate-200
                    [&_li]:mb-2
                    [&_blockquote]:border-l-4 [&_blockquote]:border-primary-light [&_blockquote]:pl-4 [&_blockquote]:my-5 [&_blockquote]:text-slate-600 [&_blockquote]:italic dark:[&_blockquote]:text-slate-300 dark:[&_blockquote]:border-primary-dark
                    [&_a]:!text-primary-light [&_a]:hover:!text-primary-dark [&_a]:transition-colors [&_a]:!bg-transparent [&_a]:underline
                    [&_img]:max-w-full [&_img]:h-auto [&_img]:my-5 [&_img]:rounded-lg [&_img]:shadow-md
                    [&_video]:max-w-full [&_video]:h-auto [&_video]:my-5 [&_video]:rounded-lg
                    [&_code]:bg-gray-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded-md [&_code]:text-sm [&_code]:text-slate-800 dark:[&_code]:bg-gray-700 dark:[&_code]:text-slate-100
                    [&_pre]:bg-gray-900 [&_pre]:text-slate-100 [&_pre]:p-5 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-5 dark:[&_pre]:bg-gray-800
                    [&_table]:w-full [&_table]:border-collapse [&_table]:my-5
                    [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold dark:[&_th]:bg-gray-700 dark:[&_th]:border-gray-600
                    [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-3 dark:[&_td]:border-gray-600"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              ) : (
                <p className="text-base text-gray-600 dark:text-gray-400">No content available.</p>
              )}
            </div>
          </div>
        </main>

        {/* Related Articles - Right Column */}
        <aside className="lg:col-span-3 order-3">
          <h2 className="text-xl font-semibold mb-6 text-primary">Related Articles</h2>
          <div className="space-y-6">
            {relatedArticles.length > 0 ? (
              relatedArticles.map((related) => (
                <div
                  key={related._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
                >
                  {related.thumbnail && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_HOST}${related.thumbnail}`}
                      alt={related.title}
                      width={300}
                      height={120}
                      className="w-full h-36 object-cover rounded-lg mb-4"
                    />
                  )}
                  <Link href={`/news/${related.slug}`} className="text-primary-light hover:text-primary-dark transition-colors duration-200">
                    <h3 className="text-base font-semibold mb-2">{related.title}</h3>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{related.shortDescription}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
                    {formatDate(related.publishedAt)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">No related articles available.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}