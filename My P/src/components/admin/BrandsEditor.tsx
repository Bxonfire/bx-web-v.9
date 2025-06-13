import React from 'react';
import { Brand } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

interface BrandsEditorProps {
  brands: Brand[];
  onUpdate: (brands: Brand[]) => void;
}

const BrandsEditor: React.FC<BrandsEditorProps> = ({ brands, onUpdate }) => {
  const addBrand = () => {
    const newBrand: Brand = {
      id: Date.now().toString(),
      name: '',
      logo: ''
    };
    onUpdate([...brands, newBrand]);
  };

  const updateBrand = (id: string, field: keyof Brand, value: string) => {
    onUpdate(brands.map(brand => 
      brand.id === id ? { ...brand, [field]: value } : brand
    ));
  };

  const deleteBrand = (id: string) => {
    onUpdate(brands.filter(brand => brand.id !== id));
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        updateBrand(id, 'logo', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Brands Editor</h3>
        <button
          onClick={addBrand}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Brand
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {brands.map((brand) => (
          <div key={brand.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-gray-700">Brand</h4>
              <button
                onClick={() => deleteBrand(brand.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brand.name}
                  onChange={(e) => updateBrand(brand.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Logo
                </label>
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(brand.id, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex items-center space-x-4">
                    {brand.logo && (
                      <img
                        src={brand.logo}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    )}
                    <input
                      type="text"
                      value={brand.logo}
                      onChange={(e) => updateBrand(brand.id, 'logo', e.target.value)}
                      placeholder="Or enter logo URL"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsEditor;