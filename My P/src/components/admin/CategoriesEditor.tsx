import React from 'react';
import { Category } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

interface CategoriesEditorProps {
  categories: Category[];
  onUpdate: (categories: Category[]) => void;
}

const CategoriesEditor: React.FC<CategoriesEditorProps> = ({ categories, onUpdate }) => {
  const addCategory = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: '',
      slug: ''
    };
    onUpdate([...categories, newCategory]);
  };

  const updateCategory = (id: string, field: keyof Category, value: string) => {
    let updatedValue = value;
    
    // Auto-generate slug when name changes
    if (field === 'name') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      onUpdate(categories.map(category => 
        category.id === id ? { ...category, name: value, slug } : category
      ));
      return;
    }
    
    onUpdate(categories.map(category => 
      category.id === id ? { ...category, [field]: updatedValue } : category
    ));
  };

  const deleteCategory = (id: string) => {
    onUpdate(categories.filter(category => category.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Categories Editor</h3>
        <button
          onClick={addCategory}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-gray-700">Category</h4>
              <button
                onClick={() => deleteCategory(category.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug (Auto-generated)
                </label>
                <input
                  type="text"
                  value={category.slug}
                  onChange={(e) => updateCategory(category.id, 'slug', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-100"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesEditor;