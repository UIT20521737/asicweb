import Link from 'next/link';
import Image from 'next/image';

// Hàm giả lập việc fetch dữ liệu
async function fetchNewsFromServer(url) {
  await new Promise(resolve => setTimeout(resolve, 500));
  // Giả lập chỉ trả về dữ liệu tóm tắt
  return [
    {
      id: 1,
      title: "ASICLab Wins &apos;Best Research Paper&apos; at ICAS 2025",
      summary: "Our team received top honors for their groundbreaking work on low-power SoC design at the International Conference on Advanced Semiconductors.",
      date: "September 24, 2025",
      image: "/images/news1.jpg",
      slug: "asiclab-wins-best-paper",
    },
    {
      id: 2,
      title: "New AIoT Research Project Launched with TechCorp",
      summary: "ASICLab is excited to announce a new collaboration with TechCorp to develop next-generation AIoT solutions for industrial applications.",
      date: "September 15, 2025",
      image: "/images/news2.jpg",
      slug: "aiot-project-launch",
    },
    {
      id: 3,
      title: "Phát receives Scholarship for Advanced Studies in IC Design",
      summary: "Congratulations to Phát for being awarded a prestigious scholarship to pursue his Ph.D. studies in integrated circuit design.",
      date: "September 10, 2025",
      image: "/images/news3.jpg",
      slug: "phat-scholarship",
    },
  ];
}

export default async function NewsList({ url }) {
  const articles = await fetchNewsFromServer(url);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Latest News</h1>
      {articles.length === 0 ? (
        <div className="flex items-center justify-center p-8 text-foreground">
          <p>No news available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Link key={article.id} href={`/news/${article.slug}`} className="block group">
              <div 
                className="rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  width={600}
                  height={200}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-110" 
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-primary group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {article.date}
                  </p>
                  <p className="text-gray-700">
                    {article.summary}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}