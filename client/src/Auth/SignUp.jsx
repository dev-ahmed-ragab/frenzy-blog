import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../Redux/UserSlice";
import { Toaster, toast } from "react-hot-toast";

const SignUp = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long.";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    dispatch(signUp(formData));
    
  };

  return (
    <div className="min-h-screen mx-3 md:mx-0 flex items-center justify-center bg-[#dde7f5] ">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md "
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <input
          id="1"
          type="text"
          name="username"
          placeholder="Name"
          className="w-full p-2 mb-1 border rounded mt-5"
          onChange={handleChange}
          required
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-2">{errors.username}</p>
        )}

        <input
            id="2"
          type="text"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-1 border rounded mt-5"
          onChange={handleChange}
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        <input
            id="3"
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-1 border rounded mt-5"
          onChange={handleChange}
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-4">{errors.password}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-10"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;

