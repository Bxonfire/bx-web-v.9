import React from 'react';
import { Course } from '../../types';
import { Plus, Trash2, Upload, Palette } from 'lucide-react';

interface CoursesEditorProps {
  courses: Course[];
  onUpdate: (courses: Course[]) => void;
}

const CoursesEditor: React.FC<CoursesEditorProps> = ({ courses, onUpdate }) => {
  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: '',
      subtitle: '',
      image: '',
      originalPrice: '',
      discountedPrice: '',
      enrollUrl: '',
      buttonText: 'ENROLL NOW',
      buttonColor: '#f59e0b'
    };
    onUpdate([...courses, newCourse]);
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    onUpdate(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const deleteCourse = (id: string) => {
    onUpdate(courses.filter(course => course.id !== id));
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        updateCourse(id, 'image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = (file: File, maxWidth: number, maxHeight: number, quality: number = 0.8): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const resizedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(resizedDataUrl);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUploadWithResize = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Resize image to optimal dimensions for course cards
        const resizedImage = await resizeImage(file, 800, 600, 0.85);
        updateCourse(id, 'image', resizedImage);
      } catch (error) {
        console.error('Error resizing image:', error);
        // Fallback to original upload method
        handleImageUpload(id, e);
      }
    }
  };

  const buttonColorPresets = [
    { name: 'Orange', color: '#f59e0b' },
    { name: 'Blue', color: '#3b82f6' },
    { name: 'Green', color: '#10b981' },
    { name: 'Red', color: '#ef4444' },
    { name: 'Purple', color: '#8b5cf6' },
    { name: 'Pink', color: '#ec4899' },
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Teal', color: '#14b8a6' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Courses Editor</h3>
        <button
          onClick={addCourse}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Course
        </button>
      </div>

      <div className="space-y-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-semibold text-gray-700">Course</h4>
              <button
                onClick={() => deleteCourse(course.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={course.title}
                  onChange={(e) => updateCourse(course.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={course.subtitle}
                  onChange={(e) => updateCourse(course.id, 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Image (Auto-Resize Enabled)
              </label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUploadWithResize(course.id, e)}
                    className="hidden"
                    id={`image-upload-${course.id}`}
                  />
                  <label
                    htmlFor={`image-upload-${course.id}`}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                  >
                    <Upload size={18} />
                    Upload & Auto-Resize
                  </label>
                  {course.image && (
                    <img
                      src={course.image}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  )}
                </div>
                <input
                  type="text"
                  value={course.image}
                  onChange={(e) => updateCourse(course.id, 'image', e.target.value)}
                  placeholder="Or enter image URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                  ✅ Images are automatically resized to 800x600px and optimized for web
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price
                </label>
                <input
                  type="text"
                  value={course.originalPrice}
                  onChange={(e) => updateCourse(course.id, 'originalPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discounted Price
                </label>
                <input
                  type="text"
                  value={course.discountedPrice}
                  onChange={(e) => updateCourse(course.id, 'discountedPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enroll URL
                </label>
                <input
                  type="text"
                  value={course.enrollUrl}
                  onChange={(e) => updateCourse(course.id, 'enrollUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Button Customization */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h5 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                <Palette size={18} />
                Button Customization
              </h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={course.buttonText || 'ENROLL NOW'}
                    onChange={(e) => updateCourse(course.id, 'buttonText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ENROLL NOW"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={course.buttonColor || '#f59e0b'}
                      onChange={(e) => updateCourse(course.id, 'buttonColor', e.target.value)}
                      className="w-12 h-8 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={course.buttonColor || '#f59e0b'}
                      onChange={(e) => updateCourse(course.id, 'buttonColor', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                      placeholder="#f59e0b"
                    />
                  </div>
                </div>
              </div>

              {/* Color Presets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Color Presets
                </label>
                <div className="flex flex-wrap gap-2">
                  {buttonColorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => updateCourse(course.id, 'buttonColor', preset.color)}
                      className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500 transition-colors"
                      style={{ backgroundColor: preset.color }}
                      title={preset.name}
                    />
                  ))}
                </div>
              </div>

              {/* Button Preview */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Preview
                </label>
                <button
                  className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105"
                  style={{ backgroundColor: course.buttonColor || '#f59e0b' }}
                >
                  {course.buttonText || 'ENROLL NOW'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesEditor;