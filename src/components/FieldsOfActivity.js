import React from 'react';
import { ChevronRight, Users, BookOpen, Globe, Lightbulb } from 'lucide-react';

const FieldsOfActivity = () => {
  const fields = [
    {
      id: 1,
      title: "Education & Training",
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
      description: "Developing training programs to enhance capacity and professional skills.",
      activities: ["Professional training", "Scientific workshops", "Scholarship programs"],
      color: "from-indigo-50 to-indigo-100 border-indigo-200",
    },
    {
      id: 2,
      title: "Scientific Research",
      icon: <Lightbulb className="w-6 h-6 text-yellow-600" />,
      description: "Conducting applied and fundamental scientific research projects.",
      activities: [
        "Chip SoC (System on Chip)",
        "Embedded IoT",
        "ASIC Design",
        "VLSI (Very Large Scale Integration)",
        "FPGA & Digital Design"
      ],
      color: "from-yellow-50 to-yellow-100 border-yellow-200",
    },
    {
      id: 3,
      title: "Community Development",
      icon: <Users className="w-6 h-6 text-green-600" />,
      description: "Building and fostering a sustainable professional community.",
      activities: ["Networking", "Volunteering activities", "Leadership development"],
      color: "from-green-50 to-green-100 border-green-200",
    },
    {
      id: 4,
      title: "International Collaboration",
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      description: "Expanding partnerships with international organizations.",
      activities: ["Academic exchange", "Joint projects", "Exchange programs"],
      color: "from-blue-50 to-blue-100 border-blue-200",
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Fields of Activity & Research Directions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We focus on education, advanced research, international collaboration, and community development,
            aiming to create sustainable values for science and society.
          </p>
        </div>
        
        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {fields.map((field) => (
            <div key={field.id} className="group h-full">
              <div className={`flex flex-col h-full bg-gradient-to-br ${field.color} p-6 rounded-xl hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border`}>
                
                {/* Icon with circle background */}
                <div className="mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md">
                    {field.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{field.title}</h3>
                
                {/* Description */}
                <p className="text-gray-700 mb-4 text-sm leading-relaxed flex-0">{field.description}</p>
                
                {/* Activities */}
                <div className="space-y-2 flex-1">
                  {field.activities.map((activity, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-800">
                      <ChevronRight className="w-3 h-3 mr-2 text-gray-500" />
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldsOfActivity;
