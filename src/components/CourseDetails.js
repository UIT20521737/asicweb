// src/components/CourseDetails.js
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchCourseDetails } from '@/data/services'; // Ensure this is the correct import path

export default function CourseDetails({ id }) {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      setIsLoading(true);
      const fetchedCourse = await fetchCourseDetails(id);
      setCourse(fetchedCourse);
      setIsLoading(false);
    }

    if (id) {
      loadCourse();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 text-foreground">
        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading course details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-500">Error: Not found.</h1>
        <p className="mt-4 text-foreground/75">Please check again.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/services" className="inline-flex items-center text-primary-light hover:text-primary transition-colors text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Services
        </Link>
      </div>

      <div className="rounded-lg shadow-lg p-6 sm:p-8" style={{ backgroundColor: 'var(--color-card)' }}>
        <h1 className="text-3xl font-bold mb-4 text-primary">{course.title}</h1>
        <p className="text-xl text-foreground/75 mb-6">{course.description}</p>
        
        <h2 className="text-2xl font-bold mt-8 mb-2 text-foreground">Course Detail</h2>
        <p className="text-foreground/75">{course.details}</p>
        
        <a 
          href={course.registrationLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block mt-8 bg-primary text-txt-primary font-bold py-3 px-6 rounded-lg shadow-lg transition-colors hover:bg-primary-hover"
        >
          Register Now
        </a>
      </div>
    </div>
  );
}