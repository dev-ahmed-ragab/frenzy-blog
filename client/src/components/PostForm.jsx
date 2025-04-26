import { useState, useEffect } from 'react';

const PostForm = ({ post, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'other',
    image: null // for adding new image file
  });

  const [previewImage, setPreviewImage] = useState(null); // for showing image preview

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category || 'other',
        image: null
      });
      // if there's an old image, show it as preview
      if (post.image) {
        setPreviewImage(post.image);
      } else {
        setPreviewImage(null);
      }
    }
  }, [post]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Validate required fields
      if (!formData.title.trim()) {
        alert('Post title is required');
        return;
      }
      if (!formData.content.trim()) {
        alert('Post content is required');
        return;
      }
      if (!formData.category) {
        alert('Post category is required');
        return;
      }

      const formDataToSend = new FormData();
      
      // Add basic data
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('content', formData.content.trim());
      formDataToSend.append('category', formData.category);
      
      // Handle image
      if (formData.image) {
        // Check image size and format
        if (formData.image.size > 5 * 1024 * 1024) { // 5MB
          alert('Image size must be less than 5MB');
          return;
        }
        formDataToSend.append('image', formData.image);
      }
      
      // If this is an update to an existing post
      if (post) {
        formDataToSend.append('postId', post._id);
        // If no new image is uploaded, keep the old image
        if (!formData.image && post.imageUrl) {
          formDataToSend.append('imageUrl', post.imageUrl);
        }
      }

      // Log post data to console for verification
      const formDataObj = {};
      for (let [key, value] of formDataToSend.entries()) {
        formDataObj[key] = value;
      }
      console.log('Post data before sending:', formDataObj);
      
      await onSubmit(formDataToSend);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.message || 'An error occurred while saving the post');
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file }); // update form data with new image
      const imageUrl = URL.createObjectURL(file); // create image preview
      setPreviewImage(imageUrl);
    }
  };

  const categories = ['frontend', 'backend', 'fullstack', 'devops', 'database', 'other'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {post ? 'Edit Post' : 'Add New Post'}
        </h2>
        <form onSubmit={(event) => handleSubmit(event)} className="space-y-4">
          {/* Title field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              maxLength={100}
            />
          </div>

          {/* Content field */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category field */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Image upload field */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {/* Cancel and Publish/Update buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {post ? 'Update' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
