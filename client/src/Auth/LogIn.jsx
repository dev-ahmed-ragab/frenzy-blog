import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../Redux/UserSlice";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(formData));
  };

  return (
    <div className="min-h-screen mx-3 md:mx-0  flex items-center justify-center bg-[#dde7f5] ">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Log In</h2>
        <input
        
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded mt-5"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded mt-5"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mt-10"
        >
            Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
