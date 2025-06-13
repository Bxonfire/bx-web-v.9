import React, { useState, useEffect, useRef } from 'react';
import { Stat, ThemeColors } from '../types';

interface StatsSectionProps {
  stats: Stat[];
  themeColors?: ThemeColors;
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats, themeColors }) => {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const primaryColor = themeColors?.primary || '#2563eb';
  const textSecondaryColor = themeColors?.textSecondary || '#6b7280';

  const extractNumber = (value: string): number => {
    const match = value.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const formatValue = (originalValue: string, currentNumber: number): string => {
    const suffix = originalValue.replace(/\d+/, '');
    return `${currentNumber}${suffix}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          stats.forEach((stat) => {
            const targetNumber = extractNumber(stat.value);
            let currentNumber = 0;
            const increment = targetNumber / 100;
            const duration = 2000; // 2 seconds
            const stepTime = duration / 100;

            const timer = setInterval(() => {
              currentNumber += increment;
              if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
              }
              setAnimatedValues(prev => ({
                ...prev,
                [stat.id]: Math.floor(currentNumber)
              }));
            }, stepTime);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [stats, hasAnimated]);

  return (
    <section 
      ref={sectionRef} 
      className="py-16"
      style={{ backgroundColor: themeColors?.background || '#ffffff' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="text-center animate-fade-in-up hover:scale-105 transition-all duration-500 p-6 rounded-xl hover:shadow-lg"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div 
                className="text-4xl lg:text-5xl font-bold mb-2 font-mono"
                style={{ color: primaryColor }}
              >
                {hasAnimated 
                  ? formatValue(stat.value, animatedValues[stat.id] || 0)
                  : '0+'
                }
              </div>
              <div 
                className="font-medium text-lg"
                style={{ color: textSecondaryColor }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;