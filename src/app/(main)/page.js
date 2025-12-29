import AboutUs from "@/components/AboutUs";
import ResearchDirections from "@/components/ResearchDirections";
import SupportingActivities from "@/components/SupportingActivities";
import TeamMembers from "@/components/TeamMembers";
import MissionVision from "@/components/MissionVision";
import OurServices from '@/components/OurServices';
import LabActivitiesPublic from '@/components/LabActivitiesPublic';


// 1. Hàm fetch dữ liệu ngay tại Server (SEO tối đa)
async function getActivities() {
  const host = process.env.NEXT_PUBLIC_API_HOST || 'https://asicweb-portal.longpc.xyz';
  try {
    const res = await fetch(`${host}/api/activities/public?limit=100`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const result = await res.json();
    // Lấy toàn bộ data, không lọc isPinned nữa để hiện đủ 2 hình
    const data = Array.isArray(result) ? result : (result.data || []);
    return data; 
  } catch (error) {
    return [];
  }
}

// 2. Định nghĩa Metadata (Thay thế cho thẻ Head)
export const metadata = {
  title: "ASICLAB: Semiconductor & AI Research at UIT, Vietnam",
  description: "ASICLAB at University of Information Technology, Vietnam, drives innovation in semiconductor design, AI, and integrated circuits. Explore our research, team, and achievements, including Q1 Scie journal publications.",
  keywords: "ASICLAB, UIT, semiconductor research, artificial intelligence, integrated circuits, Vietnam research lab, University of Information Technology, scientific publications",
  authors: [{ name: "ASICLAB, University of Information Technology" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://asic.uit.edu.vn",
  },
  openGraph: {
    title: "ASICLAB: Semiconductor & AI Research at UIT, Vietnam",
    description: "ASICLAB at UIT, Vietnam, leads cutting-edge research in semiconductor design and AI, with notable achievements like Q1 Scie journal publications. Discover our mission and team.",
    url: "https://asic.uit.edu.vn",
    type: "website",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASICLAB: Semiconductor & AI Research at UIT, Vietnam",
    description: "ASICLAB at UIT, Vietnam, leads cutting-edge research in semiconductor design and AI, with notable achievements like Q1 Scie journal publications.",
    images: ["/images/logo.png"],
  },
};

export default async function Home() {
  const activities = await getActivities();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ASICLAB - University of Information Technology, Vietnam",
    "url": "https://asic.uit.edu.vn",
    "logo": "/images/logo.png",
    "description": "ASICLAB at UIT, Vietnam, is a leading research laboratory focused on advanced semiconductor design, AI, and integrated circuit technologies, fostering innovation and academic excellence.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "6th Floor, University of Information Technology, Quarter 34, Linh Xuan Ward",
      "addressLocality": "Ho Chi Minh City",
      "addressCountry": "Vietnam"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "asic@uit.edu.vn",
      "contactType": "General Inquiries"
    },
    "sameAs": ["https://www.uit.edu.vn"]
  };

  return (
    <div>
      {/* Chèn JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main>
        <AboutUs />
        <MissionVision />
        <ResearchDirections />
        <OurServices />
        <SupportingActivities />
        
        {/* LabActivitiesPublic render phía Server */}
       <LabActivitiesPublic initialActivities={activities} />
        
        <TeamMembers />
      </main>
    </div>
  );
}