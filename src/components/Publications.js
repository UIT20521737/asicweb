import React from 'react';
import Link from 'next/link';

const publicationsData = [
  {
    id: 1,
    title: "A Novel Approach to Low-Power ASIC Design",
    authors: "Nguyen Van A, Tran Thi B, Le Van C",
    journal: "IEEE Transactions on Circuits and Systems",
    year: 2024,
    doi: "10.1109/TCSII.2024.1234567",
    link: "https://ieeexplore.ieee.org/document/1234567",
  },
  {
    id: 2,
    title: "Optimizing VLSI Circuits for High-Speed Applications",
    authors: "Pham Van D, Hoang Thi E",
    journal: "Journal of Microelectronics",
    year: 2023,
    doi: "10.1007/s12345-023-01234-5",
    link: "https://link.springer.com/article/10.1007/s12345-023-01234-5",
  },
  {
    id: 3,
    title: "Advanced Techniques in ASIC Verification",
    authors: "Le Van F, Nguyen Thi G",
    journal: "ACM Transactions on Design Automation",
    year: 2022,
    doi: "10.1145/1234567",
    link: "https://dl.acm.org/doi/10.1145/1234567",
  },
  {
    id: 4,
    title: "Power-Efficient Architectures for IoT Devices",
    authors: "Tran Van H, Hoang Thi I",
    journal: "Journal of Embedded Systems",
    year: 2023,
    doi: "10.1016/j.jes.2023.01.001",
    link: "https://www.sciencedirect.com/science/article/pii/S123456789",
  },
  {
    id: 5,
    title: "Machine Learning in ASIC Design Optimization",
    authors: "Pham Thi J, Le Van K",
    journal: "IEEE Journal of Solid-State Circuits",
    year: 2024,
    doi: "10.1109/JSSC.2024.9876543",
    link: "https://ieeexplore.ieee.org/document/9876543",
  },
];

const Publications = ({ publications = publicationsData }) => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 text-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Published Papers
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {publications.slice(0, 5).map((pub) => (
            <div
              key={pub.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {pub.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                <span className="font-medium">Authors:</span> {pub.authors}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                <span className="font-medium">Journal:</span> {pub.journal}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                <span className="font-medium">Year:</span> {pub.year}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                <span className="font-medium">DOI:</span>{" "}
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {pub.doi}
                </a>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/publications"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Publications;
