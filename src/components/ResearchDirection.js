import { Cpu, Network, CircuitBoard, Layers, Binary } from "lucide-react";

const researchAreas = [
  {
    id: 1,
    title: "System-on-Chip (SoC)",
    description:
      "Design and development of integrated systems on a single chip, focusing on energy efficiency and performance optimization.",
    icon: Cpu,
  },
  {
    id: 2,
    title: "Embedded IoT",
    description:
      "Development of embedded systems for IoT, including smart devices, sensors, and connected networks.",
    icon: Network,
  },
  {
    id: 3,
    title: "ASIC Design",
    description:
      "Application-specific integrated circuit (ASIC) design, from RTL to verification and fabrication for tailored solutions.",
    icon: CircuitBoard,
  },
  {
    id: 4,
    title: "VLSI",
    description:
      "Very Large-Scale Integration with millions of transistors, focusing on layout, testing, and simulation to enhance chip performance.",
    icon: Layers,
  },
  {
    id: 5,
    title: "FPGA & Digital Design",
    description:
      "FPGA prototyping and digital system design for signal processing, computer architecture, and reconfigurable systems.",
    icon: Binary,
  },
];

const ResearchDirections = () => {
  return (
    <section className="py-16 bg-white" id="research">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Research Areas
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((area) => (
            <div
              key={area.id}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
                <area.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {area.title}
              </h3>
              <p className="text-gray-600 text-sm">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchDirections;
