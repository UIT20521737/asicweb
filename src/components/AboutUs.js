import React from "react";
import {
  Target,
  Heart,

} from "lucide-react";



const AboutUs = () => {
  return (
    <section className="py-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
            ASIC <span className="text-indigo-600 dark:text-indigo-400">LAB</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            ASIC LAB is a <span className="font-semibold text-indigo-600 dark:text-indigo-400">research and development center</span> specializing in <span className="font-semibold text-indigo-600 dark:text-indigo-400">Application-Specific Integrated Circuits (ASIC)</span>. We advance semiconductor technology through education, research, and global collaboration.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;