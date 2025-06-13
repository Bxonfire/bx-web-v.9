import React from 'react';
import { WhatsAppSettings } from '../../types';

interface WhatsAppEditorProps {
  settings: WhatsAppSettings;
  onUpdate: (settings: WhatsAppSettings) => void;
}

const WhatsAppEditor: React.FC<WhatsAppEditorProps> = ({ settings, onUpdate }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">WhatsApp Button Settings</h3>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="whatsappVisible"
              checked={settings.isVisible}
              onChange={(e) => onUpdate({ ...settings, isVisible: e.target.checked })}
              className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="whatsappVisible" className="text-sm font-medium text-gray-700">
              Show WhatsApp Button
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number (with country code)
            </label>
            <input
              type="text"
              value={settings.phoneNumber}
              onChange={(e) => onUpdate({ ...settings, phoneNumber: e.target.value })}
              placeholder="+8801234567890"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Include country code (e.g., +880 for Bangladesh, +1 for USA)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Message
            </label>
            <textarea
              value={settings.message}
              onChange={(e) => onUpdate({ ...settings, message: e.target.value })}
              rows={3}
              placeholder="Hello! I would like to discuss a project with you."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              This message will be pre-filled when users click the WhatsApp button
            </p>
          </div>

          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Preview:</h4>
            <p className="text-sm text-green-700">
              Button will appear as a floating green WhatsApp icon in the bottom-right corner
            </p>
            <p className="text-xs text-green-600 mt-1">
              Clicking will open WhatsApp with: {settings.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppEditor;