import React from 'react';
import { Feature } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

interface FeaturesEditorProps {
  features: Feature[];
  onUpdate: (features: Feature[]) => void;
}

const FeaturesEditor: React.FC<FeaturesEditorProps> = ({ features, onUpdate }) => {
  const addFeature = () => {
    const newFeature: Feature = {
      id: Date.now().toString(),
      icon: 'star',
      title: '',
      description: ''
    };
    onUpdate([...features, newFeature]);
  };

  const updateFeature = (id: string, field: keyof Feature, value: string) => {
    onUpdate(features.map(feature => 
      feature.id === id ? { ...feature, [field]: value } : feature
    ));
  };

  const deleteFeature = (id: string) => {
    onUpdate(features.filter(feature => feature.id !== id));
  };

  const iconOptions = [
    'rocket', 'refresh-cw', 'target', 'globe', 'lightbulb', 'dollar-sign',
    'star', 'heart', 'shield', 'zap', 'award', 'check-circle'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Features Editor</h3>
        <button
          onClick={addFeature}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Feature
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <div key={feature.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-gray-700">Feature</h4>
              <button
                onClick={() => deleteFeature(feature.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <select
                  value={feature.icon}
                  onChange={(e) => updateFeature(feature.id, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => updateFeature(feature.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={feature.description}
                  onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesEditor;