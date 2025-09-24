import { BookOpen, Users, Globe, ChevronRight } from "lucide-react";

const supportingActivities = [
  {
    id: 1,
    title: "Education & Training",
    icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
    items: ["Professional training", "Scientific workshops", "Scholarship programs"],
  },
  {
    id: 2,
    title: "Community & Collaboration",
    icon: <Users className="w-6 h-6 text-green-600" />,
    items: ["Networking", "Volunteering activities", "Leadership development"],
  },
  {
    id: 3,
    title: "International Partnerships",
    icon: <Globe className="w-6 h-6 text-blue-600" />,
    items: ["Academic exchange", "Joint projects", "Exchange programs"],
  },
];

const SupportingActivities = () => {
  return (
   <section className="py-8 pb-12 dark:bg-gray-900">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    {/* Header */}
   <div className="text-center mb-12">
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
    Supporting Activities
  </h2>
  <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-2 text-sm sm:text-base leading-relaxed">
    Education, community, and international collaboration activities that support our research.
  </p>
</div>

    {/* Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
      {supportingActivities.map((activity) => (
        <div
          key={activity.id}
          className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md mr-4">
              {activity.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{activity.title}</h3>
          </div>
          <ul className="space-y-2 mt-2">
            {activity.items.map((item, index) => (
              <li key={index} className="flex items-center text-gray-800 dark:text-gray-200 text-sm">
                <ChevronRight className="w-3 h-3 mr-2 text-gray-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default SupportingActivities;
