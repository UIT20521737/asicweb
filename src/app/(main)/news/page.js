import NewsList from '@/components/NewsList';

// SEO Metadata - Comprehensive optimization
export const metadata = {
  title: 'Latest News & Updates | ASIC Lab - UIT',
  description: 'Stay informed with the latest news, research updates, and announcements from ASIC Lab at University of Information Technology. Discover groundbreaking discoveries in Application-Specific Integrated Circuits and semiconductor research.',
  keywords: 'ASIC Lab, UIT, research updates, semiconductor news, integrated circuits, VLSI design, chip design news, UIT research, Vietnam semiconductor',
  
  // Open Graph / Facebook
  openGraph: {
    title: 'Latest News & Updates | ASIC Lab - UIT',
    description: 'Stay informed with the latest news, research updates, and announcements from ASIC Lab at University of Information Technology.',
    type: 'website',
    locale: 'en_US',
    url: 'https://asic.uit.edu.vn/news',
    siteName: 'ASIC Lab - UIT',
    images: [
      {
        url: 'https://asic.uit.edu.vn/public/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'ASIC Lab News',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Latest News & Updates | ASIC Lab - UIT',
    description: 'Stay informed with the latest news, research updates, and announcements from ASIC Lab at University of Information Technology.',
    images: ['https://asic.uit.edu.vn/public/images/logo.png'],
    creator: '@ASICLabUIT',
    site: '@ASICLabUIT',
  },
  
  // Additional SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: 'https://asic.uit.edu.vn/news',
  },
  
  // Additional metadata
  authors: [{ name: 'ASIC Lab - UIT' }],
  category: 'Semiconductor Research & ASIC Design',
  
  // Verification (optional - add if you have these)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
};

// JSON-LD Structured Data for better SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Latest News & Updates - ASIC Lab',
  description: 'Stay informed with the latest news, research updates, and announcements from ASIC Lab at University of Information Technology.',
  url: 'https://asic.uit.edu.vn/news',
  publisher: {
    '@type': 'Organization',
    name: 'ASIC Lab - University of Information Technology',
    alternateName: 'ASIC Lab UIT',
    url: 'https://asic.uit.edu.vn',
    logo: {
      '@type': 'ImageObject',
      url: 'https://asic.uit.edu.vn/public/images/logo.png',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'VN',
    },
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [], // This will be populated dynamically with news articles
  },
};

export default function News() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Main Content */}
      <main className="min-h-screen">
        <NewsList />
      </main>
    </>
  );
}