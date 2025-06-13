import React, { useState } from 'react';
import { SiteContent } from '../../types';
import HeroEditor from './HeroEditor';
import StatsEditor from './StatsEditor';
import CoursesEditor from './CoursesEditor';
import BrandsEditor from './BrandsEditor';
import FeaturesEditor from './FeaturesEditor';
import PortfolioEditor from './PortfolioEditor';
import CategoriesEditor from './CategoriesEditor';
import SliderSettingsEditor from './SliderSettingsEditor';
import ShowcaseSettingsEditor from './ShowcaseSettingsEditor';
import WhatsAppEditor from './WhatsAppEditor';
import ContactEditor from './ContactEditor';
import FooterEditor from './FooterEditor';
import ThemeColorsEditor from './ThemeColorsEditor';
import HeaderEditor from './HeaderEditor';
import FontEditor from './FontEditor';
import { X, Save, RotateCcw } from 'lucide-react';

interface AdminPanelProps {
  content: SiteContent;
  onUpdate: (content: SiteContent) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ content, onUpdate, onClose }) => {
  const [activeTab, setActiveTab] = useState('header');
  const [tempContent, setTempContent] = useState<SiteContent>(content);
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: 'header', label: 'Header & Navigation' },
    { id: 'fonts', label: 'Font Management' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'stats', label: 'Statistics' },
    { id: 'showcase', label: 'Featured Portfolio' },
    { id: 'courses', label: 'Courses' },
    { id: 'brands', label: 'Brands' },
    { id: 'features', label: 'Features' },
    { id: 'categories', label: 'Categories' },
    { id: 'portfolio', label: 'My Work' },
    { id: 'contact', label: 'Contact Info' },
    { id: 'footer', label: 'Footer & Social' },
    { id: 'slider', label: 'Slider Settings' },
    { id: 'whatsapp', label: 'WhatsApp Button' },
    { id: 'theme', label: 'Theme Colors' }
  ];

  const handleTempUpdate = (newContent: SiteContent) => {
    setTempContent(newContent);
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate(tempContent);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setTempContent(content);
    setHasChanges(false);
  };

  const handleClose = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'header':
        return (
          <HeaderEditor
            headerSettings={tempContent.headerSettings || { 
              useText: true, 
              text: 'Yasin Ali Abir', 
              logo: '',
              navigationLinks: [
                { id: '1', label: 'About Me', type: 'section', target: 'hero', isVisible: true },
                { id: '2', label: 'My Work', type: 'section', target: 'portfolio', isVisible: true },
                { id: '3', label: 'Contact Me', type: 'section', target: 'contact', isVisible: true }
              ],
              showAdminButton: true
            }}
            onUpdate={(headerSettings) => handleTempUpdate({ ...tempContent, headerSettings })}
          />
        );
      case 'fonts':
        return (
          <FontEditor
            fontSettings={tempContent.fontSettings || { headings: 'Inter', body: 'Inter', display: 'Inter', customFonts: [] }}
            onUpdate={(fontSettings) => handleTempUpdate({ ...tempContent, fontSettings })}
          />
        );
      case 'hero':
        return (
          <HeroEditor
            hero={tempContent.hero}
            onUpdate={(hero) => handleTempUpdate({ ...tempContent, hero })}
          />
        );
      case 'stats':
        return (
          <StatsEditor
            stats={tempContent.stats}
            onUpdate={(stats) => handleTempUpdate({ ...tempContent, stats })}
          />
        );
      case 'showcase':
        return (
          <ShowcaseSettingsEditor
            settings={tempContent.showcaseSettings || { isVisible: true }}
            onUpdate={(showcaseSettings) => handleTempUpdate({ ...tempContent, showcaseSettings })}
          />
        );
      case 'courses':
        return (
          <CoursesEditor
            courses={tempContent.courses}
            onUpdate={(courses) => handleTempUpdate({ ...tempContent, courses })}
          />
        );
      case 'brands':
        return (
          <BrandsEditor
            brands={tempContent.brands}
            onUpdate={(brands) => handleTempUpdate({ ...tempContent, brands })}
          />
        );
      case 'features':
        return (
          <FeaturesEditor
            features={tempContent.features}
            onUpdate={(features) => handleTempUpdate({ ...tempContent, features })}
          />
        );
      case 'categories':
        return (
          <CategoriesEditor
            categories={tempContent.categories}
            onUpdate={(categories) => handleTempUpdate({ ...tempContent, categories })}
          />
        );
      case 'portfolio':
        return (
          <PortfolioEditor
            portfolio={tempContent.portfolio}
            categories={tempContent.categories}
            onUpdate={(portfolio) => handleTempUpdate({ ...tempContent, portfolio })}
          />
        );
      case 'contact':
        return (
          <ContactEditor
            contactInfo={tempContent.contactInfo || {
              email: 'yasinaliabir@gmail.com',
              phone: '+880 123 456 789',
              address: 'House 123, Road 456',
              city: 'Dhaka',
              country: 'Bangladesh'
            }}
            onUpdate={(contactInfo) => handleTempUpdate({ ...tempContent, contactInfo })}
          />
        );
      case 'footer':
        return (
          <FooterEditor
            footerSettings={tempContent.footerSettings || {
              copyrightText: 'Copyright © 2025 Yasin Ali Abir',
              socialLinks: []
            }}
            onUpdate={(footerSettings) => handleTempUpdate({ ...tempContent, footerSettings })}
          />
        );
      case 'slider':
        return (
          <SliderSettingsEditor
            settings={tempContent.sliderSettings || { speed: 4000, autoPlay: true, pauseOnHover: true }}
            onUpdate={(sliderSettings) => handleTempUpdate({ ...tempContent, sliderSettings })}
          />
        );
      case 'whatsapp':
        return (
          <WhatsAppEditor
            settings={tempContent.whatsappSettings || { phoneNumber: '+8801234567890', message: 'Hello! I would like to discuss a project with you.', isVisible: true }}
            onUpdate={(whatsappSettings) => handleTempUpdate({ ...tempContent, whatsappSettings })}
          />
        );
      case 'theme':
        return (
          <ThemeColorsEditor
            themeColors={tempContent.themeColors || {
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
            }}
            onUpdate={(themeColors) => handleTempUpdate({ ...tempContent, themeColors })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex">
      <div className="w-full max-w-7xl mx-auto m-4 bg-white rounded-lg shadow-2xl flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-lg flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <div className="flex items-center space-x-2">
            {hasChanges && (
              <span className="text-sm text-orange-600 font-medium">
                Unsaved changes
              </span>
            )}
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-100 border-r flex-shrink-0">
            <nav className="p-2 h-full overflow-y-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 p-6 overflow-y-auto">
              {renderTabContent()}
            </div>

            {/* Footer with Save/Cancel buttons */}
            <div className="border-t bg-gray-50 p-4 flex justify-end space-x-3 flex-shrink-0">
              <button
                onClick={handleCancel}
                disabled={!hasChanges}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  hasChanges
                    ? 'bg-gray-500 hover:bg-gray-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <RotateCcw size={18} />
                Cancel Changes
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  hasChanges
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;