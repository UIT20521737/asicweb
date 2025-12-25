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
      window.history.pushState({}, '', `#${headingId}`);
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  if (!headings || headings.length === 0) return null;

  return (
    <div className="w-full">
      <ul className="space-y-3">
        {headings.map((heading, index) => (
          <li
            key={index}
            style={{ 
              paddingLeft: heading.level === 'h1' ? '0' : 
                          heading.level === 'h2' ? '0.75rem' : '1.5rem' 
            }}
            className="group flex items-start"
          >
            <a 
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`
                block w-full truncate text-[12px] leading-relaxed transition-all duration-200
                text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary
                ${heading.level === 'h1' ? 'font-bold' : 'font-medium'}
              `}
              title={heading.text}
            >
              <span className="opacity-0 group-hover:opacity-100 mr-1.5 text-primary transition-opacity inline-block w-2 font-bold">
                #
              </span>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}