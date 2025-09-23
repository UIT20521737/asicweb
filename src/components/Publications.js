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
    <section style={{
      padding: '4rem 2rem',
      backgroundColor: '#f9fafb',
      textAlign: 'center',
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        fontWeight: 700,
        color: '#1f2937',
        marginBottom: '2rem',
      }}>Published Papers</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {publications.slice(0, 5).map((pub) => (
          <div key={pub.id} style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#1f2937',
              marginBottom: '0.5rem',
            }}>{pub.title}</h3>
            <p style={{
              fontSize: '1rem',
              color: '#4b5563',
              margin: '0.25rem 0',
            }}>Authors: {pub.authors}</p>
            <p style={{
              fontSize: '1rem',
              color: '#4b5563',
              margin: '0.25rem 0',
            }}>Journal: {pub.journal}</p>
            <p style={{
              fontSize: '1rem',
              color: '#4b5563',
              margin: '0.25rem 0',
            }}>Year: {pub.year}</p>
            <p style={{
              fontSize: '1rem',
              color: '#4b5563',
              margin: '0.25rem 0',
            }}>
              DOI: <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{
                color: '#2563eb',
                textDecoration: 'none',
              }}>{pub.doi}</a>
            </p>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: '2rem',
      }}>
        <Link href="/publications" style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: 500,
        }}>View More</Link>
      </div>
    </section>
  );
};

export default Publications;
