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

// Hàm lấy dữ liệu từ API /api/parties (server-side)
async function fetchMembers() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/parties`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách nhân viên');
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi lấy danh sách:', error);
    throw error;
  }
}

export default async function TeamMembers() {
  let members = [];
  let error = null;

  try {
    members = await fetchMembers();
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-600 dark:text-red-400">Lỗi: {error}</p>
        </div>
      </section>
    );
  }

  // Lọc dựa trên position
  const directors = members.filter(m => m.position === 'LaboratoryDirector');
  const otherMembers = members.filter(m => m.position !== 'LaboratoryDirector');

  const renderMember = (member) => {
    const hasImage = !!member.image;
    const initials = !hasImage ? getInitials(member.name) : '';

    const avatarClasses = member.position === 'LaboratoryDirector'
      ? 'relative w-28 h-28 mb-3 rounded-full overflow-hidden border-4 border-indigo-600 flex-shrink-0'
      : 'relative w-24 h-24 mb-3 rounded-full overflow-hidden border-2 border-indigo-400 flex-shrink-0';

    const titleClasses = member.position === 'LaboratoryDirector'
      ? 'text-sm font-medium text-indigo-600 dark:text-indigo-400'
      : 'text-sm text-gray-600 dark:text-gray-400';

    return (
      <div key={member._id} className="flex flex-col items-center text-center w-44 flex-shrink-0">
        <div className={avatarClasses}>
          {hasImage ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_HOST}/api/files/${member.image}`}
              alt={member.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-indigo-500 dark:bg-indigo-600 text-white font-bold text-2xl">
              {initials}
            </div>
          )}
        </div>

        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 w-full truncate">
          {member.name}
        </h3>
        <p className={titleClasses}>
          {member.position === "PrincipalResearcher"
            ? "Principal Researcher"
            : member.position}
        </p>
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
          {directors.length > 0 ? (
            directors.map(renderMember)
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Không có giám đốc nào.</p>
          )}
        </div>

        {/* Members Row */}
        <div className="flex flex-wrap justify-center gap-8">
          {otherMembers.length > 0 ? (
            [...otherMembers].reverse().map(renderMember)
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Không có thành viên nào.
            </p>
          )}
        </div>

      </div>
    </section>
  );
}