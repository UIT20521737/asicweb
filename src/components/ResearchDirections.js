import React from "react";
import { Cpu, Network, CircuitBoard, Layers, Binary } from "lucide-react";

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

const ResearchDirections = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Research Directions
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-2 text-sm sm:text-base leading-relaxed">
          ASIC LAB focuses on cutting-edge research areas in chip design and embedded systems.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {researchAreas.map((area) => (
          <div
            key={area.id}
            className={`flex flex-col h-full bg-gradient-to-br ${area.color} p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition transform hover:-translate-y-0.5`}
          >
            {/* Icon */}
            <div className="mb-4">
              <div className="w-16 h-16 flex items-center justify-center bg-white shadow-md rounded-full mx-auto">
                <area.icon className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              {area.title}
            </h3>
            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed text-center flex-1">
              {area.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchDirections;
