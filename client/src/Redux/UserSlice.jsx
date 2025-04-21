import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
let toastId;
// actions
export const signUp = createAsyncThunk("user/signUp", async (values) => {
    // const navigate = useNavigate();
    toastId = toast.loading("Signing up...");
    console.log("Sign up values:", values);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        values
      );
      console.log("Sign up response:kugjyg");
     
      return data;
    } catch (error) {
      console.error("Sign up error:", error.response?.data);
      toast.error(error.response?.data?.message || "Sign up failed");
    } finally {
      toast.dismiss(toastId);
    }
});
  
 
export const logIn = createAsyncThunk("user/logIn", async (values) => {
    toastId = toast.loading("Logging in...");
  
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        values,  
        {
          headers: {
            "Content-Type": "application/json",  
          },
        }
      );
  
      if (data.message === "success") {
        toast.success("Welcome back");
     
      }
      console.log("Login response:", data);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      toast.dismiss(toastId);
    }
});
  
 

//slice
const user = createSlice({
name: "user",
initialState: {
    token: localStorage.getItem("token"),
    id: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    isLoadingUser: false
},
reducers: {
    logout: (state) => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    state.token = null;
    state.id = null;
    state.username = null;
    state.email = null;
    }
},
extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
        if (action.payload) {
            const { token, _id, username, email } = action.payload;
            
            localStorage.setItem("userId", _id);
            localStorage.setItem("token", token);

            localStorage.setItem("username", username);
            localStorage.setItem("email", email);

            state.token = token;
            state.id = _id;
            state.username = username;
            state.email = email;
        }
        window.location.href = "/";
        state.isLoadingUser = false;
    });

    builder.addCase(logIn.pending, (state) => {
    state.isLoadingUser = true;
   
    });

    builder.addCase(signUp.fulfilled, (state,action) => {
        state.isLoadingUser = false;
        
        if (action.payload) {
            const { token, _id, username, email } = action.payload;
            
            localStorage.setItem("userId", _id);
            localStorage.setItem("token", token);

            localStorage.setItem("username", username);
            localStorage.setItem("email", email);

            state.token = token;
            state.id = _id;
            state.username = username;
            state.email = email;
        }

        window.location.href = "/";
    });

    builder.addCase(signUp.pending, (state) => {
    state.isLoadingUser = true;
    });
},
});

export const userReducer = user.reducer;
export const { logout } = user.actions;

 
//slice
