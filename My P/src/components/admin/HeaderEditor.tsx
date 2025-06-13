import React from 'react';
import { HeaderSettings, NavigationLink } from '../../types';
import { Upload, Type, Image, Info, Plus, Trash2, Eye, EyeOff, ExternalLink, Hash, Globe } from 'lucide-react';

interface HeaderEditorProps {
  headerSettings: HeaderSettings;
  onUpdate: (headerSettings: HeaderSettings) => void;
}

const HeaderEditor: React.FC<HeaderEditorProps> = ({ headerSettings, onUpdate }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onUpdate({ ...headerSettings, logo: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const addNavigationLink = () => {
    const newLink: NavigationLink = {
      id: Date.now().toString(),
      label: 'New Link',
      type: 'section',
      target: 'hero',
      isVisible: true,
      openInNewTab: false
    };
    onUpdate({
      ...headerSettings,
      navigationLinks: [...(headerSettings.navigationLinks || []), newLink]
    });
  };

  const updateNavigationLink = (id: string, field: keyof NavigationLink, value: string | boolean) => {
    onUpdate({
      ...headerSettings,
      navigationLinks: (headerSettings.navigationLinks || []).map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    });
  };

  const deleteNavigationLink = (id: string) => {
    onUpdate({
      ...headerSettings,
      navigationLinks: (headerSettings.navigationLinks || []).filter(link => link.id !== id)
    });
  };

  const moveNavigationLink = (id: string, direction: 'up' | 'down') => {
    const links = [...(headerSettings.navigationLinks || [])];
    const index = links.findIndex(link => link.id === id);
    
    if (direction === 'up' && index > 0) {
      [links[index], links[index - 1]] = [links[index - 1], links[index]];
    } else if (direction === 'down' && index < links.length - 1) {
      [links[index], links[index + 1]] = [links[index + 1], links[index]];
    }
    
    onUpdate({ ...headerSettings, navigationLinks: links });
  };

  const getTargetIcon = (type: string) => {
    switch (type) {
      case 'section': return <Hash size={16} />;
      case 'url': return <ExternalLink size={16} />;
      case 'page': return <Globe size={16} />;
      default: return <Hash size={16} />;
    }
  };

  const getTargetPlaceholder = (type: string) => {
    switch (type) {
      case 'section': return 'hero, portfolio, contact, etc.';
      case 'url': return 'https://example.com';
      case 'page': return 'about, services, blog, etc.';
      default: return 'Enter target';
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Type className="text-blue-600" size={28} />
        Header Settings
      </h3>
      
      {/* Header Type Selection */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Header Display Type</h4>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="useText"
              checked={headerSettings.useText}
              onChange={() => onUpdate({ ...headerSettings, useText: true })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="useText" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Type size={18} />
              Use Text
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="useLogo"
              checked={!headerSettings.useText}
              onChange={() => onUpdate({ ...headerSettings, useText: false })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="useLogo" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Image size={18} />
              Use Logo Image
            </label>
          </div>
        </div>
      </div>

      {/* Text Settings */}
      {headerSettings.useText && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Header Text</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Header Text
            </label>
            <input
              type="text"
              value={headerSettings.text}
              onChange={(e) => onUpdate({ ...headerSettings, text: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter header text"
            />
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-2">Preview:</h5>
            <div className="text-xl font-bold text-white bg-blue-600 px-4 py-2 rounded inline-block">
              {headerSettings.text || 'Header Text'}
            </div>
          </div>
        </div>
      )}

      {/* Logo Settings */}
      {!headerSettings.useText && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Header Logo</h4>
          
          {/* Logo Size Recommendations */}
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Info className="text-blue-600 mt-0.5" size={20} />
              <div>
                <h5 className="font-semibold text-blue-800 mb-2">📏 Recommended Logo Specifications</h5>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>🎯 Optimal Size:</strong> 200x60 pixels (landscape) or 60x60 pixels (square)</p>
                  <p><strong>📐 Maximum Height:</strong> 60px (will auto-resize if larger)</p>
                  <p><strong>📁 File Format:</strong> PNG (for transparency), SVG, or JPG</p>
                  <p><strong>💾 File Size:</strong> Under 500KB for best performance</p>
                  <p><strong>🎨 Background:</strong> Transparent PNG works best for logos</p>
                  <p><strong>✨ Style:</strong> High contrast logos work best on colored headers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Logo
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <Upload size={18} />
                  Upload Logo
                </label>
                {headerSettings.logo && (
                  <img
                    src={headerSettings.logo}
                    alt="Logo preview"
                    className="h-12 object-contain rounded border bg-white p-1"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or Enter Logo URL
              </label>
              <input
                type="url"
                value={headerSettings.logo || ''}
                onChange={(e) => onUpdate({ ...headerSettings, logo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>

          {headerSettings.logo && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">Preview:</h5>
              <div className="bg-blue-600 px-4 py-2 rounded inline-block">
                <img
                  src={headerSettings.logo}
                  alt="Logo preview"
                  className="h-8 object-contain"
                  style={{ maxHeight: '32px' }}
                />
              </div>
            </div>
          )}

          {/* Auto-resize Information */}
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-green-700">
                <strong>Auto-Resize:</strong> Logos are automatically resized to fit the header height (max 32px). 
                Aspect ratio is preserved and the logo will be centered vertically.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links Management */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-semibold text-gray-800">Navigation Links</h4>
          <button
            onClick={addNavigationLink}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Add Link
          </button>
        </div>

        <div className="space-y-4">
          {(headerSettings.navigationLinks || []).map((link, index) => (
            <div key={link.id} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h5 className="font-medium text-gray-700 flex items-center gap-2">
                  {getTargetIcon(link.type)}
                  Navigation Link
                </h5>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateNavigationLink(link.id, 'isVisible', !link.isVisible)}
                    className={`p-1 rounded ${link.isVisible ? 'text-green-600' : 'text-gray-400'}`}
                    title={link.isVisible ? 'Visible' : 'Hidden'}
                  >
                    {link.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => moveNavigationLink(link.id, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveNavigationLink(link.id, 'down')}
                    disabled={index === (headerSettings.navigationLinks || []).length - 1}
                    className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => deleteNavigationLink(link.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link Text
                  </label>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateNavigationLink(link.id, 'label', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="About Me"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link Type
                  </label>
                  <select
                    value={link.type}
                    onChange={(e) => updateNavigationLink(link.id, 'type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="section">Section (Scroll to)</option>
                    <option value="url">External URL</option>
                    <option value="page">Internal Page</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target {link.type === 'section' ? 'Section ID' : link.type === 'url' ? 'URL' : 'Page'}
                </label>
                <input
                  type="text"
                  value={link.target}
                  onChange={(e) => updateNavigationLink(link.id, 'target', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={getTargetPlaceholder(link.type)}
                />
                {link.type === 'section' && (
                  <p className="text-xs text-gray-500 mt-1">
                    Available sections: hero, portfolio, contact, stats, features
                  </p>
                )}
              </div>

              {link.type === 'url' && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`newTab-${link.id}`}
                    checked={link.openInNewTab || false}
                    onChange={(e) => updateNavigationLink(link.id, 'openInNewTab', e.target.checked)}
                    className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={`newTab-${link.id}`} className="text-sm font-medium text-gray-700">
                    Open in new tab
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>

        {(headerSettings.navigationLinks || []).length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No navigation links added yet. Click "Add Link" to get started!
          </div>
        )}
      </div>

      {/* Admin Button Settings */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Admin Panel Access</h4>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showAdminButton"
            checked={headerSettings.showAdminButton}
            onChange={(e) => onUpdate({ ...headerSettings, showAdminButton: e.target.checked })}
            className="mr-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="showAdminButton" className="text-sm font-medium text-gray-700">
            Show Admin Panel button in header (when activated with Ctrl+Shift+A)
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          When enabled, the admin panel button will appear in the header after pressing Ctrl+Shift+A
        </p>
      </div>

      {/* Live Preview */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h4>
        <div className="bg-blue-600 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            {/* Logo/Brand Preview */}
            <div>
              {headerSettings.useText ? (
                <div className="text-white font-bold text-xl">
                  {headerSettings.text || 'Header Text'}
                </div>
              ) : (
                headerSettings.logo && (
                  <img
                    src={headerSettings.logo}
                    alt="Logo preview"
                    className="h-8 object-contain"
                    style={{ maxHeight: '32px' }}
                  />
                )
              )}
            </div>
            
            {/* Navigation Preview */}
            <div className="flex items-center space-x-6">
              {(headerSettings.navigationLinks || [])
                .filter(link => link.isVisible)
                .map((link) => (
                  <span key={link.id} className="text-white hover:text-blue-200 font-medium">
                    {link.label}
                  </span>
                ))}
              {headerSettings.showAdminButton && (
                <span className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium">
                  Admin Panel
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderEditor;