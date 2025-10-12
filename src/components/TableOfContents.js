export default function TableOfContents({ headings }) {
  return (
    <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-primary">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li
            key={index}
            className={`hover:text-primary transition-colors ${
              heading.level === 'h1' ? 'font-bold text-base' :
              heading.level === 'h2' ? 'pl-4 font-medium text-sm' :
              'pl-8 text-sm'
            }`}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}