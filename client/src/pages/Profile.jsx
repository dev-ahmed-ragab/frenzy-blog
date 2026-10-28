import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Camera,
  Trash2,
  Edit3,
  Calendar,
  ShieldCheck,
  X,
  Loader2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  API_URL,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  uploadUserAvatar,
} from "../services/api";
import { logout, updateUserCredentials } from "../Redux/UserSlice";
import adminFallback from "../assets/admin.jpg";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { token, id: reduxUserId, username: reduxUsername, email: reduxEmail } = useSelector(
    (state) => state.user
  );

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [userData, setUserData] = useState({
    _id: reduxUserId || "",
    username: reduxUsername || "",
    email: reduxEmail || "",
    avatar: "",
  });

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      toast.error("Please log in to view your profile");
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch latest user data
  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();
        if (isMounted && data) {
          setUserData(data);
          setEditForm({
            username: data.username || "",
            email: data.email || "",
            password: "",
          });
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [token]);

  // Construct proper avatar source URL
  const getAvatarUrl = () => {
    if (userData.avatar) {
      if (userData.avatar.startsWith("http")) return userData.avatar;
      return `${API_URL}${userData.avatar}`;
    }
    return adminFallback;
  };

  // Open Edit Modal
  const handleOpenEditModal = () => {
    setEditForm({
      username: userData.username || "",
      email: userData.email || "",
      password: "",
    });
    setIsEditModalOpen(true);
  };

  // Handle Edit Profile submission
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!editForm.username.trim() || !editForm.email.trim()) {
      toast.error("Username and email cannot be empty");
      return;
    }

    try {
      setUpdating(true);
      const payload = {
        username: editForm.username.trim(),
        email: editForm.email.trim(),
      };
      if (editForm.password && editForm.password.trim().length >= 6) {
        payload.password = editForm.password.trim();
      }

      const updated = await updateUserProfile(userData._id || reduxUserId, payload);
      setUserData((prev) => ({
        ...prev,
        username: updated.username,
        email: updated.email,
      }));

      // Sync with Redux & LocalStorage
      dispatch(
        updateUserCredentials({
          username: updated.username,
          email: updated.email,
        })
      );

      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  // Trigger file selection for avatar upload
  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size should be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploadingAvatar(true);
      const res = await uploadUserAvatar(userData._id || reduxUserId, formData);
      if (res?.avatarUrl) {
        setUserData((prev) => ({ ...prev, avatar: res.avatarUrl }));
        toast.success("Profile picture updated!");
      }
    } catch (err) {
      toast.error(err.message || "Failed to upload avatar");
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Handle Account Deletion
  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);
      await deleteUserProfile(userData._id || reduxUserId);
      toast.success("Your account has been permanently deleted");
      dispatch(logout());
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Failed to delete account");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#d681d6] mb-3" />
        <p className="text-gray-600 font-medium text-sm">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
        {/* Cover header with gradient accent */}
        <div className="h-44 sm:h-52 bg-gradient-to-r from-gray-900 via-purple-950 to-[#d681d6] relative">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-semibold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Active Account</span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 sm:px-10 pb-10">
          {/* Avatar and Main Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-20 sm:-mt-24 mb-8 gap-4">
            <div className="relative group">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-white shadow-2xl overflow-hidden ring-4 ring-white">
                <img
                  src={getAvatarUrl()}
                  alt={userData.username || "Profile"}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarFileChange}
                accept="image/*"
                className="hidden"
              />

              {/* Camera upload button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                aria-label="Upload Avatar"
                className="absolute bottom-2 right-2 bg-black hover:bg-[#d681d6] text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 disabled:opacity-70 disabled:cursor-not-allowed"
                title="Change Avatar"
              >
                {uploadingAvatar ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-4 sm:mt-0 flex-wrap justify-center">
              <button
                onClick={handleOpenEditModal}
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-md transition-all duration-200 hover:shadow-lg"
              >
                <Edit3 className="w-4 h-4 text-[#d681d6]" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-colors border border-red-200"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* User Details Overview */}
          <div className="border-b border-gray-100 pb-8 mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2 justify-center sm:justify-start">
              <span>{userData.username || "Frenzy Blogger"}</span>
              <CheckCircle2 className="w-5 h-5 text-[#d681d6]" />
            </h1>
            <p className="text-gray-500 text-sm mt-1">{userData.email || "No email available"}</p>
          </div>

          {/* Profile Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm text-gray-700">
                <User className="w-5 h-5 text-[#d681d6]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Full Username
                </p>
                <p className="text-base font-bold text-gray-800 mt-0.5">
                  {userData.username || "Ahmed Ragab"}
                </p>
              </div>
            </div>

            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm text-gray-700">
                <Mail className="w-5 h-5 text-[#d681d6]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Email Address
                </p>
                <p className="text-base font-bold text-gray-800 mt-0.5 break-all">
                  {userData.email}
                </p>
              </div>
            </div>

            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm text-gray-700">
                <Calendar className="w-5 h-5 text-[#d681d6]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Role & Status
                </p>
                <p className="text-base font-bold text-gray-800 mt-0.5">
                  Verified Author & Member
                </p>
              </div>
            </div>

            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm text-gray-700">
                <ShieldCheck className="w-5 h-5 text-[#d681d6]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Security
                </p>
                <p className="text-base font-bold text-gray-800 mt-0.5">
                  JWT Authenticated Session
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-gray-100 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Update your account credentials and personal details
                  </p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) =>
                        setEditForm({ ...editForm, username: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#d681d6] focus:bg-white focus:ring-2 focus:ring-[#d681d6]/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#d681d6] focus:bg-white focus:ring-2 focus:ring-[#d681d6]/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
                    New Password (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      type="password"
                      placeholder="Leave blank to keep current password"
                      value={editForm.password}
                      onChange={(e) =>
                        setEditForm({ ...editForm, password: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-[#d681d6] focus:bg-white focus:ring-2 focus:ring-[#d681d6]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-5 py-2.5 rounded-2xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-2.5 rounded-2xl font-semibold text-sm shadow-md transition-all disabled:opacity-60"
                  >
                    {updating && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{updating ? "Saving..." : "Save Changes"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-100 text-red-600 p-3 rounded-2xl">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Delete Account</h3>
                  <p className="text-xs text-gray-500">This action cannot be undone</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Are you sure you want to delete your Frenzy account? All your personal
                settings and articles associated with this account may be affected.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={deleting}
                  className="px-5 py-2.5 rounded-2xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={deleting}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-2xl font-semibold text-sm shadow-md transition-all disabled:opacity-60"
                >
                  {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{deleting ? "Deleting..." : "Yes, Delete"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
