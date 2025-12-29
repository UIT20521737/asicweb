import LabActivitiesClient from './LabActivitiesClient';

export default function LabActivitiesPublic({ initialActivities }) {
  return (
    // Sử dụng pt-0 để sát mép trên cùng của border-t
    <div className="bg-[#FBFBFC] font-sans text-slate-900 pb-12 border-t border-slate-100">
      {/* Giảm py-12 xuống pt-4 để tiêu đề sát lên trên hơn */}
      <section className="pt-4 pb-12 px-6 max-w-[1400px] mx-auto text-center">
        <div className="flex flex-col items-center mb-2"> 
          {/* Tiêu đề gọn, giảm margin-bottom (mb-6 xuống mb-2) */}
          <h1 className="text-3xl md:text-5xl font-bold text-slate-950 tracking-tight mb-2">
            Lab Moments
          </h1>

          <LabActivitiesClient activities={initialActivities} />
        </div>
      </section>
    </div>
  );
}