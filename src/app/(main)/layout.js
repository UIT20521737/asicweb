import Head from 'next/head';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export const metadata = {
  title: {
    template: '%s | ASICLAB, UIT Vietnam',
    default: 'ASICLAB: Semiconductor & AI Research at UIT, Vietnam',
  },
  description: 'ASICLAB at University of Information Technology, Vietnam, is a leading research lab specializing in semiconductor design, AI, and integrated circuits. Discover our research, team, and achievements.',
  keywords: 'ASICLAB, UIT, semiconductor research, artificial intelligence, integrated circuits, Vietnam research lab, University of Information Technology, scientific publications',
  author: 'ASICLAB, University of Information Technology',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    title: 'ASICLAB: Semiconductor & AI Research at UIT, Vietnam',
    description: 'ASICLAB at UIT, Vietnam, leads cutting-edge research in semiconductor design and AI, with notable achievements like Q1 Scie journal publications. Explore our mission and team.',
    type: 'website',
    url: 'https://asic.uit.edu.vn',
    images: [
      {
        url: '/images/logo.png', // Updated to use public/images/logo.png
        width: 1200,
        height: 630,
        alt: 'ASICLAB Research Laboratory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASICLAB: Semiconductor & AI Research at UIT, Vietnam',
    description: 'ASICLAB at UIT, Vietnam, leads cutting-edge research in semiconductor design and AI, with notable achievements like Q1 Scie journal publications.',
    images: ['/images/logo.png'], // Updated to use public/images/logo.png
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ASICLAB - University of Information Technology, Vietnam',
    url: 'https://asic.uit.edu.vn',
    logo: '/images/logo.png', // Updated to use public/images/logo.png
    description: 'ASICLAB at UIT, Vietnam, is a leading research laboratory focused on advanced semiconductor design, artificial intelligence, and integrated circuit technologies, fostering innovation and academic excellence.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Quarter 6, Linh Trung Ward, Thu Duc City',
      addressLocality: 'Ho Chi Minh City',
      addressCountry: 'Vietnam',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'asic@uit.edu.vn', // Replace with actual email
      contactType: 'General Inquiries',
    },
    sameAs: ['https://www.uit.edu.vn'],
  };

  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="canonical" href="https://asic.uit.edu.vn" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}