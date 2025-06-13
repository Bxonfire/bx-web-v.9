import React from 'react';
import { Course, ThemeColors } from '../types';

interface ShowcaseSectionProps {
  courses: Course[];
  isVisible: boolean;
  themeColors?: ThemeColors;
}

const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ courses, isVisible, themeColors }) => {
  if (!isVisible || courses.length === 0) return null;

  const primaryColor = themeColors?.primary || '#2563eb';
  const accentColor = themeColors?.accent || '#f59e0b';
  const textColor = themeColors?.text || '#1f2937';
  const textSecondaryColor = themeColors?.textSecondary || '#6b7280';
  const surfaceColor = themeColors?.surface || '#f8fafc';

  const handleEnrollClick = (course: Course) => {
    if (course.enrollUrl) {
      window.open(course.enrollUrl, '_blank');
    }
  };

  return (
    <section 
      className="py-16"
      style={{ 
        background: `linear-gradient(135deg, ${surfaceColor}, ${primaryColor}10)` 
      }}
    >
      <div className="container mx-auto px-4">
        <h2 
          className="text-4xl font-bold text-center mb-12 animate-fade-in-up font-serif"
          style={{ color: textColor }}
        >
          Featured Portfolio
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '256px'
                  }}
                />
                <div 
                  className="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-sm font-bold"
                  style={{ backgroundColor: accentColor }}
                >
                  Featured
                </div>
              </div>
              
              <div className="p-6">
                <h3 
                  className="text-2xl font-bold mb-2 font-serif"
                  style={{ color: textColor }}
                >
                  {course.title}
                </h3>
                <p 
                  className="text-lg mb-4 font-sans"
                  style={{ color: textSecondaryColor }}
                >
                  {course.subtitle}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: accentColor }}
                    >
                      {course.discountedPrice}
                    </span>
                    {course.originalPrice && (
                      <span 
                        className="text-lg line-through"
                        style={{ color: textSecondaryColor }}
                      >
                        {course.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={() => handleEnrollClick(course)}
                  className="w-full text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: course.buttonColor || accentColor }}
                >
                  {course.buttonText || 'ENROLL NOW'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;