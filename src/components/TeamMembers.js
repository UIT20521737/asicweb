import React from 'react';
import Image from 'next/image';

const getInitials = (name) => {
  const parts = name.split(' ');
  return parts.length > 1 
    ? `${parts[parts.length - 2][0]}${parts[parts.length - 1][0]}`.toUpperCase() 
    : name.substring(0, 2).toUpperCase();
};

const PartnerCard = ({ partner }) => (
  <div className="group relative bg-white border border-gray-200 rounded-[2.5rem] p-10 w-full md:w-[320px] h-[220px] flex flex-col items-center justify-center transition-all duration-500 hover:border-[var(--color-primary)] hover:shadow-2xl hover:-translate-y-2 transform-gpu">
    <div className="relative z-10 w-full h-28 mb-4 transition-all duration-500 group-hover:scale-110">
      {partner.image ? (
        <Image 
          src={`${process.env.NEXT_PUBLIC_API_HOST}/api/files/${partner.image}`} 
          alt={partner.name} 
          fill 
          className="object-contain" 
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-4xl font-black text-gray-300 uppercase">{partner.name.substring(0,2)}</div>
      )}
    </div>
    <h3 className="relative z-10 text-[11px] font-black text-gray-600 uppercase tracking-[0.3em] transition-colors group-hover:text-[var(--color-primary)] text-center">
      {partner.name}
    </h3>
  </div>
);

async function fetchMembers() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/parties`, { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch data');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

export default async function TeamMembers() {
  const members = await fetchMembers();
  const partners = members.filter(m => m.role === 'PARTNER');
  const directors = members.filter(m => m.position === 'LaboratoryDirector');
  const officialStaff = members.filter(m => m.role === 'EMPLOYEE' && ['PrincipalResearcher', 'Researcher'].includes(m.position));
  const collaborators = members.filter(m => m.position === 'Collaborator');
  const interns = members.filter(m => m.position === 'Intern');

  const renderMember = (member) => {
    const isDirector = member.position === 'LaboratoryDirector';
    return (
      <div key={member._id} className={`flex flex-col items-center text-center group transition-all duration-300 ${isDirector ? 'w-48' : 'w-40'}`}>
        <div className={`relative mb-5 rounded-full transition-all duration-500 overflow-hidden shadow-md
          ${isDirector 
            ? 'w-28 h-28 border-[3px] border-[var(--color-primary)] ring-8 ring-gray-100' 
            : 'w-20 h-20 border-2 border-gray-200 group-hover:border-[var(--color-primary)]' }
          group-hover:-translate-y-2 group-hover:shadow-xl`}>
          
          {member.image ? (
            <Image 
              src={`${process.env.NEXT_PUBLIC_API_HOST}/api/files/${member.image}`} 
              alt={member.name} 
              fill 
              className="object-cover" 
            />
          ) : (
            <div className="w-full h-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-xl group-hover:text-[var(--color-primary)] transition-colors">
              {getInitials(member.name)}
            </div>
          )}
        </div>
        <h3 className={`font-black text-gray-900 transition-colors group-hover:text-[var(--color-primary)] uppercase tracking-tight ${isDirector ? 'text-sm' : 'text-[12px]'}`}>
          {member.name}
        </h3>
        {isDirector && (
          <span className="mt-2 px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-[9px] font-black uppercase tracking-widest">
            Director
          </span>
        )}
      </div>
    );
  };

  const SubGroupTitle = ({ children }) => (
    <div className="flex items-center justify-center gap-4 mb-12">
      <div className="h-[1px] flex-1 bg-gray-200"></div>
      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">{children}</h4>
      <div className="h-[1px] flex-1 bg-gray-200"></div>
    </div>
  );

  return (
    <section className="pt-4 pb-2 bg-white antialiased">
      <div className="max-w-7xl mx-auto px-6">
        
        {partners.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 text-center mb-16 uppercase tracking-tight">
              Strategic <span className="text-[var(--color-primary)]">Partnerships</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-10">
              {partners.map(p => <PartnerCard key={p._id} partner={p} />)}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 text-center mb-2 uppercase tracking-tight italic">Our Team</h2>
          <div className="flex flex-wrap justify-center gap-12 mb-">{directors.map(renderMember)}</div>
          <div className="space-y-24">
            {officialStaff.length > 0 && (<div><SubGroupTitle>Core Researchers</SubGroupTitle><div className="flex flex-wrap justify-center gap-x-8 gap-y-12">{officialStaff.map(renderMember)}</div></div>)}
            {collaborators.length > 0 && (<div><SubGroupTitle>External Collaborators</SubGroupTitle><div className="flex flex-wrap justify-center gap-x-8 gap-y-12">{collaborators.map(renderMember)}</div></div>)}
            {interns.length > 0 && (<div><SubGroupTitle>Research Interns</SubGroupTitle><div className="flex flex-wrap justify-center gap-x-8 gap-y-12">{interns.map(renderMember)}</div></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}