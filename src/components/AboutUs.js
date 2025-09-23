
export default function AboutUs() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            Về chúng tôi
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Khám phá các nguyên tắc cốt lõi của Thiết kế IC, SoC và ứng dụng AIoT.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Thiết kế IC & SoC */}
          <div className="bg-background rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center items-center h-12 w-12 rounded-md bg-indigo-500 text-primary mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9h2m-2 6h2m14-6h2m-2 6h2M3 9a1 1 0 011-1h16a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-center text-primary ">
              Thiết kế IC & SoC
            </h3>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Đi sâu vào các nguyên tắc và phương pháp luận cho việc thiết kế mạch tích hợp (IC) và hệ thống trên chip (SoC), bao gồm kiến trúc, RTL, vật lý và xác minh.
            </p>
          </div>

          {/* Card 2: AIoT */}
          <div className="bg-background rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center items-center h-12 w-12 rounded-md bg-teal-500 text-white mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-center text-primary ">
              AIoT và Ứng dụng
            </h3>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Kết hợp trí tuệ nhân tạo (AI) với Internet of Things (IoT) để tạo ra các giải pháp thông minh, hiệu quả. Chúng tôi khám phá các ứng dụng trong công nghiệp, nhà thông minh, và hơn thế nữa.
            </p>
          </div>

          {/* Card 3: Nghiên cứu & Phát triển */}
          <div className="bg-background rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center items-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-center text-primary">
              Nghiên cứu & Đổi mới
            </h3>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Luôn đi đầu trong công nghệ với nỗ lực R&D liên tục của chúng tôi, thúc đẩy sự đổi mới trong lĩnh vực thiết kế chip và các giải pháp AIoT tiên tiến.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
