import Link from 'next/link';

const newsList = [
  { id: 1, title: "ASIC Lab Wins IEEE Award", date: "September 18, 2025", description: "Recognition for outstanding contributions in ASIC research and education." },
  { id: 2, title: "New Research Collaboration with Industry", date: "September 5, 2025", description: "Partnering with leading tech companies for AI on FPGA projects." },
  { id: 3, title: "Publication of ASIC Optimization Paper", date: "August 28, 2025", description: "Latest findings in low-power ASIC design published in IEEE journals." },
  { id: 4, title: "Seminar on VLSI Trends 2025", date: "August 12, 2025", description: "Discussing emerging technologies and challenges in VLSI design." },
  { id: 5, title: "Lab Open Day Event", date: "July 30, 2025", description: "Showcasing ongoing projects and student research to the community." },
];

const News = () => {
  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          Latest News from ASIC LAB
        </h2>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {news.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{news.date}</p>
              <p className="text-gray-700 dark:text-gray-300 flex-grow">{news.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/news"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
