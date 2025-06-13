import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeColors, HeaderSettings } from '../types';

interface HeaderProps {
  onAdminToggle: () => void;
  isAdminMode: boolean;
  showAdminButton: boolean;
  themeColors?: ThemeColors;
  headerSettings?: HeaderSettings;
}

const Header: React.FC<HeaderProps> = ({ 
  onAdminToggle, 
  isAdminMode, 
  showAdminButton, 
  themeColors,
  headerSettings 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const primaryColor = themeColors?.primary || '#2563eb';
  const defaultHeaderSettings: HeaderSettings = { 
    useText: true, 
    text: 'Yasin Ali Abir', 
    logo: '',
    navigationLinks: [
      { id: '1', label: 'About Me', type: 'section', target: 'hero', isVisible: true },
      { id: '2', label: 'My Work', type: 'section', target: 'portfolio', isVisible: true },
      { id: '3', label: 'Contact Me', type: 'section', target: 'contact', isVisible: true }
    ],
    showAdminButton: true
  };
  
  // Merge defaultHeaderSettings with headerSettings to ensure all properties exist
  const header = {
    ...defaultHeaderSettings,
    ...headerSettings,
    navigationLinks: headerSettings?.navigationLinks || defaultHeaderSettings.navigationLinks
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLinkClick = (link: any) => {
    if (link.type === 'section') {
      scrollToSection(link.target);
    } else if (link.type === 'url') {
      if (link.openInNewTab) {
        window.open(link.target, '_blank');
      } else {
        window.location.href = link.target;
      }
    } else if (link.type === 'page') {
      // Handle internal page navigation (could be extended for SPA routing)
      window.location.href = `/${link.target}`;
    }
    setIsMenuOpen(false);
  };

  const visibleLinks = header.navigationLinks.filter(link => link.isVisible);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-lg"
      style={{ backgroundColor: `${primaryColor}f0` }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="cursor-pointer" onClick={() => scrollToSection('hero')}>
            {header.useText ? (
              <div className="text-white font-bold text-xl">
                {header.text}
              </div>
            ) : (
              header.logo && (
                <img
                  src={header.logo}
                  alt="Logo"
                  className="h-8 object-contain"
                  style={{ maxHeight: '32px' }}
                />
              )
            )}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {visibleLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link)}
                className="text-white hover:text-blue-200 transition-colors duration-300 font-medium"
              >
                {link.label}
              </button>
            ))}
            {showAdminButton && header.showAdminButton && (
              <button
                onClick={onAdminToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isAdminMode 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-white hover:bg-gray-100 text-blue-600'
                }`}
                style={!isAdminMode ? { color: primaryColor } : {}}
              >
                Admin Panel
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-blue-500">
            <div className="flex flex-col space-y-3 pt-4">
              {visibleLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link)}
                  className="text-white hover:text-blue-200 transition-colors duration-300 font-medium text-left"
                >
                  {link.label}
                </button>
              ))}
              {showAdminButton && header.showAdminButton && (
                <button
                  onClick={() => {
                    onAdminToggle();
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 w-fit ${
                    isAdminMode 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-white hover:bg-gray-100 text-blue-600'
                  }`}
                  style={!isAdminMode ? { color: primaryColor } : {}}
                >
                  Admin Panel
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;