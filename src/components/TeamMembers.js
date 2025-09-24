// components/TeamMembers.js

import React from 'react';
import Image from 'next/image';

const getInitials = (name) => {
  const parts = name.split(' ');
  if (parts.length > 1) {
    // Get the first letters of the last and second-to-last words (e.g., TRACY DUC -> TD)
    const firstInitial = parts[parts.length - 2][0];
    const secondInitial = parts[parts.length - 1][0];
    return `${firstInitial}${secondInitial}`;
  } else if (parts.length === 1) {
    // If there's only one word, get the first two letters
    return parts[0].substring(0, 2);
  }
  return '';
};

const teamMembers = [
  {
    name: "Dr. NGUYEN MINH SON",
    title: "Head of Laboratory",
    imageUrl: "/images/Nguyen-Minh-Son.bak.png", // Existing photo
  },
  {
    name: "M.Eng. TA TRI DUC",
    title: "Principal Researcher",
    imageUrl: "/images/Ta-Tri-Duc.bak.png", // Existing photo
  },
  {
    name: "B.Eng. NGUYEN THANH PHAT",
    title: "Researcher",
    imageUrl: "/images/placeholder-phat.png", // Displays "TP" (Thanh Phat)
  },
  {
    name: "B.Eng. TRAN QUOC THINH",
    title: "Researcher",
    imageUrl: "/images/placeholder-thinh.png", // Displays "QT" (Quoc Thinh)
  },
];

export default function TeamMembers() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary">
        Our Team
        </h2>
        <p className="mt-4 sm:mt-6 text-xl sm:text-2xl text-primary-light">
          We are a mission-driven team of engineers and researchers committed to advancing technology. Specializing in IC & SoC design and AIoT applications, we create efficient, reliable solutions. Our passion for innovation fuels our work, as we strive to turn groundbreaking ideas into impactful products for the community.
        </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => {
            const isPlaceholderImage = member.imageUrl.startsWith('/images/placeholder-');
            const initials = isPlaceholderImage ? getInitials(member.name) : '';

            return (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-lg">
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-green-500 dark:border-green-400 flex items-center justify-center">
                  {isPlaceholderImage ? (
                    <div className="text-5xl font-bold text-white bg-green-600 dark:bg-green-500 w-full h-full flex items-center justify-center">
                      {initials}
                    </div>
                  ) : (
                    <Image 
                      src={member.imageUrl}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-primary">
                  {member.name}
                </h3>
                <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
                  {member.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}