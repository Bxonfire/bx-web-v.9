import React from 'react';
import { HeroContent } from '../../types';
import { Info } from 'lucide-react';

interface HeroEditorProps {
  hero: HeroContent;
  onUpdate: (hero: HeroContent) => void;
}

const HeroEditor: React.FC<HeroEditorProps> = ({ hero, onUpdate }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onUpdate({ ...hero, image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Hero Section Editor</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={hero.name}
              onChange={(e) => onUpdate({ ...hero, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={hero.title}
              onChange={(e) => onUpdate({ ...hero, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={hero.description}
              onChange={(e) => onUpdate({ ...hero, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Flip Content */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Flip Animation Content</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flip Title
            </label>
            <input
              type="text"
              value={hero.flipTitle || ''}
              onChange={(e) => onUpdate({ ...hero, flipTitle: e.target.value })}
              placeholder="Professional Designer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flip Subtitle
            </label>
            <input
              type="text"
              value={hero.flipSubtitle || ''}
              onChange={(e) => onUpdate({ ...hero, flipSubtitle: e.target.value })}
              placeholder="Creative Excellence"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flip Description
            </label>
            <textarea
              value={hero.flipDescription || ''}
              onChange={(e) => onUpdate({ ...hero, flipDescription: e.target.value })}
              rows={3}
              placeholder="Bringing your vision to life with stunning designs"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Text
              </label>
              <input
                type="text"
                value={hero.flipStats?.experience || ''}
                onChange={(e) => onUpdate({ 
                  ...hero, 
                  flipStats: { 
                    ...hero.flipStats, 
                    experience: e.target.value,
                    brands: hero.flipStats?.brands || '',
                    projects: hero.flipStats?.projects || ''
                  } 
                })}
                placeholder="7+ Years Experience"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brands Text
              </label>
              <input
                type="text"
                value={hero.flipStats?.brands || ''}
                onChange={(e) => onUpdate({ 
                  ...hero, 
                  flipStats: { 
                    ...hero.flipStats, 
                    brands: e.target.value,
                    experience: hero.flipStats?.experience || '',
                    projects: hero.flipStats?.projects || ''
                  } 
                })}
                placeholder="200+ Brands"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Projects Text
              </label>
              <input
                type="text"
                value={hero.flipStats?.projects || ''}
                onChange={(e) => onUpdate({ 
                  ...hero, 
                  flipStats: { 
                    ...hero.flipStats, 
                    projects: e.target.value,
                    experience: hero.flipStats?.experience || '',
                    brands: hero.flipStats?.brands || ''
                  } 
                })}
                placeholder="10k+ Projects"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Image
        </label>
        
        {/* Image Size Recommendations */}
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="text-blue-600 mt-0.5" size={20} />
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">📏 Recommended Image Specifications</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>🎯 Optimal Size:</strong> 800x800 pixels (1:1 aspect ratio)</p>
                <p><strong>📐 Minimum Size:</strong> 400x400 pixels</p>
                <p><strong>📁 File Format:</strong> PNG (for transparency), JPG, or WebP</p>
                <p><strong>💾 File Size:</strong> Under 2MB for best performance</p>
                <p><strong>🎨 Background:</strong> Transparent PNG works best</p>
                <p><strong>✨ Style:</strong> Character/portrait images work perfectly</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                src={hero.image}
                alt="Preview"
                className="w-24 h-24 object-contain rounded-lg border-2 border-gray-200 bg-gray-50"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
            <input
              type="text"
              value={hero.image}
              onChange={(e) => onUpdate({ ...hero, image: e.target.value })}
              placeholder="Or enter image URL"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Auto-resize Information */}
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-green-700">
              <strong>Auto-Resize:</strong> Images are automatically optimized and positioned for best display. 
              Transparent backgrounds are preserved and the image will scale beautifully on hover with flip animation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEditor;