import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItems } from '../contexts/ItemsContext';
import { X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { categories, locations } from '../lib/constants';
import { fileToBase64 } from '../lib/utils';

const PostItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'lost',
    category: 'other',
    location: 'other',
    date: new Date().toISOString().split('T')[0],
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addItem } = useItems();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      let base64Image = null;
      if (formData.image) {
        base64Image = await fileToBase64(formData.image);
      }
  
      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        category: formData.category,
        location: formData.location,
        date: formData.date,
        image: base64Image,
      };
  
      const result = await addItem(payload);
  
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error posting item:', error);
      toast.error('Failed to post item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10  rounded-3xl border border-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">📦 Post an Item</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8  space-y-8"
      >
        {/* Title */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Title *
          </label>
          <input
            type="text"
            placeholder="E.g. Lost wallet at the library"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Description *
          </label>
          <textarea
            placeholder="Describe the item in detail..."
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            required
            className="w-full min-h-[120px] rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-900"
          />
        </div>

        {/* Type and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, type: e.target.value }))
              }
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Location and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Location *
            </label>
            <select
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {locations.map((location) => (
                <option key={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Date {formData.type === 'lost' ? 'Lost' : 'Found'} *
            </label>
            <input
              type="date"
              value={formData.date}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Image (Optional)
          </label>

          {imagePreview ? (
            <div className="relative inline-block">
              <img
                src={imagePreview || '/place-holder.jpg'}
                alt="Preview"
                className="w-full max-w-sm h-48 object-cover rounded-xl border border-gray-300"
              />
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, image: null }));
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-white border border-red-500 text-red-600 hover:bg-red-500 hover:text-white rounded-full p-1 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-48 w-full border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Click to upload</span> or drag &
                  drop
                </p>
                <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-4 border-t border-gray-200 space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl px-5 py-2.5 border text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl px-6 py-2.5 bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50 transition"
          >
            {loading ? 'Posting...' : 'Post Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostItem;
