import React from "react";
import { Target, Heart, Users, BookOpen, Globe, Lightbulb, ChevronRight } from "lucide-react";

const AboutUs = () => {
  const fields = [
    {
      id: 1,
      title: "Education & Training",
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
      description:
        "Developing training programs to enhance capacity and professional skills.",
      activities: [
        "Professional training",
        "Scientific workshops",
        "Scholarship programs",
      ],
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
        "FPGA & Digital Design",
      ],
      color: "from-yellow-50 to-yellow-100 border-yellow-200",
    },
    {
      id: 3,
      title: "Community Development",
      icon: <Users className="w-6 h-6 text-green-600" />,
      description: "Building and fostering a sustainable professional community.",
      activities: [
        "Networking",
        "Volunteering activities",
        "Leadership development",
      ],
      color: "from-green-50 to-green-100 border-green-200",
    },
    {
      id: 4,
      title: "International Collaboration",
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      description: "Expanding partnerships with international organizations.",
      activities: ["Academic exchange", "Joint projects", "Exchange programs"],
      color: "from-blue-50 to-blue-100 border-blue-200",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* About Us Intro */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            About ASIC LAB
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            ASIC LAB is a research and development center specializing in{" "}
            <span className="font-medium text-indigo-600 dark:text-indigo-400">
              Application-Specific Integrated Circuits (ASIC)
            </span>
            . We are committed to advancing semiconductor technology through
            education, research, and collaboration with industry partners.
          </p>
        </div>

        

        {/* Vision - Mission - Core Values */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Vision */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 p-3 rounded-lg mr-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Vision
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              To become a leading organization in education development and
              scientific research, contributing to building a strong knowledge
              community and sustainable development in Vietnam and Southeast Asia
              by 2030.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="bg-green-600 p-3 rounded-lg mr-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Mission
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              We are committed to providing high-quality educational solutions,
              promoting applied scientific research, and building a professional
              community that creates positive values for society.
            </p>
          </div>

          {/* Core Values */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Core Values
            </h3>
            <div className="space-y-3">
              {[
                {
                  title: "Quality",
                  desc: "Commitment to delivering high-quality services and products",
                },
                {
                  title: "Innovation",
                  desc: "Continuously innovating and applying advanced technologies",
                },
                {
                  title: "Collaboration",
                  desc: "Building sustainable and effective partnerships",
                },
                {
                  title: "Responsibility",
                  desc: "Ensuring accountability to the community and the environment",
                },
              ].map((value, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-gray-900 dark:text-white font-medium">
                      {value.title}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">
                      {value.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fields of Activity & Research Directions */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Fields of Activity & Research Directions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We focus on education, advanced research, international
              collaboration, and community development, aiming to create
              sustainable values for science and society.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fields.map((field) => (
              <div key={field.id} className="group h-full">
                <div
                  className={`flex flex-col h-full bg-gradient-to-br ${field.color} p-6 rounded-xl hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border`}
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md">
                      {field.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {field.title}
                  </h3>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed flex-0">
                    {field.description}
                  </p>
                  <div className="space-y-2 flex-1">
                    {field.activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-800"
                      >
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
    </section>
  );
};

export default AboutUs;
