import React from 'react';
import { ThemeColors } from '../../types';
import { Palette, RotateCcw } from 'lucide-react';

interface ThemeColorsEditorProps {
  themeColors: ThemeColors;
  onUpdate: (themeColors: ThemeColors) => void;
}

const ThemeColorsEditor: React.FC<ThemeColorsEditorProps> = ({ themeColors, onUpdate }) => {
  const updateColor = (colorKey: keyof ThemeColors, value: string) => {
    onUpdate({ ...themeColors, [colorKey]: value });
  };

  const resetToDefault = () => {
    const defaultColors: ThemeColors = {
      primary: '#2563eb',
      secondary: '#7c3aed',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1f2937',
      textSecondary: '#6b7280',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    };
    onUpdate(defaultColors);
  };

  const colorOptions = [
    {
      key: 'primary' as keyof ThemeColors,
      label: 'Primary Color',
      description: 'Main brand color (buttons, links, headers)',
      preview: 'bg-blue-600'
    },
    {
      key: 'secondary' as keyof ThemeColors,
      label: 'Secondary Color',
      description: 'Secondary brand color (accents, highlights)',
      preview: 'bg-purple-600'
    },
    {
      key: 'accent' as keyof ThemeColors,
      label: 'Accent Color',
      description: 'Accent color (call-to-action, special elements)',
      preview: 'bg-amber-500'
    },
    {
      key: 'background' as keyof ThemeColors,
      label: 'Background Color',
      description: 'Main background color',
      preview: 'bg-white'
    },
    {
      key: 'surface' as keyof ThemeColors,
      label: 'Surface Color',
      description: 'Cards, panels, elevated surfaces',
      preview: 'bg-slate-50'
    },
    {
      key: 'text' as keyof ThemeColors,
      label: 'Primary Text',
      description: 'Main text color',
      preview: 'bg-gray-800'
    },
    {
      key: 'textSecondary' as keyof ThemeColors,
      label: 'Secondary Text',
      description: 'Secondary text, descriptions',
      preview: 'bg-gray-500'
    },
    {
      key: 'success' as keyof ThemeColors,
      label: 'Success Color',
      description: 'Success messages, positive actions',
      preview: 'bg-green-500'
    },
    {
      key: 'warning' as keyof ThemeColors,
      label: 'Warning Color',
      description: 'Warning messages, caution',
      preview: 'bg-yellow-500'
    },
    {
      key: 'error' as keyof ThemeColors,
      label: 'Error Color',
      description: 'Error messages, destructive actions',
      preview: 'bg-red-500'
    }
  ];

  const presetThemes = [
    {
      name: 'Default Blue',
      colors: {
        primary: '#2563eb',
        secondary: '#7c3aed',
        accent: '#f59e0b',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1f2937',
        textSecondary: '#6b7280',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      }
    },
    {
      name: 'Ocean Green',
      colors: {
        primary: '#059669',
        secondary: '#0d9488',
        accent: '#f59e0b',
        background: '#ffffff',
        surface: '#f0fdfa',
        text: '#1f2937',
        textSecondary: '#6b7280',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      }
    },
    {
      name: 'Sunset Orange',
      colors: {
        primary: '#ea580c',
        secondary: '#dc2626',
        accent: '#f59e0b',
        background: '#ffffff',
        surface: '#fff7ed',
        text: '#1f2937',
        textSecondary: '#6b7280',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      }
    },
    {
      name: 'Royal Purple',
      colors: {
        primary: '#7c3aed',
        secondary: '#a855f7',
        accent: '#f59e0b',
        background: '#ffffff',
        surface: '#faf5ff',
        text: '#1f2937',
        textSecondary: '#6b7280',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      }
    },
    {
      name: 'Dark Mode',
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        background: '#111827',
        surface: '#1f2937',
        text: '#f9fafb',
        textSecondary: '#d1d5db',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      }
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Palette className="text-blue-600" size={28} />
          Theme Colors
        </h3>
        <button
          onClick={resetToDefault}
          className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          <RotateCcw size={18} />
          Reset to Default
        </button>
      </div>

      {/* Preset Themes */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Preset Themes</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {presetThemes.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onUpdate(preset.colors)}
              className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex space-x-1 mb-3">
                <div 
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: preset.colors.primary }}
                ></div>
                <div 
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: preset.colors.secondary }}
                ></div>
                <div 
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: preset.colors.accent }}
                ></div>
              </div>
              <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                {preset.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color Controls */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-6">Custom Colors</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colorOptions.map((option) => (
            <div key={option.key} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {option.label}
                  </label>
                  <p className="text-xs text-gray-500">{option.description}</p>
                </div>
                <div 
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 shadow-sm"
                  style={{ backgroundColor: themeColors[option.key] }}
                ></div>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={themeColors[option.key]}
                  onChange={(e) => updateColor(option.key, e.target.value)}
                  className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={themeColors[option.key]}
                  onChange={(e) => updateColor(option.key, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                  placeholder="#000000"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h4>
        <div 
          className="p-6 rounded-lg border-2 border-gray-200"
          style={{ backgroundColor: themeColors.background }}
        >
          <div 
            className="p-4 rounded-lg mb-4"
            style={{ backgroundColor: themeColors.surface }}
          >
            <h5 
              className="text-xl font-bold mb-2"
              style={{ color: themeColors.text }}
            >
              Sample Heading
            </h5>
            <p 
              className="mb-4"
              style={{ color: themeColors.textSecondary }}
            >
              This is how your text will look with the current color scheme.
            </p>
            <div className="flex space-x-3">
              <button 
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: themeColors.primary }}
              >
                Primary Button
              </button>
              <button 
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: themeColors.secondary }}
              >
                Secondary Button
              </button>
              <button 
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: themeColors.accent }}
              >
                Accent Button
              </button>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <div 
              className="px-3 py-2 rounded text-white text-sm"
              style={{ backgroundColor: themeColors.success }}
            >
              Success
            </div>
            <div 
              className="px-3 py-2 rounded text-white text-sm"
              style={{ backgroundColor: themeColors.warning }}
            >
              Warning
            </div>
            <div 
              className="px-3 py-2 rounded text-white text-sm"
              style={{ backgroundColor: themeColors.error }}
            >
              Error
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeColorsEditor;