export default function AboutUs() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
   <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary">
    About Us
</h2>
<p className="mt-4 sm:mt-6 text-xl sm:text-2xl text-primary-light">
    Our team is on a mission to pioneer groundbreaking solutions in IC & SoC design and AIoT applications. Through relentless effort, we're building a smarter world, one tangible product at a time.
</p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: IC & SoC Design */}
          <div className="bg-background rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center items-center h-12 w-12 rounded-md bg-indigo-500 text-primary mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9h2m-2 6h2m14-6h2m-2 6h2M3 9a1 1 0 011-1h16a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-center text-primary ">
              IC & SoC Design
            </h3>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              We pioneer the art of Integrated Circuit (IC) and System on Chip (SoC) design, delving into the intricacies of architecture, RTL, physical design, and meticulous verification to forge tomorrow's technology.
            </p>
          </div>

          {/* Card 2: AIoT and its Applications */}
          <div className="bg-background rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center items-center h-12 w-12 rounded-md bg-teal-500 text-white mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-center text-primary ">
              AIoT and Applications
            </h3>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              By seamlessly merging the power of Artificial Intelligence (AI) with the Internet of Things (IoT), we engineer intelligent, highly efficient solutions that are revolutionizing industries, smart homes, and beyond.
            </p>
          </div>

          {/* Card 3: Research & Development */}
          <div className="bg-background rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center items-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-center text-primary">
              Research & Innovation
            </h3>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              We stand at the forefront of technology with our relentless commitment to R&D, fueling a culture of innovation that drives advancements in chip design and creates groundbreaking AIoT solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}