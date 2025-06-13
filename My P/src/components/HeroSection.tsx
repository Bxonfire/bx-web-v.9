import React, { useState } from 'react';
import { HeroContent, SiteContent } from '../types';

interface HeroSectionProps {
  hero: HeroContent;
  themeColors?: SiteContent['themeColors'];
}

const HeroSection: React.FC<HeroSectionProps> = ({ hero, themeColors }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const primaryColor = themeColors?.primary || '#2563eb';
  const secondaryColor = themeColors?.secondary || '#7c3aed';
  const textColor = themeColors?.text || '#1f2937';
  const textSecondaryColor = themeColors?.textSecondary || '#6b7280';

  return (
    <section 
      id="hero" 
      className="min-h-screen pt-20 flex items-center overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)` 
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6 animate-slide-in-left">
            <h1 
              className="text-4xl lg:text-5xl font-bold leading-tight animate-fade-in-up animate-delay-200"
              style={{ color: textColor }}
            >
              {hero.title}
            </h1>
            <p 
              className="text-lg leading-relaxed animate-fade-in-up animate-delay-400"
              style={{ color: textSecondaryColor }}
            >
              {hero.description}
            </p>
            <div className="flex space-x-4 animate-fade-in-up animate-delay-600">
              <button 
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                View My Work
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 border-2"
                style={{ 
                  borderColor: primaryColor, 
                  color: primaryColor,
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = primaryColor;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = primaryColor;
                }}
              >
                Contact Me
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center animate-slide-in-right">
            <div className="relative" style={{ perspective: '1000px' }}>
              <div 
                className={`relative w-96 h-96 transition-all duration-700 cursor-pointer ${
                  isFlipped ? '' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
              >
                {/* Front of image */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="w-full h-full object-contain transition-transform duration-700 hover:scale-110"
                    style={{ 
                      backgroundColor: 'transparent',
                      mixBlendMode: 'normal'
                    }}
                  />
                </div>
                
                {/* Back of image */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl flex items-center justify-center text-white p-8"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` 
                  }}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{hero.flipTitle || hero.name}</h3>
                    <p className="text-lg opacity-90 mb-4">{hero.flipSubtitle || 'Professional Designer'}</p>
                    <p className="text-sm mb-6 opacity-80">{hero.flipDescription || 'Creating amazing designs'}</p>
                    <div className="space-y-2">
                      <div className="bg-white/20 rounded-lg p-2">
                        <span className="text-sm font-semibold">{hero.flipStats?.experience || '7+ Years Experience'}</span>
                      </div>
                      <div className="bg-white/20 rounded-lg p-2">
                        <span className="text-sm font-semibold">{hero.flipStats?.brands || '200+ Brands'}</span>
                      </div>
                      <div className="bg-white/20 rounded-lg p-2">
                        <span className="text-sm font-semibold">{hero.flipStats?.projects || '10k+ Projects'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;