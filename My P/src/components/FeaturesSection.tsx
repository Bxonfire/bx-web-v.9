import React from 'react';
import { Feature, ThemeColors } from '../types';
import * as Icons from 'lucide-react';

interface FeaturesSectionProps {
  features: Feature[];
  themeColors?: ThemeColors;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features, themeColors }) => {
  const primaryColor = themeColors?.primary || '#2563eb';
  const textColor = themeColors?.text || '#1f2937';
  const textSecondaryColor = themeColors?.textSecondary || '#6b7280';
  const surfaceColor = themeColors?.surface || '#f8fafc';

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
    return IconComponent ? <IconComponent size={48} /> : <Icons.Star size={48} />;
  };

  return (
    <section 
      className="py-16"
      style={{ backgroundColor: surfaceColor }}
    >
      <div className="container mx-auto px-4">
        <h2 
          className="text-3xl font-bold text-center mb-12"
          style={{ color: textColor }}
        >
          Why choose me?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4" style={{ color: primaryColor }}>
                {getIcon(feature.icon)}
              </div>
              <h3 
                className="text-xl font-bold mb-3"
                style={{ color: textColor }}
              >
                {feature.title}
              </h3>
              <p 
                className="text-sm leading-relaxed"
                style={{ color: textSecondaryColor }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;