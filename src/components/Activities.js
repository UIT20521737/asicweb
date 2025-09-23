import Link from 'next/link';

const Activities = () => {
  const activities = [
    { id: 1, title: "ASIC Design Workshop 2025", date: "September 15, 2025", description: "An in-depth workshop on advanced ASIC design trends." },
    { id: 2, title: "Basic Verilog Course", date: "September 1, 2025", description: "A hands-on course for students to learn Verilog programming." },
    { id: 3, title: "AI on FPGA Research Project", date: "August 20, 2025", description: "Collaboration with industry partners to deploy AI on FPGA." },
    { id: 4, title: "Seminar on 5nm Technology", date: "August 10, 2025", description: "Discussion on the latest advancements in 5nm semiconductor technology." },
    { id: 5, title: "ASIC Design Competition", date: "July 25, 2025", description: "A competition for students passionate about ASIC design." },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Latest Activities of ASIC LAB
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{activity.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{activity.date}</p>
              <p className="text-gray-600 flex-grow">{activity.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/activities"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Activities;
