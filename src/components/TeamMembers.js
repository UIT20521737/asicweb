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
  const directors = teamMembers.filter(m => m.category === "Director");
  const members = teamMembers.filter(m => m.category !== "Director");

  const renderMember = (member) => {
    const isPlaceholderImage = member.imageUrl.startsWith('/images/placeholder-');
    const initials = isPlaceholderImage ? getInitials(member.name) : '';

    const avatarClasses = member.category === "Director"
      ? "relative w-28 h-28 mb-3 rounded-full overflow-hidden border-4 border-indigo-600 flex-shrink-0"
      : "relative w-24 h-24 mb-3 rounded-full overflow-hidden border-2 border-indigo-400 flex-shrink-0";

    const titleClasses = member.category === "Director"
      ? "text-sm font-medium text-indigo-600 dark:text-indigo-400"
      : "text-sm text-gray-600 dark:text-gray-400";

    return (
      <div key={member.name} className="flex flex-col items-center text-center w-44 flex-shrink-0">
        <div className={avatarClasses}>
          {isPlaceholderImage ? (
            <div className="w-full h-full flex items-center justify-center bg-indigo-500 dark:bg-indigo-600 text-white font-bold text-2xl">
              {initials}
            </div>
          ) : (
            <Image
              src={member.imageUrl}
              alt={member.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 w-full truncate">
          {member.name}
        </h3>
        <p className={titleClasses}>{member.title}</p>
      </div>
    );
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">
            Our Team
          </h2>
         
        </div>

        {/* Director Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {directors.map(renderMember)}
        </div>

        {/* Members Row */}
        <div className="flex flex-wrap justify-center gap-8">
          {members.map(renderMember)}
        </div>
      </div>
    </section>
  );
}
