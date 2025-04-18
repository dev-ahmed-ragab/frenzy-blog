import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { PencilIcon, TrashIcon, CameraIcon } from '@heroicons/react/24/outline';

Modal.setAppElement('#root');

const Profile = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDE0ZmU5M2ZjODQwODVmNTdmYmM1YSIsImlhdCI6MTc0NDkxNjQ1OCwiZXhwIjoxNzQ1MDAyODU4fQ.RmcKHX65xM0XdX8vQQPTbJWOXhOMiff3jEaBtE0zDYo'
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password
        })
      });
      if (response.ok) {
        alert('Profile updated successfully');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    avatar: ''
  });
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDE0ZmU5M2ZjODQwODVmNTdmYmM1YSIsImlhdCI6MTc0NDkxNjQ1OCwiZXhwIjoxNzQ1MDAyODU4fQ.RmcKHX65xM0XdX8vQQPTbJWOXhOMiff3jEaBtE0zDYo'
          }
        });
        const data = await response.json();
        setUserData(data);
        setAvatarPreview(data.avatar);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      // Send delete request to backend
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async () => {
    try {
      const formData = new FormData();
      const fileInput = document.querySelector('input[type="file"]');
      if (!fileInput.files[0]) {
        alert('الرجاء اختيار صورة');
        return;
      }
      formData.append('avatar', fileInput.files[0]);

      const response = await fetch(`http://localhost:5000/api/users/${userData._id}/avatar`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDE0ZmU5M2ZjODQwODVmNTdmYmM1YSIsImlhdCI6MTc0NDkxNjQ1OCwiZXhwIjoxNzQ1MDAyODU4fQ.RmcKHX65xM0XdX8vQQPTbJWOXhOMiff3jEaBtE0zDYo'
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(prev => ({ ...prev, avatar: data.avatarUrl }));
        setIsAvatarModalOpen(false);
      } else {
        alert('فشل تحميل الصورة');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('حدث خطأ أثناء تحميل الصورة');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PencilIcon className="h-5 w-5 mr-2" />
            Edit Profile
          </button>
          <button
            onClick={handleDeleteAccount}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ml-2"
          >
            <TrashIcon className="h-5 w-5 mr-2" />
            Delete Account
          </button>
          <button
            onClick={() => setIsAvatarModalOpen(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-2"
          >
            <CameraIcon className="h-5 w-5 mr-2" />
            Change Avatar
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={'http://localhost:5000' + avatarPreview}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="mb-4">
            <label className="text-sm text-gray-600">Full Name</label>
            <p className="text-lg font-semibold">{userData.username}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <p className="text-lg font-semibold">{userData.email}</p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="username"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              value={userData.username}
              onChange={(e) => setUserData({...userData, username: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isAvatarModalOpen}
        onRequestClose={() => setIsAvatarModalOpen(false)}
        className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">تغيير الصورة الشخصية</h2>
          <button
            onClick={() => setIsAvatarModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="mb-4 w-full p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-center mb-4">
          <img
            src={avatarPreview || 'http://localhost:5000' + userData.avatar}
            alt="معاينة الصورة"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsAvatarModalOpen(false)}
            className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleAvatarUpload}
            className="py-2 px-4 border border-transparent rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            تحميل
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;