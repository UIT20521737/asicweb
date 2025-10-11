import Head from 'next/head';
import PublicationsList from "@/components/PublicationsList";

export const metadata = {
  title: 'Publications | ASICLAB, UIT Vietnam',
  description: 'Explore the scientific publications of ASICLAB at University of Information Technology, Vietnam, including high-impact research in semiconductor design, AI, and integrated circuits, with Q1 Scie journal contributions.',
  keywords: 'ASICLAB publications, UIT, semiconductor research, AI research, integrated circuits, scientific publications, Q1 Scie journals, University of Information Technology',
  author: 'ASICLAB, University of Information Technology',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    title: 'Publications | ASICLAB, UIT Vietnam',
    description: 'Discover ASICLAB’s scientific publications at UIT, Vietnam, featuring cutting-edge research in semiconductor design, AI, and integrated circuits, including Q1 Scie journal papers.',
    type: 'website',
    url: 'https://asic.uit.edu.vn/publications',
    images: [
      {
        url: '/images/logo.png', // Using public/images/logo.png
        width: 1200,
        height: 630,
        alt: 'ASICLAB Research Laboratory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Publications | ASICLAB, UIT Vietnam',
    description: 'Discover ASICLAB’s scientific publications at UIT, Vietnam, featuring cutting-edge research in semiconductor design, AI, and integrated circuits.',
    images: ['/images/logo.png'], // Using public/images/logo.png
  },
};

export default function PublicationsPage() {
  const publicationsApiUrl = "https://your-api.com/api/publications"; // Replace with actual API URL
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ASICLAB Publications",
    "url": "https://asic.uit.edu.vn/publications",
    "description": "A collection of scientific publications by ASICLAB at University of Information Technology, Vietnam, focusing on semiconductor design, artificial intelligence, and integrated circuit technologies.",
    "isPartOf": {
      "@type": "WebSite",
      "name": "ASICLAB - University of Information Technology, Vietnam",
      "url": "https://asic.uit.edu.vn",
    },
    "publisher": {
      "@type": "Organization",
      "name": "ASICLAB - University of Information Technology, Vietnam",
      "url": "https://asic.uit.edu.vn",
      "logo": "/images/logo.png", // Using public/images/logo.png
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "6th Floor, University of Information Technology, Quarter 34, Linh Xuan Ward",
        "addressLocality": "Ho Chi Minh City",
        "addressCountry": "Vietnam"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "asic@uit.edu.vn", // Replace with actual email
        "contactType": "General Inquiries"
      },
      "sameAs": ["https://www.uit.edu.vn"]
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="canonical" href="https://asic.uit.edu.vn/publications" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <PublicationsList url={publicationsApiUrl} />
    </div>
  );
}