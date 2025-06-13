import React from 'react';
import { ContactInfo } from '../../types';

interface ContactEditorProps {
  contactInfo: ContactInfo;
  onUpdate: (contactInfo: ContactInfo) => void;
}

const ContactEditor: React.FC<ContactEditorProps> = ({ contactInfo, onUpdate }) => {
  const updateField = (field: keyof ContactInfo, value: string) => {
    onUpdate({ ...contactInfo, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Contact Information Editor</h3>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={contactInfo.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+880 123 456 789"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={contactInfo.address}
              onChange={(e) => updateField('address', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="House 123, Road 456"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={contactInfo.city}
              onChange={(e) => updateField('city', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Dhaka"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <input
              type="text"
              value={contactInfo.country}
              onChange={(e) => updateField('country', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Bangladesh"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Preview:</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Email:</strong> {contactInfo.email}</p>
            <p><strong>Phone:</strong> {contactInfo.phone}</p>
            <p><strong>Address:</strong> {contactInfo.address}, {contactInfo.city}, {contactInfo.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;