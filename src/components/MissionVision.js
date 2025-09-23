// components/MissionVision.jsx
import React from "react";
import { Target, Heart } from "lucide-react";

const coreValues = [
  { title: "Quality", desc: "Delivering high-quality services and products" },
  { title: "Innovation", desc: "Continuously innovating and applying advanced technologies" },
  { title: "Collaboration", desc: "Building sustainable and effective partnerships" },
  { title: "Responsibility", desc: "Ensuring accountability to the community and environment" },
];

const MissionVision = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Vision */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-4 flex flex-col justify-between h-full hover:shadow-lg transition transform hover:-translate-y-0.5">
          <div>
            <div className="flex items-center mb-3">
              <div className="p-3 rounded-lg mr-3 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-blue-400 pb-1">
                Vision
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              To become a leading organization in education development and scientific research, building a strong knowledge community by 2030.
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-4 flex flex-col justify-between h-full hover:shadow-lg transition transform hover:-translate-y-0.5">
          <div>
            <div className="flex items-center mb-3">
              <div className="p-3 rounded-lg mr-3 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-green-400 pb-1">
                Mission
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              Providing high-quality educational solutions, promoting applied research, and building a professional community that creates positive values for society.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-4 flex flex-col justify-between h-full hover:shadow-lg transition transform hover:-translate-y-0.5">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-indigo-400 pb-1">
              Core Values
            </h3>
            <div className="space-y-3">
              {coreValues.map((v, i) => (
                <div key={i} className="flex items-start space-x-2 hover:bg-indigo-50 dark:hover:bg-gray-700 p-2 rounded transition">
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
      </div>
    </div>
  );
};

export default MissionVision;
