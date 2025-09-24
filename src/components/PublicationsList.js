// components/PublicationsList.js
"use client";
import { useState, useEffect } from 'react';

// Dữ liệu giả lập, sẽ được thay thế bằng dữ liệu từ API
const dummyPublications = [
  {
    id: 1,
    title: "A Novel Low-Power AIoT Chip for Edge Computing",
    authors: "Phát, Thịnh, John Doe, Jane Smith",
    source: "IEEE Transactions on Circuits and Systems",
    year: 2024,
    rank: "Q1",
    link: "https://doi.org/10.1109/TCS.2024.123456",
  },
  {
    id: 2,
    title: "Efficient SoC Design for Wearable Health Monitoring",
    authors: "Mary Williams, Phát, Peter Jones",
    source: "ACM Journal of Embedded Systems",
    year: 2023,
    rank: "A",
    link: "https://doi.org/10.1145/JES.2023.789012",
  },
  {
    id: 3,
    title: "On-Chip Machine Learning Algorithm for IoT Devices",
    authors: "John Doe, Jane Smith, Phát",
    source: "Journal of Embedded Computing",
    year: 2023,
    rank: "B",
    link: "#",
  },
  {
    id: 4,
    title: "Another Publication from Last Year",
    authors: "Phát, John Doe",
    source: "Conference on Embedded Systems",
    year: 2024,
    rank: "B",
    link: "#",
  },
];

// Hàm giả lập việc fetch dữ liệu từ server
const fetchPublicationsFromServer = async (url) => {
  // Khi có URL thật, bạn sẽ thay thế đoạn code này bằng lệnh `fetch(url)`
  // await new Promise(resolve => setTimeout(resolve, 1000));
  // const response = await fetch(url);
  // const data = await response.json();
  // return data;
  return dummyPublications;
};

export default function PublicationsList({ url }) {
  const [publications, setPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPublications = async () => {
      setIsLoading(true);
      const data = await fetchPublicationsFromServer(url);
      setPublications(data);
      setIsLoading(false);
    };

    if (url) {
      loadPublications();
    }
  }, [url]);

  const getRankClasses = (rank) => {
    switch (rank) {
      case "Q1":
      case "A*":
        return "bg-green-600 text-white";
      case "A":
        return "bg-blue-600 text-white";
      case "B":
        return "bg-yellow-600 text-gray-800";
      default:
        return "bg-gray-600 text-white";
    }
  };

  // Sắp xếp và nhóm các bài báo theo năm
  const sortedPublications = publications.sort((a, b) => b.year - a.year);
  const groupedByYear = sortedPublications.reduce((acc, pub) => {
    const year = pub.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(pub);
    return acc;
  }, {});
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Our Publications</h1>
      {isLoading ? (
        <div className="flex items-center justify-center p-8 text-foreground">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading publications...
        </div>
      ) : (
        Object.keys(groupedByYear).map((year) => (
          <div key={year}>
            <h2 className="text-3xl font-bold mb-6 mt-8 text-foreground">
              {year}
            </h2>
            <div className="space-y-6">
              {groupedByYear[year].map((pub) => (
                <div 
                  key={pub.id} 
                  className="rounded-lg p-6 shadow-md transition-transform transform hover:scale-[1.01]"
                  style={{ backgroundColor: 'var(--color-card)' }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground pr-10">
                      {pub.title}
                    </h3>
                    {pub.rank && (
                      <span className={`flex-shrink-0 px-3 py-1 text-xs font-bold rounded-full ${getRankClasses(pub.rank)}`}>
                        {pub.rank}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-foreground/75 mb-1">
                    <span className="font-medium">Authors:</span> {pub.authors}
                  </p>
                  <p className="text-sm text-foreground/75 mb-4">
                    <span className="font-medium">Source:</span> {pub.source} ({pub.year})
                  </p>
                  
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-primary hover:underline text-sm font-medium"
                  >
                    View Publication →
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}