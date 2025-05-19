import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [loading,setLoading]=useState(false)
  

  const abortControllerRef = useRef(null);
  const timeoutRef = useRef(null);
  const suppressRedFlag = useRef(false); // Flag to suppress red flag for abort error


  const cancelPendingRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    suppressRedFlag.current = true; // Suppress red flag for abort error
    setLoading(false);
  };

  const showLoginSection = () => {
    cancelPendingRequest(); // Cancel any pending requests before switching sections
    setShowLogin(true);
    setShowRegister(false);
    setShowForgot(false);
    setLoginData({});
  };
  const showRegisterSection = () => {
    cancelPendingRequest(); 
    setShowLogin(false);
    setShowRegister(true);
    setShowForgot(false);
    setLoginData({});
  };
  const showForgotSection = () => {
    cancelPendingRequest(); 
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
    const userNameRegex=/^[a-zA-Z0-9_.]{3,20}$/;

  const showError = (error) => {
    let message = "An error occurred.";

    if ((error.name === "AbortError" || error.code === "ERR_CANCELED") && suppressRedFlag.current) {
      return;
    }
    if (error.name === "AbortError" || error.code === "ERR_CANCELED") {
      message = "Request timed out.";
    } else if (error.response?.data?.detail) {
      message = error.response.data.detail;
    } else if (error.message) {
      message = error.message;
    }

    toast.error(`❌ ${message}`, { position: "top-right" });
  };

  const handleSubmit = (e) => {
    suppressRedFlag.current = false; // Reset the suppress flag
    setLoading(true)
    e.preventDefault();
    const { user, password, email, name, confirm_password, username } =
      loginData;

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;
    timeoutRef.current=setTimeout(() => {
      if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    }, 5000); // 10 seconds timeout

    
    if (user && password && !name) {
      console.log("login",loginData);
      axios
        .post(  `${BASE_URL}/login/`,
          { username: loginData.user, password: loginData.password },
          { signal }
          
        )
        .then((res) => {
          toast.info("🟢 Logging in...", { position: "top-right" });
          localStorage.setItem("token", res.data.access_token);
          setLoading(false)
          clearTimeout(timeoutRef.current);
          timeoutRef.current=null
          abortControllerRef.current=null
        })
        .catch((error) => {
          showError(error);
          setLoading(false)
          clearTimeout(timeoutRef.current);
          timeoutRef.current=null
          abortControllerRef.current=null
        });
    } else if (name && username && email && password && confirm_password) {
      console.log("register",loginData);
      if (!fullNameRegex.test(loginData.name)) {
        toast.error(
          "❌ Invalid Full Name! It should contain only alphabets & spaces (max 20 characters).",
          { position: "top-right" }
        );
        clearTimeout(timeoutRef.current);
        timeoutRef.current=null
        setLoading(false)
        return;
      }
      if (!userNameRegex.test(loginData.username)) {
        toast.error(
          "❌ Invalid Username! It should contain only alphabets, numbers, underscores, and dots (3-20 characters).",
          { position: "top-right" }
        );
        clearTimeout(timeoutRef.current);
        timeoutRef.current=null;
        setLoading(false)
        return;
      }

      if (!passwordRegex.test(loginData.password)) {
        toast.error(
          "❌ Weak password! It must be at least 8 characters with uppercase, lowercase, number, and special character.",
          { position: "top-right" }
        );
        clearTimeout(timeoutRef.current);
        timeoutRef.current=null;
        setLoading(false)
        return;
      }
      if (loginData.password !== loginData.confirm_password) {
        toast.error("❌ Your Password and confirm Password Should be same", {
          position: "top-right",
        });
        clearTimeout(timeoutRef.current);
        timeoutRef.current=null;
        setLoading(false)
        return;
      }

      axios
        .post(`${BASE_URL}/register/`, loginData, { signal })
        .then((response) => {
          toast.info("🟢 Registring account...", { position: "top-right" });
          setLoading(false)
          clearTimeout(timeoutRef.current);
          timeoutRef.current=null
          abortControllerRef.current=null
        })
        .catch((error) => {
          showError(error);
          setLoading(false)
          clearTimeout(timeoutRef.current);
          timeoutRef.current=null
          abortControllerRef.current=null
        });
    } else if (email && !password) {
      console.log("reset", loginData);
      // if (loginData.password !== loginData.confirm_password) {
      //   toast.error("❌ Your Password and confirm Password Should be same", {
      //     position: "top-right",
      //   });
      //   clearTimeout(timeoutRef.current);
      //   timeoutRef.current=null;
      //   setLoading(false)
      //   return;
      // }

      // console.log(loginData);
      axios
        .post(`${BASE_URL}/forgot-password/`, null, {
          params: { email: loginData.email },
          signal,
        })
        .then((res) => {
          toast.info(`🟢Reset password link sent to ${loginData.email}`, { position: "top-right" });
          setLoading(false)
          clearTimeout(timeoutRef.current);
        timeoutRef.current=null;
        abortControllerRef.current=null 

          
        })
        .catch((error) => {
          showError(error);
          setLoading(false)
          clearTimeout(timeoutRef.current);
        timeoutRef.current=null;
        abortControllerRef.current=null 
        });
    }
    
  };

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
                  className="cursor-pointer disabled:text-gray-400 disabled:cursor-progress py-2 px-7 text-sm font-medium text-[#333333] bg-[#F2F2F2] hover:bg-[#A749FF] hover:text-white transition ease-linear duration-300"
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
                className=" disabled:text-gray-400 disabled:cursor-progress py-2 px-7 text-sm bg-gray-100 text-gray-950 hover:bg-purple-800 hover:text-white transition ease-linear duration-300"
              >
                REGISTER
              </button>
            </span>
          </form>
        </div>
      )}

      {/* <h3 className="font-medium text-2xl hidden">Reset Password</h3> */}
      {showForgot && (
        <div className="py-10 px-4 formDiv flex flex-col justify-center gap-10 items-center w-10/12 md:w-2/3 lg:w-1/2 lg:px-24 lg:py-15 shadow-[0_0px_3px_rgba(0,0,0,0.25)]">
          <h1 className="text-[rgb(167,73,255)] cursor-pointer text-2xl mr-3 font-bold">Reset Password</h1>
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
                className="disabled:text-gray-400  disabled:cursor-progress py-2 px-7 text-sm bg-gray-100 text-gray-950 hover:bg-purple-800 hover:text-white transition ease-linear duration-300"
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
