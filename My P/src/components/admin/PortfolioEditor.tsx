import React from 'react';
import { PortfolioItem, Category } from '../../types';
import { Plus, Trash2, Upload } from 'lucide-react';

interface PortfolioEditorProps {
  portfolio: PortfolioItem[];
  categories: Category[];
  onUpdate: (portfolio: PortfolioItem[]) => void;
}

const PortfolioEditor: React.FC<PortfolioEditorProps> = ({ portfolio, categories, onUpdate }) => {
  const addPortfolioItem = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      title: '',
      image: '',
      category: categories[0]?.slug || ''
    };
    onUpdate([...portfolio, newItem]);
  };

  const updatePortfolioItem = (id: string, field: keyof PortfolioItem, value: string) => {
    onUpdate(portfolio.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const deletePortfolioItem = (id: string) => {
    onUpdate(portfolio.filter(item => item.id !== id));
  };

  const resizeImage = (file: File, maxWidth: number, maxHeight: number, quality: number = 0.8): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions maintaining aspect ratio
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const resizedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(resizedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        updatePortfolioItem(id, 'image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadWithResize = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Resize image to optimal dimensions for portfolio
        const resizedImage = await resizeImage(file, 600, 600, 0.85);
        updatePortfolioItem(id, 'image', resizedImage);
      } catch (error) {
        console.error('Error resizing image:', error);
        // Fallback to original upload method
        handleImageUpload(id, e);
      }
    }
  };

  const getItemsByCategory = (categorySlug: string) => {
    return portfolio.filter(item => item.category === categorySlug);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Portfolio Editor</h3>
        <button
          onClick={addPortfolioItem}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Portfolio Item
        </button>
      </div>

      {categories.map((category) => (
        <div key={category.id} className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">{category.name}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getItemsByCategory(category.slug).map((item) => (
              <div key={item.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h5 className="font-medium text-gray-700">Portfolio Item</h5>
                  <button
                    onClick={() => deletePortfolioItem(item.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updatePortfolioItem(item.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={item.category}
                      onChange={(e) => updatePortfolioItem(item.id, 'category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image (Auto-Resize Enabled)
                    </label>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUploadWithResize(item.id, e)}
                          className="hidden"
                          id={`portfolio-upload-${item.id}`}
                        />
                        <label
                          htmlFor={`portfolio-upload-${item.id}`}
                          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                        >
                          <Upload size={18} />
                          Upload & Auto-Resize
                        </label>
                        {item.image && (
                          <img
                            src={item.image}
                            alt="Preview"
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                        )}
                      </div>
                      <input
                        type="text"
                        value={item.image}
                        onChange={(e) => updatePortfolioItem(item.id, 'image', e.target.value)}
                        placeholder="Or enter image URL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                        ✅ Images are automatically resized to 600x600px and optimized for web
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {getItemsByCategory(category.slug).length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No items in this category yet. Add some portfolio items above!
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PortfolioEditor;