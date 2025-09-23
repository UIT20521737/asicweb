// components/TeamMembers.js

import React from 'react';
import Image from 'next/image';

const getInitials = (name) => {
  const parts = name.split(' ');
  if (parts.length > 1) {
    // Lấy chữ cái đầu tiên của từ cuối cùng và từ áp chót (ví dụ: TẠ TRÍ ĐỨC -> TĐ)
    const firstInitial = parts[parts.length - 2][0];
    const secondInitial = parts[parts.length - 1][0];
    return `${firstInitial}${secondInitial}`;
  } else if (parts.length === 1) {
    // Nếu chỉ có một từ, lấy 2 chữ cái đầu tiên
    return parts[0].substring(0, 2);
  }
  return '';
};

const teamMembers = [
    {
    name: "TS. NGUYỄN MINH SƠN",
    title: "Trưởng phòng thí nghiệm",
    imageUrl: "/images/Nguyen-Minh-Son.bak.png", // Ảnh có sẵn
  },
  {
    name: "Ths. TẠ TRÍ ĐỨC",
    title: "Nghiên cứu viên chinh",
    imageUrl: "/images/Ta-Tri-Duc.bak.png", // Ảnh có sẵn
  },
  {
    name: "CN. NGUYỄN THÀNH PHÁT",
    title: "Nghiên cứu viên",
    imageUrl: "/images/placeholder-phat.png", // Sẽ hiển thị "TP" (Thành Phát)
  },
  {
    name: "CN. TRẦN QUỐC THỊNH",
    title: "Nghiên cứu viên",
    imageUrl: "/images/placeholder-thinh.png", // Sẽ hiển thị "QT" (Quốc Thịnh)
  },
];

export default function TeamMembers() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary">
            Đội ngũ của chúng tôi
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Gặp gỡ những chuyên gia dẫn đầu trong lĩnh vực của chúng tôi.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => {
            const isPlaceholderImage = member.imageUrl.startsWith('/images/placeholder-');
            const initials = isPlaceholderImage ? getInitials(member.name) : '';

            return (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-lg">
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-indigo-500 dark:border-indigo-400 flex items-center justify-center">
                  {isPlaceholderImage ? (
                    <div className="text-5xl font-bold text-white bg-indigo-600 dark:bg-indigo-500 w-full h-full flex items-center justify-center">
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