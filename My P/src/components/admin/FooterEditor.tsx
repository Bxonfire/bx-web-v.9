import React from 'react';
import { FooterSettings, SocialMediaLink } from '../../types';
import { Plus, Trash2, Eye, EyeOff, Upload } from 'lucide-react';

interface FooterEditorProps {
  footerSettings: FooterSettings;
  onUpdate: (footerSettings: FooterSettings) => void;
}

const FooterEditor: React.FC<FooterEditorProps> = ({ footerSettings, onUpdate }) => {
  const addSocialLink = () => {
    const newLink: SocialMediaLink = {
      id: Date.now().toString(),
      name: '',
      url: '',
      icon: 'globe',
      isVisible: true
    };
    onUpdate({
      ...footerSettings,
      socialLinks: [...footerSettings.socialLinks, newLink]
    });
  };

  const updateSocialLink = (id: string, field: keyof SocialMediaLink, value: string | boolean) => {
    onUpdate({
      ...footerSettings,
      socialLinks: footerSettings.socialLinks.map(link =>
        link.id === id ? { ...link, [field]: value } : link
      )
    });
  };

  const deleteSocialLink = (id: string) => {
    onUpdate({
      ...footerSettings,
      socialLinks: footerSettings.socialLinks.filter(link => link.id !== id)
    });
  };

  const handleCustomIconUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        updateSocialLink(id, 'icon', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const popularIcons = [
    { name: 'Facebook', icon: 'facebook', color: 'bg-blue-600' },
    { name: 'Instagram', icon: 'instagram', color: 'bg-pink-600' },
    { name: 'YouTube', icon: 'youtube', color: 'bg-red-600' },
    { name: 'Twitter/X', icon: 'twitter', color: 'bg-sky-500' },
    { name: 'LinkedIn', icon: 'linkedin', color: 'bg-blue-700' },
    { name: 'TikTok', icon: 'tiktok', color: 'bg-black' },
    { name: 'Behance', icon: 'behance', color: 'bg-blue-500' },
    { name: 'Dribbble', icon: 'dribbble', color: 'bg-pink-500' },
    { name: 'Pinterest', icon: 'pinterest', color: 'bg-red-500' },
    { name: 'GitHub', icon: 'github', color: 'bg-gray-800' },
    { name: 'Discord', icon: 'discord', color: 'bg-indigo-600' },
    { name: 'Telegram', icon: 'telegram', color: 'bg-blue-500' },
    { name: 'WhatsApp', icon: 'whatsapp', color: 'bg-green-500' },
    { name: 'Snapchat', icon: 'snapchat', color: 'bg-yellow-400' },
    { name: 'Reddit', icon: 'reddit', color: 'bg-orange-600' },
    { name: 'Twitch', icon: 'twitch', color: 'bg-purple-600' },
    { name: 'Spotify', icon: 'spotify', color: 'bg-green-600' },
    { name: 'SoundCloud', icon: 'soundcloud', color: 'bg-orange-500' },
    { name: 'Medium', icon: 'medium', color: 'bg-gray-700' },
    { name: 'Website', icon: 'globe', color: 'bg-gray-600' },
    { name: 'Email', icon: 'mail', color: 'bg-gray-600' }
  ];

  const addPopularIcon = (iconData: { name: string; icon: string; color: string }) => {
    const newLink: SocialMediaLink = {
      id: Date.now().toString(),
      name: iconData.name,
      url: '',
      icon: iconData.icon,
      isVisible: true
    };
    onUpdate({
      ...footerSettings,
      socialLinks: [...footerSettings.socialLinks, newLink]
    });
  };

  const isCustomIcon = (icon: string) => {
    return icon.startsWith('data:image/') || icon.startsWith('http');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Footer & Social Media Editor</h3>
      
      {/* Copyright Section */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Copyright Text</h4>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Copyright Text
          </label>
          <input
            type="text"
            value={footerSettings.copyrightText}
            onChange={(e) => onUpdate({ ...footerSettings, copyrightText: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Copyright © 2025 Your Name"
          />
        </div>
      </div>

      {/* Popular Social Media Icons */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Add Popular Platforms</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {popularIcons.map((iconData) => (
            <button
              key={iconData.icon}
              onClick={() => addPopularIcon(iconData)}
              className={`${iconData.color} text-white p-3 rounded-lg hover:opacity-80 transition-all duration-300 transform hover:scale-105 flex flex-col items-center space-y-2`}
              title={`Add ${iconData.name}`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {iconData.icon === 'behance' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.498 1.19.906.26 1.576.72 2.022 1.37.448.66.672 1.48.672 2.45 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.76-.62.16-1.25.24-1.89.24H0V4.51h6.938v-.007zM3.495 8.21h2.563c.62 0 1.11-.89 1.11-.89s.18-.76-.05-1.24c-.23-.48-.64-.7-1.23-.7H3.495v2.83zm0 4.51h3.14c.48 0 .896-.227 1.143-.643.246-.417.146-1.09.146-1.09s.227-.86-.407-1.1c-.635-.24-1.238-.17-1.238-.17H3.495v2.993zM15.972 10.18c-1.017 0-1.827.677-1.827 1.513h3.65c0-.836-.81-1.513-1.823-1.513zM15.972 17.2c1.65 0 2.98-1.33 2.98-2.98 0-1.65-1.33-2.98-2.98-2.98s-2.98 1.33-2.98 2.98c0 1.65 1.33 2.98 2.98 2.98zm5.54-11.83h-4.62v-1.2h4.62v1.2z"/>
                  </svg>
                ) : iconData.icon === 'discord' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                ) : iconData.icon === 'telegram' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                ) : iconData.icon === 'whatsapp' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                ) : iconData.icon === 'snapchat' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                ) : iconData.icon === 'reddit' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                ) : iconData.icon === 'twitch' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                ) : iconData.icon === 'spotify' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                ) : iconData.icon === 'soundcloud' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.255-2.154c-.009-.057-.049-.1-.099-.1m1.33.638c-.058 0-.106.053-.106.116l-.178 1.515.178 1.456c0 .063.048.115.106.115.059 0 .106-.052.106-.115l.194-1.456-.194-1.515c0-.063-.047-.116-.106-.116m1.308.32c-.062 0-.111.057-.111.128l-.16 1.195.16 1.138c0 .071.049.128.111.128.061 0 .111-.057.111-.128l.176-1.138-.176-1.195c0-.071-.05-.128-.111-.128m1.298.24c-.064 0-.118.061-.118.137l-.139.955.139.914c0 .076.054.137.118.137.065 0 .119-.061.119-.137l.153-.914-.153-.955c0-.076-.054-.137-.119-.137m1.306.092c-.069 0-.125.065-.125.146l-.124.763.124.728c0 .081.056.146.125.146.068 0 .124-.065.124-.146l.137-.728-.137-.763c0-.081-.056-.146-.124-.146m1.295.117c-.071 0-.128.069-.128.154l-.109.646.109.618c0 .085.057.154.128.154.071 0 .128-.069.128-.154l.12-.618-.12-.646c0-.085-.057-.154-.128-.154m1.291.136c-.074 0-.133.073-.133.163l-.096.529.096.506c0 .09.059.163.133.163.074 0 .132-.073.132-.163l.105-.506-.105-.529c0-.09-.058-.163-.132-.163m1.299.154c-.076 0-.137.077-.137.172l-.08.375.08.359c0 .095.061.172.137.172.076 0 .136-.077.136-.172l.088-.359-.088-.375c0-.095-.06-.172-.136-.172m1.287.186c-.079 0-.142.081-.142.181l-.066.189.066.181c0 .1.063.181.142.181.078 0 .141-.081.141-.181l.072-.181-.072-.189c0-.1-.063-.181-.141-.181M12 7.001c-.082 0-.148.085-.148.189l-.051.81.051.777c0 .104.066.189.148.189.082 0 .148-.085.148-.189l.056-.777-.056-.81c0-.104-.066-.189-.148-.189m1.299.967c-.084 0-.151.089-.151.199l-.033.833.033.799c0 .11.067.199.151.199.084 0 .15-.089.15-.199l.036-.799-.036-.833c0-.11-.066-.199-.15-.199m1.284 1.152c-.086 0-.154.093-.154.208l-.018.675.018.646c0 .115.068.208.154.208.085 0 .153-.093.153-.208l.02-.646-.02-.675c0-.115-.068-.208-.153-.208m1.299 1.303c-.088 0-.158.097-.158.217l-.004.542.004.52c0 .12.07.217.158.217.087 0 .157-.097.157-.217l.005-.52-.005-.542c0-.12-.07-.217-.157-.217m1.287 1.503c-.089 0-.16.101-.16.226l.011.316-.011.303c0 .125.071.226.16.226.088 0 .159-.101.159-.226l-.012-.303.012-.316c0-.125-.071-.226-.159-.226"/>
                  </svg>
                ) : iconData.icon === 'medium' ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                ) : (
                  <span className="text-xs font-bold">{iconData.name.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <span className="text-xs font-medium">{iconData.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-800">Social Media Links</h4>
          <button
            onClick={addSocialLink}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Add Custom Link
          </button>
        </div>

        <div className="space-y-4">
          {footerSettings.socialLinks.map((link) => (
            <div key={link.id} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h5 className="font-medium text-gray-700">Social Media Link</h5>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateSocialLink(link.id, 'isVisible', !link.isVisible)}
                    className={`p-1 rounded ${link.isVisible ? 'text-green-600' : 'text-gray-400'}`}
                    title={link.isVisible ? 'Visible' : 'Hidden'}
                  >
                    {link.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => deleteSocialLink(link.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    value={link.name}
                    onChange={(e) => updateSocialLink(link.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Facebook"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile URL
                  </label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://facebook.com/yourprofile"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Icon Upload
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleCustomIconUpload(link.id, e)}
                      className="hidden"
                      id={`icon-upload-${link.id}`}
                    />
                    <label
                      htmlFor={`icon-upload-${link.id}`}
                      className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <Upload size={18} />
                      Upload Icon
                    </label>
                    {isCustomIcon(link.icon) && (
                      <img
                        src={link.icon}
                        alt="Custom icon"
                        className="w-8 h-8 object-cover rounded border"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or Enter Icon URL
                  </label>
                  <input
                    type="url"
                    value={isCustomIcon(link.icon) ? link.icon : ''}
                    onChange={(e) => updateSocialLink(link.id, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/icon.png"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {footerSettings.socialLinks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No social media links added yet. Use "Quick Add" above or "Add Custom Link" to get started!
          </div>
        )}
      </div>
    </div>
  );
};

export default FooterEditor;