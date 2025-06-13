import React from 'react';
import { ShowcaseSettings } from '../../types';

interface ShowcaseSettingsEditorProps {
  settings: ShowcaseSettings;
  onUpdate: (settings: ShowcaseSettings) => void;
}

const ShowcaseSettingsEditor: React.FC<ShowcaseSettingsEditorProps> = ({ settings, onUpdate }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Featured Portfolio Settings</h3>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showcaseVisible"
              checked={settings.isVisible}
              onChange={(e) => onUpdate({ ...settings, isVisible: e.target.checked })}
              className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="showcaseVisible" className="text-sm font-medium text-gray-700">
              Show Featured Portfolio Section
            </label>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>The featured portfolio section displays selected courses/projects between the statistics and brands sections.</p>
            <p className="mt-2">When enabled, it will show the courses as featured portfolio items with special styling.</p>
            <p className="mt-2 font-medium">This section appears before the brands section and showcases your most important work.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseSettingsEditor;