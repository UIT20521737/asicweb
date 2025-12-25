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

async function fetchMembers() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/parties`, {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch data');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
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
      <section className="py-6 px-4 bg-gray-50 dark:bg-gray-900 text-center text-red-600">
        Error: {error}
      </section>
    );
  }

  const partners = members.filter(m => m.role === 'PARTNER');
  const directors = members.filter(m => m.position === 'LaboratoryDirector');
  const officialStaff = members.filter(m => m.role === 'EMPLOYEE' && ['PrincipalResearcher', 'Researcher'].includes(m.position));
  const collaborators = members.filter(m => m.position === 'Collaborator');
  const interns = members.filter(m => m.position === 'Intern');

  const renderMember = (member) => {
    const hasImage = !!member.image;
    const initials = !hasImage ? getInitials(member.name) : '';
    const isDirector = member.position === 'LaboratoryDirector';

    return (
      <div key={member._id} className="flex flex-col items-center text-center w-40 flex-shrink-0">
        <div className={`relative mb-2 rounded-full overflow-hidden border-2 
          ${isDirector ? 'w-28 h-28 border-indigo-600 border-4' : 'w-20 h-20 border-indigo-400'}`}>
          {hasImage ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_HOST}/api/files/${member.image}`}
              alt={member.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-indigo-500 text-white font-bold text-xl">
              {initials}
            </div>
          )}
        </div>
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 px-2 line-clamp-1">{member.name}</h3>
        <p className={`text-[10px] mt-0.5 ${isDirector ? 'font-black text-indigo-600 uppercase' : 'text-gray-500'}`}>
          {member.position === "PrincipalResearcher" ? "Principal Researcher" : member.position}
        </p>
      </div>
    );
  };

  const renderPartner = (partner) => (
    <div key={partner._id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center w-64 h-40 shadow-sm">
      <div className="relative w-full h-20">
        {partner.image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_HOST}/api/files/${partner.image}`}
            alt={partner.name}
            fill
            className="object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-300 font-bold rounded-lg border border-dashed border-gray-200 text-2xl">
            {partner.name.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <h3 className="mt-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-tight text-center line-clamp-1">
        {partner.name}
      </h3>
    </div>
  );

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        
        {/* I. STRATEGIC PARTNERSHIPS */}
        {partners.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Strategic Partnerships
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {partners.map(renderPartner)}
            </div>
          </div>
        )}

        {/* II. OUR TEAM SECTION */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Our Team
          </h2>

          {/* Directors */}
          <div className="flex flex-wrap justify-center gap-10 mb-12">
            {directors.map(renderMember)}
          </div>

          {/* Sub-groups */}
          <div className="space-y-12">
            {officialStaff.length > 0 && (
              <div>
                <h4 className="text-center text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-6">Core Researchers</h4>
                <div className="flex flex-wrap justify-center gap-8">{officialStaff.map(renderMember)}</div>
              </div>
            )}
            
            {collaborators.length > 0 && (
              <div>
                <h4 className="text-center text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-6">External Collaborators</h4>
                <div className="flex flex-wrap justify-center gap-8">{collaborators.map(renderMember)}</div>
              </div>
            )}

            {interns.length > 0 && (
              <div>
                <h4 className="text-center text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-6">Research Interns</h4>
                <div className="flex flex-wrap justify-center gap-8">{interns.map(renderMember)}</div>
              </div>
            )}
          </div>
        </div>

        {members.length === 0 && (
          <p className="text-center text-gray-400 italic py-10">No records found.</p>
        )}
      </div>
    </section>
  );
}