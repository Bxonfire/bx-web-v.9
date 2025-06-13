import React from 'react';
import { SliderSettings } from '../../types';

interface SliderSettingsEditorProps {
  settings: SliderSettings;
  onUpdate: (settings: SliderSettings) => void;
}

const SliderSettingsEditor: React.FC<SliderSettingsEditorProps> = ({ settings, onUpdate }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Slider Settings</h3>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auto Slider Speed (milliseconds)
            </label>
            <input
              type="number"
              min="1000"
              max="10000"
              step="500"
              value={settings.speed}
              onChange={(e) => onUpdate({ ...settings, speed: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Current speed: {settings.speed}ms ({(settings.speed / 1000).toFixed(1)} seconds)
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoPlay"
              checked={settings.autoPlay}
              onChange={(e) => onUpdate({ ...settings, autoPlay: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="autoPlay" className="text-sm font-medium text-gray-700">
              Enable Auto Play
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="pauseOnHover"
              checked={settings.pauseOnHover}
              onChange={(e) => onUpdate({ ...settings, pauseOnHover: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="pauseOnHover" className="text-sm font-medium text-gray-700">
              Pause on Hover
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderSettingsEditor;