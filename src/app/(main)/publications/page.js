// src/app/(main)/publications/page.js
import PublicationsList from "@/components/PublicationsList";
export const metadata = {
  title: 'Publication', // Tiêu đề này sẽ thay thế %s trong layout.js
};
export default function PublicationsPage() {
  const publicationsApiUrl = "https://your-api.com/api/publications"; 

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
      <PublicationsList url={publicationsApiUrl} />
    </div>
  );
}