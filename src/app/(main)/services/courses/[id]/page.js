// src/app/(main)/services/courses/[id]/page.js

import { Suspense } from 'react';
import CourseDetails from '@/components/CourseDetails';
import { fetchCourseDetails } from '@/data/services';



export async function generateMetadata({ params }) {
  const course = await fetchCourseDetails(params.id);
  if (!course) {
    return { title: 'Course Not Found' };
  }
  return {
    title: course.title,
    description: course.description,
  };
}

// Component chính của trang
export default function CourseDetailPage({ params }) {
  return (
    <Suspense fallback={<div>Loading course details...</div>}>
      <CourseDetails id={params.id} />
    </Suspense>
  );
}