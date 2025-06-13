import React from 'react';
import { Course } from '../types';

interface CourseSectionProps {
  courses: Course[];
}

const CourseSection: React.FC<CourseSectionProps> = ({ courses }) => {
  const handleEnrollClick = (course: Course) => {
    if (course.enrollUrl) {
      window.open(course.enrollUrl, '_blank');
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {courses.map((course) => (
          <div key={course.id} className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="lg:w-1/2">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '384px'
                }}
              />
            </div>
            <div className="lg:w-1/2 space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  {course.title}
                </h2>
                <h3 className="text-3xl font-bold text-gray-700">
                  {course.subtitle}
                </h3>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={() => handleEnrollClick(course)}
                  className="text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  style={{ backgroundColor: course.buttonColor || '#f59e0b' }}
                >
                  {course.buttonText || 'ENROLL NOW'}
                </button>
                <div className="flex items-center space-x-4">
                  <span className="text-xl font-bold text-gray-800">
                    {course.discountedPrice}
                  </span>
                  {course.originalPrice && (
                    <span className="text-lg text-red-500 line-through">
                      {course.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseSection;