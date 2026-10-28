import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { signUp } from "../Redux/UserSlice";
import logo from "../assets/logo.webp";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isLoadingUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const resultAction = await dispatch(signUp(formData));
    if (signUp.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10 relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#d681d6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4 transition-transform hover:scale-105">
            <img src={logo} alt="Frenzy Blog Logo" className="h-10 mx-auto object-contain" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-1">
            <span>Join the Frenzy Blog community</span>
            <Sparkles className="w-4 h-4 text-[#d681d6]" />
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Full Name / Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="h-5 w-5" />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Ahmed Ragab"
                className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.username ? "border-red-500 ring-1 ring-red-500" : "border-gray-200"
                  } rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#d681d6] focus:bg-white focus:ring-2 focus:ring-[#d681d6]/20 transition-all`}
                required
              />
            </div>
            {errors.username && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.username}</p>
            )}
          </div>

          {/* Email field */}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className={`w-full pl-11 pr-4 py-3 bg-gray-50 border ${errors.email ? "border-red-500 ring-1 ring-red-500" : "border-gray-200"
                  } rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#d681d6] focus:bg-white focus:ring-2 focus:ring-[#d681d6]/20 transition-all`}
                required
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Password field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={`w-full pl-11 pr-11 py-3 bg-gray-50 border ${errors.password ? "border-red-500 ring-1 ring-red-500" : "border-gray-200"
                  } rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#d681d6] focus:bg-white focus:ring-2 focus:ring-[#d681d6]/20 transition-all`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.password}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoadingUser}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white font-semibold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
          >
            {isLoadingUser ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer switch to LogIn */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-gray-900 hover:text-[#d681d6] transition-colors"
          >
            Log in instead
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
