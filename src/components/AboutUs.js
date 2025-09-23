import React from "react";
import {
  Target,
  Heart,
  Users,
  Globe,
  Cpu,
  Network,
  CircuitBoard,
  Layers,
  Binary,
} from "lucide-react";

const researchAreas = [
  {
    id: 1,
    title: "System-on-Chip (SoC)",
    description:
      "Design and development of integrated systems on a single chip, focusing on energy efficiency and performance optimization.",
    icon: Cpu,
    color: "from-yellow-50 to-yellow-100 border-yellow-200",
  },
  {
    id: 2,
    title: "Embedded IoT",
    description:
      "Development of embedded systems for IoT, including smart devices, sensors, and connected networks.",
    icon: Network,
    color: "from-indigo-50 to-indigo-100 border-indigo-200",
  },
  {
    id: 3,
    title: "ASIC Design",
    description:
      "Application-specific integrated circuit (ASIC) design, from RTL to verification and fabrication for tailored solutions.",
    icon: CircuitBoard,
    color: "from-red-50 to-red-100 border-red-200",
  },
  {
    id: 4,
    title: "VLSI",
    description:
      "Very Large-Scale Integration with millions of transistors, focusing on layout, testing, and simulation to enhance chip performance.",
    icon: Layers,
    color: "from-green-50 to-green-100 border-green-200",
  },
  {
    id: 5,
    title: "FPGA & Digital Design",
    description:
      "FPGA prototyping and digital system design for signal processing, computer architecture, and reconfigurable systems.",
    icon: Binary,
    color: "from-blue-50 to-blue-100 border-blue-200",
  },
];



const AboutUs = () => {
  return (
    <section className="py-16 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            ASIC LAB
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            ASIC LAB is a research and development center specializing in{" "}
            <span className="font-medium text-indigo-600 dark:text-indigo-400">
              Application-Specific Integrated Circuits (ASIC)
            </span>
            . We advance semiconductor technology through education, research, and collaboration.
          </p>
        </div>

        {/* Vision / Mission / Core Values */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 p-3 rounded-lg mr-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Vision</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              To become a leading organization in education development and scientific research, building a strong knowledge community by 2030.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="bg-green-600 p-3 rounded-lg mr-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mission</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Providing high-quality educational solutions, promoting applied research, and building a professional community that creates positive values for society.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Core Values</h3>
            <div className="space-y-3">
              {[
                { title: "Quality", desc: "Delivering high-quality services and products" },
                { title: "Innovation", desc: "Continuously innovating and applying advanced technologies" },
                { title: "Collaboration", desc: "Building sustainable and effective partnerships" },
                { title: "Responsibility", desc: "Ensuring accountability to the community and environment" },
              ].map((v, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="text-gray-900 dark:text-white font-medium">{v.title}</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Research Directions */}
        <div className="">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Research Directions</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              ASIC LAB focuses on cutting-edge research areas in chip design and embedded systems.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {researchAreas.map((area) => (
              <div
                key={area.id}
                className={`flex flex-col h-full bg-gradient-to-br ${area.color} p-6 rounded-xl hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border`}
              >
                <div className="mb-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-white shadow-md rounded-full mx-auto">
                    <area.icon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{area.title}</h3>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed text-center">{area.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
