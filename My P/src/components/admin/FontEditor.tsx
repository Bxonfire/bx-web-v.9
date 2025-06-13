import React from 'react';
import { FontSettings } from '../../types';
import { Type, Plus, Trash2, Download } from 'lucide-react';

interface FontEditorProps {
  fontSettings: FontSettings;
  onUpdate: (fontSettings: FontSettings) => void;
}

const FontEditor: React.FC<FontEditorProps> = ({ fontSettings, onUpdate }) => {
  const popularFonts = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins',
    'Source Sans Pro',
    'Nunito',
    'Raleway',
    'Ubuntu',
    'Playfair Display',
    'Merriweather',
    'Georgia',
    'Times New Roman',
    'Arial',
    'Helvetica',
    'Verdana',
    'Trebuchet MS',
    'Comic Sans MS',
    'Impact',
    'Oswald',
    'Bebas Neue',
    'Dancing Script',
    'Pacifico',
    'Lobster'
  ];

  const addCustomFont = () => {
    const fontName = prompt('Enter the font name (e.g., "Custom Font"):');
    if (fontName && !fontSettings.customFonts.includes(fontName)) {
      onUpdate({
        ...fontSettings,
        customFonts: [...fontSettings.customFonts, fontName]
      });
    }
  };

  const removeCustomFont = (fontName: string) => {
    onUpdate({
      ...fontSettings,
      customFonts: fontSettings.customFonts.filter(font => font !== fontName)
    });
  };

  const getAllFonts = () => {
    return [...popularFonts, ...fontSettings.customFonts];
  };

  const loadGoogleFont = (fontName: string) => {
    // Check if font is already loaded
    const existingLink = document.querySelector(`link[href*="${fontName.replace(/\s+/g, '+')}"]`);
    if (existingLink) return;

    // Create and append Google Fonts link
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@300;400;500;600;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };

  const handleFontChange = (category: keyof FontSettings, fontName: string) => {
    if (category !== 'customFonts') {
      // Load Google Font if it's not a system font
      const systemFonts = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Trebuchet MS', 'Comic Sans MS', 'Impact'];
      if (!systemFonts.includes(fontName)) {
        loadGoogleFont(fontName);
      }
      
      onUpdate({
        ...fontSettings,
        [category]: fontName
      });
    }
  };

  const getFontPreviewStyle = (fontName: string) => {
    const systemFonts = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Trebuchet MS', 'Comic Sans MS', 'Impact'];
    
    if (systemFonts.includes(fontName)) {
      return { fontFamily: fontName };
    } else {
      // Load Google Font and apply
      loadGoogleFont(fontName);
      return { fontFamily: `"${fontName}", sans-serif` };
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Type className="text-blue-600" size={28} />
          Font Management
        </h3>
        <button
          onClick={addCustomFont}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Custom Font
        </button>
      </div>

      {/* Font Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Headings Font */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Headings Font</h4>
          <p className="text-sm text-gray-600 mb-4">Used for titles, section headers, and main headings</p>
          
          <select
            value={fontSettings.headings}
            onChange={(e) => handleFontChange('headings', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          >
            {getAllFonts().map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
          
          <div className="p-3 bg-white rounded border">
            <h5 
              className="text-xl font-bold text-gray-800"
              style={getFontPreviewStyle(fontSettings.headings)}
            >
              Heading Preview
            </h5>
          </div>
        </div>

        {/* Body Font */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Body Font</h4>
          <p className="text-sm text-gray-600 mb-4">Used for paragraphs, descriptions, and regular text</p>
          
          <select
            value={fontSettings.body}
            onChange={(e) => handleFontChange('body', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          >
            {getAllFonts().map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
          
          <div className="p-3 bg-white rounded border">
            <p 
              className="text-gray-700"
              style={getFontPreviewStyle(fontSettings.body)}
            >
              This is how your body text will look. It should be easy to read and comfortable for long paragraphs.
            </p>
          </div>
        </div>

        {/* Display Font */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Display Font</h4>
          <p className="text-sm text-gray-600 mb-4">Used for hero titles, special headings, and emphasis</p>
          
          <select
            value={fontSettings.display}
            onChange={(e) => handleFontChange('display', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          >
            {getAllFonts().map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
          
          <div className="p-3 bg-white rounded border">
            <h2 
              className="text-2xl font-bold text-gray-800"
              style={getFontPreviewStyle(fontSettings.display)}
            >
              Display Text
            </h2>
          </div>
        </div>
      </div>

      {/* Custom Fonts Management */}
      {fontSettings.customFonts.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Custom Fonts</h4>
          <div className="space-y-3">
            {fontSettings.customFonts.map((font) => (
              <div key={font} className="flex items-center justify-between bg-white p-3 rounded border">
                <span className="font-medium" style={getFontPreviewStyle(font)}>
                  {font}
                </span>
                <button
                  onClick={() => removeCustomFont(font)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Font Loading Instructions */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <Download size={20} />
          How to Add Custom Fonts
        </h4>
        <div className="text-sm text-blue-700 space-y-2">
          <p><strong>Google Fonts:</strong> Just enter the font name (e.g., "Roboto", "Open Sans") and it will be loaded automatically.</p>
          <p><strong>System Fonts:</strong> Arial, Helvetica, Times New Roman, Georgia, Verdana are available by default.</p>
          <p><strong>Custom Web Fonts:</strong> For custom fonts, you'll need to load them via CSS @import or link tags first.</p>
          <p><strong>Font Names:</strong> Use exact font names as they appear in Google Fonts or your font provider.</p>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h4>
        <div className="bg-white p-6 rounded border space-y-4">
          <h1 
            className="text-4xl font-bold text-gray-800"
            style={getFontPreviewStyle(fontSettings.display)}
          >
            Display Font Example
          </h1>
          <h2 
            className="text-2xl font-bold text-gray-800"
            style={getFontPreviewStyle(fontSettings.headings)}
          >
            Heading Font Example
          </h2>
          <p 
            className="text-gray-700 leading-relaxed"
            style={getFontPreviewStyle(fontSettings.body)}
          >
            This is how your body text will appear throughout the website. It should be comfortable to read and maintain good readability across different screen sizes. The font choice affects the overall feel and professionalism of your website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FontEditor;