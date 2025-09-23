import React from 'react';
import Image from 'next/image';

const getInitials = (name) => {
  const parts = name.split(' ');
  if (parts.length > 1) {
    const firstInitial = parts[parts.length - 2][0];
    const secondInitial = parts[parts.length - 1][0];
    return `${firstInitial}${secondInitial}`;
  } else if (parts.length === 1) {
    return parts[0].substring(0, 2);
  }
  return '';
};

const teamMembers = [
  {
    name: "Dr. Nguyen Minh Son",
    title: "Laboratory Director",
    imageUrl: "/images/Nguyen-Minh-Son.bak.png",
    category: "Director",
  },
  {
    name: "MSc. Ta Tri Duc",
    title: "Principal Researcher",
    imageUrl: "/images/Ta-Tri-Duc.bak.png",
    category: "Member",
  },
  {
    name: "BSc. Nguyen Thanh Phat",
    title: "Researcher",
    imageUrl: "/images/placeholder-phat.png",
    category: "Member",
  },
  {
    name: "BSc. Tran Quoc Thinh",
    title: "Researcher",
    imageUrl: "/images/placeholder-thinh.png",
    category: "Member",
  },
  {
    name: "BSc. PHAM CAN LONG",
    title: "Collaborator",
    imageUrl: "/images/placeholder-hung.png",
    category: "Member",
  },
  {
    name: "BSc. PHAN DUY",
    title: "Collaborator",
    imageUrl: "/images/placeholder-mai.png",
    category: "Member",
  },
];

export default function TeamMembers() {
  const categories = [
    { name: "Director", members: teamMembers.filter(m => m.category === "Director") },
    { name: "Members", members: teamMembers.filter(m => m.category !== "Director") }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">
            Our Team
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Meet the dedicated experts leading research and development at ASIC LAB.
          </p>
        </div>

        {categories.map((category, index) => (
          <div key={index} className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-8">
              {category.name}
            </h3>

            <div className="flex flex-wrap justify-center gap-6">
              {category.members.map((member, memberIndex) => {
                const isPlaceholderImage = member.imageUrl.startsWith('/images/placeholder-');
                const initials = isPlaceholderImage ? getInitials(member.name) : '';

                return (
                  <div
                    key={memberIndex}
                    className="group flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-[200px]"
                  >
                    <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-indigo-500 dark:border-indigo-400 transition-transform duration-300 group-hover:scale-105">
                      {isPlaceholderImage ? (
                        <div className="text-4xl font-bold text-white bg-indigo-600 dark:bg-indigo-500 w-full h-full flex items-center justify-center">
                          {initials}
                        </div>
                      ) : (
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {member.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
