// components/PublicationsList.js
import React from "react";

// Fetch publications từ server
async function fetchPublications() {
  const res = await fetch("https://asicportal.longpc.xyz/api/publications", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch publications");
  return res.json();
}

export default async function PublicationsList() {
  const publications = await fetchPublications();

  // Sắp xếp theo year giảm dần
  const sorted = publications.sort((a, b) => b.year - a.year);

  // Nhóm theo year
  const groupedByYear = sorted.reduce((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">
        Our Publications
      </h1>

      {Object.keys(groupedByYear).map((year) => (
        <div key={year}>
          <h2 className="text-3xl font-bold mb-6 mt-8 text-foreground">{year}</h2>
          <div className="space-y-6">
            {groupedByYear[year].map((pub) => (
              <div
                key={pub._id}
                className="rounded-lg p-6 shadow-md transition-transform transform hover:scale-[1.01]"
                style={{ backgroundColor: "var(--color-card)" }}
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                  {pub.title}
                </h3>

                <p className="text-sm text-foreground/75 mb-1">
                  <span className="font-medium">Authors:</span> {pub.members}
                </p>
                <p className="text-sm text-foreground/75 mb-1">
                  <span className="font-medium">Source:</span> {pub.venueName || "—"}
                </p>
                {pub.type && (
                  <p className="text-sm text-foreground/75 mb-2">
                    <span className="font-medium">Type:</span> {pub.type}
                  </p>
                )}
                {pub.doi && (
                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-primary hover:underline text-sm font-medium mt-2"
                  >
                    View Publication →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
