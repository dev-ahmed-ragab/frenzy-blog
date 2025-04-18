import { useState, useEffect } from 'react';

const PostForm = ({ post, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'other',
    image: null // لإضافة ملف الصورة الجديد
  });

  const [previewImage, setPreviewImage] = useState(null); // لعرض معاينة الصورة

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        category: post.category || 'other',
        image: null // تهيئة الصورة الجديدة كـ null
      });
      // إذا كان هناك صورة قديمة، يتم عرضها كمعاينة
      if (post.image) {
        setPreviewImage(post.image);
      } else {
        setPreviewImage(null);
      }
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('category', formData.category);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
    onSubmit(formDataToSend);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file }); // تحديث بيانات النموذج بالصورة الجديدة
      const imageUrl = URL.createObjectURL(file); // إنشاء معاينة للصورة
      setPreviewImage(imageUrl);
    }
  };

  const categories = ['frontend', 'backend', 'fullstack', 'devops', 'database', 'other'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {post ? 'تعديل المنشور' : 'إضافة منشور جديد'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* حقل العنوان */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              العنوان
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

          {/* حقل المحتوى */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              المحتوى
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* حقل التصنيف */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              التصنيف
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

          {/* حقل رفع الصورة */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              رفع صورة
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

          {/* أزرار الإلغاء والنشر/التحديث */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {post ? 'تحديث' : 'نشر'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;