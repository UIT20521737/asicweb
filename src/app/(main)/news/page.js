import ComingSoon from "@/components/ComingSoon";
import NewsList from '@/components/NewsList';
export const metadata = {
  title: "News",
   description: 'Catch up on the latest news and updates from our lab.',
};

export default function News() {
  const newsApiUrl = "https://your-api.com/api/news";
  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <NewsList url={newsApiUrl} />
    </div>
  );
}