import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FadeInFromBottom from "../../ui/animations/FadeInFromBottom";
import axios from "axios";
import { time } from "framer-motion";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [loginData, setLoginData] = useState({ user: "", password: "" });
  const [loading,setLoading]=useState(false)
  const controller = new AbortController();
  const signal = controller.signal;

  const showLoginSection = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowForgot(false);
    setLoginData({});
  };
  const showRegisterSection = () => {
    setShowLogin(false);
    setShowRegister(true);
    setShowForgot(false);
    setLoginData({});
  };
  const showForgotSection = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowForgot(true);
    setLoginData({});
  };
  const formDataHandle = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const fullNameRegex = /^[A-Za-z]{1,20}( [A-Za-z]{1,20}){0,19}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const showError = (error) => {
    let message = "An error occurred.";

    if (error.name === "AbortError" || error.code === "ERR_CANCELED") {
      message = "Request timed out.";
    } else if (error.response?.data?.detail) {
      message = error.response.data.detail;
    } else if (error.message) {
      message = error.message;
    }

    toast.error(`❌ ${message}`, { position: "top-right" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const { user, password, email, name, confirm_password, username } = loginData;
  
    try {
      
      // Login
      if (user && password && !name) {
        const res = await axios.post(`${BASE_URL}/login/`, {
          username: user,
          password: password,
        });
  
        localStorage.setItem("token", res.data.access_token); // ✅ token stored
        toast.success("🟢 Login Successful!", { position: "top-right" });
        setLoginData({});
      }
  
      // Register
      else if (name && username && email && password && confirm_password) {
        if (!fullNameRegex.test(name)) {
          toast.error("❌ Invalid Full Name.", { position: "top-right" });
          setLoading(false);
          return;
        }
  
        if (!passwordRegex.test(password)) {
          toast.error("❌ Weak Password.", { position: "top-right" });
          setLoading(false);
          return;
        }
  
        if (password !== confirm_password) {
          toast.error("❌ Passwords do not match.", { position: "top-right" });
          setLoading(false);
          return;
        }
  
        await axios.post(`${BASE_URL}/register/`, loginData);
        toast.success("🟢 Registration Successful!", { position: "top-right" });
        setLoginData({});
        setShowLogin(true); // ✅ go to Login tab after registration
      }
  
      // Forgot password
      else if (email && !password) {
        await axios.post(`${BASE_URL}/forgot-password/`, null, {
          params: { email },
        });
  
        toast.success("🟢 Reset link sent!", { position: "top-right" });
        setLoginData({});
        setShowLogin(true); // ✅ go to Login tab after reset request
      }
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };
  const token = localStorage.getItem("token");
console.log(token); // Check if token is correctly retrieved.

  

  return (
    <div className=" flex flex-col items-center justify-center py-20">
      <div className="loginBox flex justify-center items-center mb-10">
        <button
          onClick={showLoginSection}
          className={`${
            showLogin ? "text-[rgb(167,73,255)]" : ""
          } cursor-pointer text-2xl mr-3 font-bold`}
        >
          Login
        </button>
        <span>
          <hr className="h-5 bg-none border-x-[0.1px]" />
        </span>
        <button
        
          onClick={showRegisterSection}
          className={`${
            showRegister ? "text-[rgb(167,73,255)]" : ""
          } cursor-pointer text-2xl ml-3 font-bold`}
        >
          Register
        </button>
      </div>

      {showLogin && (
        <div className="py-10 px-4 formDiv flex justify-center items-center w-10/12 md:w-2/3 lg:w-1/2 lg:p-24 shadow-[0_0px_3px_rgba(0,0,0,0.25)]">
          <form onSubmit={handleSubmit} className="w-full">
            <input
              required
              onChange={formDataHandle}
              name="user"
              type="text"
              placeholder="Username or Email"
              className="mb-7 w-full leading-10 px-3 border border-[#bdbdbd] focus:outline-none"
            />
            <input
              required
              name="password"
              onChange={formDataHandle}
              type="password"
              placeholder="Password"
              className="mb-7 w-full leading-10 px-3 border border-[#bdbdbd] focus:outline-none"
            />
            {/* <input
              type="password"
              placeholder="Confirm Password"
              className="mb-7 w-full leading-10 pl-3 border border-[#bdbdbd] focus:outline-none"
            /> */}
            <span className="flex justify-between w-full pt-2">
              {/* <span>
                <input type="checkbox" name="#" id="chk" />
                <label htmlFor="chk" className="ml-1 text-[#242424]">
                  Remember me
                </label>
              </span> */}
              <span className="w-full">
                <button
                disabled={loading}
                  type="submit"
                  className="cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed py-2 px-7 text-sm font-medium text-[#333333] bg-[#F2F2F2] hover:bg-[#A749FF] hover:text-white transition ease-linear duration-300"
                >
                  LOGIN
                </button>
              </span>
              <button
                onClick={showForgotSection}
                className="cursor-pointer w-50 py-2 text-sm text-gray-950 hover:text-[#A749FF] transition ease-linear duration-300"
              >
                Forget Password?
              </button>
            </span>
          </form>
        </div>
      )}

      {showRegister && (
        <div className="py-10 px-4 formDiv flex justify-center items-center w-10/12 md:w-2/3 lg:w-1/2 lg:p-24 shadow-[0_0px_3px_rgba(0,0,0,0.25)] ">
          <form onSubmit={handleSubmit} className="w-full">
            <input
              required
              type="text"
              maxLength="20"
              minLength="3"
              name="name"
              onChange={formDataHandle}
              placeholder="Full Name"
              className="mb-7 w-full leading-10 px-3 border border-[#bdbdbd] focus:outline-none"
            />
            <input
              onChange={formDataHandle}
              minLength="6"
              required
              maxLength="20"
              name="username"
              type="text"
              placeholder="Username"
              className="mb-7 w-full leading-10 px-3 border border-[#bdbdbd] focus:outline-none"
            />
            <input
              onChange={formDataHandle}
              maxLength="30"
              name="email"
              required
              type="email"
              placeholder="Email"
              className="mb-7 w-full leading-10 px-3 border border-[#bdbdbd] focus:outline-none"
            />
            <input
              onChange={formDataHandle}
              maxLength="15"
              minLength="6"
              required
              name="password"
              type="password"
              placeholder="Password"
              className="mb-7 w-full leading-10 px-3 border border-[#bdbdbd] focus:outline-none"
            />
            <input
              onChange={formDataHandle}
              maxLength="15"
              minLength="6"
              required
              name="confirm_password"
              type="password"
              placeholder="Confirm Password"
              className="mb-7 w-full leading-10 px-3 border border-[#bdbdbd] focus:outline-none"
            />
            <span className="w-full">
              <button
              disabled={loading}
                type="submit"
                className=" disabled:text-gray-400 disabled:cursor-not-allowed py-2 px-7 text-sm bg-gray-100 text-gray-950 hover:bg-purple-800 hover:text-white transition ease-linear duration-300"
              >
                REGISTER
              </button>
            </span>
          </form>
        </div>
      )}

      {/* <h3 className="font-medium text-2xl hidden">Reset Password</h3> */}
      {showForgot && (
        <div className="py-10 px-4 formDiv flex justify-center items-center w-10/12 md:w-2/3 lg:w-1/2 lg:p-24 shadow-[0_0px_3px_rgba(0,0,0,0.25)]">
          <form onSubmit={handleSubmit} className="w-full">
            <input
              onChange={formDataHandle}
              name="email"
              type="email"
              required
              placeholder="Email"
              className="mb-7 w-full leading-10 px-3 border border-[#bdbdbd] focus:outline-none"
            />
            <span className="w-full">
              <button
              disabled={loading}
                type="submit"
                className="disabled:text-gray-400  disabled:cursor-not-allowed py-2 px-7 text-sm bg-gray-100 text-gray-950 hover:bg-purple-800 hover:text-white transition ease-linear duration-300"
              >
                SUBMIT
              </button>
            </span>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
