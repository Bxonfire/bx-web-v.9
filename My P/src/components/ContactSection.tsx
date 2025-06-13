import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { ContactInfo, ThemeColors } from '../types';

interface ContactSectionProps {
  contactInfo?: ContactInfo;
  themeColors?: ThemeColors;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contactInfo, themeColors }) => {
  const defaultContact: ContactInfo = {
    email: 'yasinaliabir@gmail.com',
    phone: '+880 123 456 789',
    address: 'House 123, Road 456',
    city: 'Dhaka',
    country: 'Bangladesh'
  };

  const contact = contactInfo || defaultContact;
  const primaryColor = themeColors?.primary || '#2563eb';
  const textColor = themeColors?.text || '#1f2937';
  const textSecondaryColor = themeColors?.textSecondary || '#6b7280';
  const surfaceColor = themeColors?.surface || '#f8fafc';

  return (
    <section 
      id="contact" 
      className="py-16"
      style={{ 
        background: `linear-gradient(135deg, ${primaryColor}10, ${surfaceColor})` 
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 
            className="text-4xl font-bold text-center mb-12 animate-fade-in-up"
            style={{ color: textColor }}
          >
            Get In Touch
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8 animate-slide-in-left">
              <div>
                <h3 
                  className="text-2xl font-bold mb-6"
                  style={{ color: textColor }}
                >
                  Let's Work Together
                </h3>
                <p 
                  className="text-lg leading-relaxed mb-8"
                  style={{ color: textSecondaryColor }}
                >
                  Ready to bring your vision to life? I'm here to help you create stunning designs that make an impact. Let's discuss your project and see how we can work together.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 
                      className="font-semibold"
                      style={{ color: textColor }}
                    >
                      Email
                    </h4>
                    <p style={{ color: textSecondaryColor }}>{contact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 
                      className="font-semibold"
                      style={{ color: textColor }}
                    >
                      Phone
                    </h4>
                    <p style={{ color: textSecondaryColor }}>{contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 
                      className="font-semibold"
                      style={{ color: textColor }}
                    >
                      Location
                    </h4>
                    <p style={{ color: textSecondaryColor }}>
                      {contact.address}, {contact.city}, {contact.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="animate-slide-in-right">
              <form className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: textColor }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: textColor }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: textColor }}
                  >
                    Project Type
                  </label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                  >
                    <option>Logo Design</option>
                    <option>YouTube Thumbnail</option>
                    <option>Social Media Design</option>
                    <option>Business Card</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: textColor }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300"
                    style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;