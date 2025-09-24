// components/ComingSoon.js
// Hoặc bạn có thể đặt nó trong pages/coming-soon.js nếu muốn nó là một trang riêng biệt

export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center min-h-screen  text-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto py-12">
        {/* Phần tiêu đề lớn với màu gradient */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text">Comin</span>
          <span className="bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">g</span>
          <br />
          <span className="bg-gradient-to-r from-green-600 to-green-400 text-transparent bg-clip-text">Soon</span>
          <span className="bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">!</span>
        </h1>

        {/* Thông báo phụ */}
        <p className="mt-8 text-lg text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
          We are trying to complete this page. Please come back later!
        </p>

        {/* Có thể thêm một biểu tượng hoặc ảnh nhỏ ở đây nếu muốn, ví dụ: */}
        {/* <div className="mt-8">
          <svg className="mx-auto h-16 w-16 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div> */}
      </div>
    </div>
  );
}