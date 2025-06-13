import React from 'react';
import { Brand } from '../types';

interface BrandsSectionProps {
  brands: Brand[];
}

const BrandsSection: React.FC<BrandsSectionProps> = ({ brands }) => {
  if (brands.length === 0) return null;

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Brands I've worked with
        </h2>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-infinite space-x-12 items-center">
            {duplicatedBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-24 w-24 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;