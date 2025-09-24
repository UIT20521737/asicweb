// src/app/(main)/news/[slug]/page.js

import { notFound } from 'next/navigation';
import { fetchNewsFromApi } from '@/data/news';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const {slug} = await params.slug
  const article = await fetchNewsFromApi(null, 'full', slug);
  if (!article) {
    return {
      title: 'Not Found',
      description: 'The news article you are looking for does not exist.',
    };
  }
  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function NewsArticlePage({ params }) {
  const article = await fetchNewsFromApi(null, 'full', params.slug);

  if (!article) {
    notFound(); 
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <div className="mb-8">
        <Link 
          href="/news" 
          className="inline-flex items-center text-primary-light hover:text-primary transition-colors text-sm font-medium"
        >
          {/* Arrow icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to News
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-center mb-4 text-primary">{article.title}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-8">{article.date}</p>
      
      <div 
        className="rounded-lg shadow-lg p-6 sm:p-8" 
        style={{ backgroundColor: 'var(--color-card)' }}
      >
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-80 object-cover rounded-lg mb-8" 
        />
        
        <div className="prose dark:prose-invert max-w-none text-left">
          <p>{article.content}</p>
        </div>
      </div>
    </div>
  );
}