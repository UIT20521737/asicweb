// src/app/(main)/services/page.js
import ServicesContent from '@/components/ServicesContent'

export const metadata = {
  title: "Services",
  description: "Explore the short courses, lab equipment, and internship opportunities offered by our lab.",
};

export default function ServicesPage() {
   const servicesApiUrl = "/api/services"; // Placeholder URL
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ServicesContent url={servicesApiUrl}  />
    </div>
  );
}