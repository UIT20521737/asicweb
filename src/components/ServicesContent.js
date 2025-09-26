"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchShortCourses, fetchLabEquipment, fetchInternshipLink } from '@/data/services';

export default function ServicesContent() {
  const [activeTab, setActiveTab] = useState('courses');
  const [data, setData] = useState({ shortCourses: null, labEquipment: null, internshipLink: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      if (activeTab === 'courses') {
        const courses = await fetchShortCourses();
        setData(prev => ({ ...prev, shortCourses: courses }));
      } else if (activeTab === 'equipment') {
        const equipment = await fetchLabEquipment();
        setData(prev => ({ ...prev, labEquipment: equipment }));
      } else if (activeTab === 'internship') {
        const internship = await fetchInternshipLink();
        setData(prev => ({ ...prev, internshipLink: internship }));
      }

      setIsLoading(false);
    };

    loadData();
  }, [activeTab]);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8 text-primary">Our Services</h1>

      {/* Tab buttons */}
      <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('courses')}
          className={`cursor-pointer px-4 sm:px-6 py-3 font-bold rounded-lg transition-colors text-sm sm:text-base ${activeTab === 'courses' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          Short Courses
        </button>
        <button
          onClick={() => setActiveTab('equipment')}
          className={`cursor-pointer px-4 sm:px-6 py-3 font-bold rounded-lg transition-colors text-sm sm:text-base ${activeTab === 'equipment' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          Lab Equipment
        </button>
        <button
          onClick={() => setActiveTab('internship')}
          className={`cursor-pointer px-4 sm:px-6 py-3 font-bold rounded-lg transition-colors text-sm sm:text-base ${activeTab === 'internship' ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-800'}`}
        >
          Internship
        </button>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center p-8 text-gray-800">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading services data...
          </div>
        ) : (
          <>
            {/* Short Courses */}
            {activeTab === 'courses' && data.shortCourses && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {data.shortCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/services/courses/${course.id}`}
                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md flex flex-col items-center transition-shadow w-full"
                  >
                    {course.image && (
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={200}
                        height={150}
                        className="rounded-md object-cover mb-4"
                      />
                    )}
                    <h3 className="font-semibold text-xl text-gray-900 mt-2 text-center">{course.title}</h3>
                    <p className="text-sm text-gray-600 mt-2 text-center">{course.description}</p>
                  </Link>
                ))}
              </div>
            )}

            {/* Lab Equipment */}
            {activeTab === 'equipment' && data.labEquipment && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {data.labEquipment.map((item) => (
                  <Link
                    key={item.id}
                    href={`/services/equipment/${item.id}`}
                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md flex flex-col items-center transition-shadow w-full"
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={150}
                        className="rounded-md object-cover mb-4"
                      />
                    )}
                    <h3 className="font-semibold text-xl text-gray-900 mt-2">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.brand} - {item.model}</p>
                  </Link>
                ))}
              </div>
            )}

            {/* Internship */}
            {activeTab === 'internship' && data.internshipLink && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Internship Program</h2>
                <p className="text-gray-600 mb-4">
                  Our internship program provides students with hands-on experience in IC and SoC design, as well as AIoT applications. You will work on real-world projects and be mentored by experienced engineers.
                </p>
                <div className="mt-4">
                  <h3 className="font-bold text-gray-900">Application Process:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Submit your application via the form below.</li>
                    <li>Shortlisted candidates will be invited for an interview.</li>
                    <li>Final selection will be based on technical skills and project fit.</li>
                  </ul>
                </div>
                <a
                  href={data.internshipLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors hover:bg-indigo-700"
                >
                  Apply for Internship
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}