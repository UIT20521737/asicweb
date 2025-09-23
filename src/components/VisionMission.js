import React from 'react';
import { Target, Heart } from 'lucide-react';

const VisionMission = () => {
  return (
    <div className="bg-gray-50 py-16 relative">
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Vision */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-3 rounded-lg mr-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To become a leading organization in education development and scientific research, 
                contributing to building a strong knowledge community and sustainable development 
                in Vietnam and the Southeast Asia region by 2030.
              </p>
            </div>
            
            {/* Mission */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="bg-green-600 p-3 rounded-lg mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We are committed to providing high-quality educational solutions, 
                promoting applied scientific research, and building a professional 
                community that creates positive values for society.
              </p>
            </div>
          </div>
          
          {/* Core Values */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Core Values</h4>
              <div className="space-y-4">
                {[
                  { title: "Quality", desc: "Commitment to delivering high-quality services and products" },
                  { title: "Innovation", desc: "Continuously innovating and applying advanced technologies" },
                  { title: "Collaboration", desc: "Building sustainable and effective partnerships" },
                  { title: "Responsibility", desc: "Ensuring accountability to the community and the environment" }
                ].map((value, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-gray-900 font-medium">{value.title}</div>
                      <div className="text-gray-600 text-sm">{value.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
