import Link from 'next/link';

export const metadata = {
    title: "404 - Page Not Found | ASICLab",
    description: "The page you are looking for does not exist on ASICLab's website.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background dark:bg-background text-foreground px-4 py-12">
      <div className="max-w-xl text-center">
        {/* Phần chữ 'Oops!' lớn với hiệu ứng gradient/vũ trụ */}
        <h1 
          className="text-7xl sm:text-8xl md:text-9xl font-extrabold mb-6 
                     bg-gradient-to-r from-primary via-accent to-primary-hover
                     text-transparent bg-clip-text animate-gradient-shift"
        >
          Something went wrong!
        </h1>

        {/* Thông báo 404 */}
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          404 - Page Not Found
        </h2>
        
        {/* Mô tả chi tiết */}
        <p className="mt-4 text-green-800 max-w-md mx-auto">
          We couldn&apos;t find the page you were looking for. It might have been moved, deleted, or the link you followed was incorrect.
        </p>
        
        {/* Nút quay về trang chủ */}
        <Link 
          href="/" 
          className="mt-10 inline-flex items-center justify-center px-8 py-4 
                     bg-primary hover:bg-primary-hover text-white font-semibold 
                     rounded-full shadow-lg transition-all duration-300 ease-in-out 
                     transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}