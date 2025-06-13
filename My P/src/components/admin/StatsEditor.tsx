import React from 'react';
import { Stat } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

interface StatsEditorProps {
  stats: Stat[];
  onUpdate: (stats: Stat[]) => void;
}

const StatsEditor: React.FC<StatsEditorProps> = ({ stats, onUpdate }) => {
  const addStat = () => {
    const newStat: Stat = {
      id: Date.now().toString(),
      value: '',
      label: ''
    };
    onUpdate([...stats, newStat]);
  };

  const updateStat = (id: string, field: keyof Stat, value: string) => {
    onUpdate(stats.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ));
  };

  const deleteStat = (id: string) => {
    onUpdate(stats.filter(stat => stat.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Statistics Editor</h3>
        <button
          onClick={addStat}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Stat
        </button>
      </div>

      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-gray-700">Statistic</h4>
              <button
                onClick={() => deleteStat(stat.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Value
                </label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
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

export default StatsEditor;