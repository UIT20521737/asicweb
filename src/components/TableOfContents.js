'use client';

import { useEffect } from 'react';

export default function TableOfContents({ headings }) {
  const handleClick = (e, headingId) => {
    e.preventDefault();
    
    const element = document.getElementById(headingId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Cập nhật URL SAU KHI scroll (quan trọng!)
      window.history.pushState({}, '', `#${headingId}`);
    }
  };

  // Xử lý khi load trang với hash có sẵn
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-primary">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li
            key={index}
            className={`hover:text-primary transition-colors cursor-pointer ${
              heading.level === 'h1' ? 'font-bold text-base' :
              heading.level === 'h2' ? 'pl-4 font-medium text-sm' :
              'pl-8 text-sm'
            }`}
          >
            <a 
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className="block hover:underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}