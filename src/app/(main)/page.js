import Head from 'next/head';
import AboutUs from "@/components/AboutUs";
import ResearchDirections from "@/components/ResearchDirections";
import SupportingActivities from "@/components/SupportingActivities";
import TeamMembers from "@/components/TeamMembers";
import MissionVision from "@/components/MissionVision";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ASICLAB - University of Information Technology, Vietnam",
    "url": "https://asic.uit.edu.vn",
    "logo": "/images/logo.png", // Updated to use public/images/logo.png
    "description": "ASICLAB at UIT, Vietnam, is a leading research laboratory focused on advanced semiconductor design, AI, and integrated circuit technologies, fostering innovation and academic excellence.",
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
    "sameAs": [
      "https://www.uit.edu.vn" // Link to main UIT website
    ]
  };

  return (
    <div>
      <Head>
        <title>ASICLAB: Semiconductor & AI Research at UIT, Vietnam</title>
        <meta name="description" content="ASICLAB at University of Information Technology, Vietnam, drives innovation in semiconductor design, AI, and integrated circuits. Explore our research, team, and achievements, including Q1 Scie journal publications." />
        <meta name="keywords" content="ASICLAB, UIT, semiconductor research, artificial intelligence, integrated circuits, Vietnam research lab, University of Information Technology, scientific publications" />
        <meta name="author" content="ASICLAB, University of Information Technology" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charset="UTF-8" />
        <link rel="canonical" href="https://asic.uit.edu.vn" />
        <meta property="og:title" content="ASICLAB: Semiconductor & AI Research at UIT, Vietnam" />
        <meta property="og:description" content="ASICLAB at UIT, Vietnam, leads cutting-edge research in semiconductor design and AI, with notable achievements like Q1 Scie journal publications. Discover our mission and team." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://asic.uit.edu.vn" />
        <meta property="og:image" content="/images/logo.png" /> {/* Updated to use public/images/logo.png */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ASICLAB: Semiconductor & AI Research at UIT, Vietnam" />
        <meta name="twitter:description" content="ASICLAB at UIT, Vietnam, leads cutting-edge research in semiconductor design and AI, with notable achievements like Q1 Scie journal publications." />
        <meta name="twitter:image" content="/images/logo.png" /> {/* Updated to use public/images/logo.png */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>
      <main>
        <AboutUs />
        <MissionVision />
        <ResearchDirections />
        <SupportingActivities />
        <TeamMembers />
      </main>
    </div>
  );
}