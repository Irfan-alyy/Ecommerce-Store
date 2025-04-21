import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FadeInFromBottom from "../../ui/animations/FadeInFromBottom";
import axios from "axios";
const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [loginData, setLoginData] = useState({ user: "", password: "" });
  const [RegisterData, setRegisterData] = useState({});
  const [ForgotData, setForgotData] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { user, password, email, name, confirm_password, username } =
      loginData;
    const which = Object.keys(loginData).length;
    if (user && password && !name) {
      axios.post("http://192.168.1.85:8000/login/", {username:loginData.user, password:loginData.password })
        .then((res) => {
          toast.info("🟢 Logging in...", { position: "top-right" });
          localStorage.setItem("token", res.data.access_token);
        })
        .catch((error) => {
          if (error.response) {
            console.log("Server responded with:", error.response.data);
            toast.error(
              `❌${error.response.data.detail}`,
              {
                position: "top-right",
              }
            );
            
          } else if (error.request) {
            console.log("No response received:", error.request);
            toast.error(
              `❌${error.request}`,
              {
                position: "top-right",
              }
            );
          } else {
            console.log("Error:", error.message);
            toast.error(
              `❌${error.message}`,
              {
                position: "top-right",
              }
            );
          }
         
        });
    } else if (name && username && email && password && confirm_password) {
      console.log("register");
      if (!fullNameRegex.test(loginData.name)) {
        toast.error(
          "❌ Invalid Full Name! It should contain only alphabets & spaces (max 20 characters).",
          { position: "top-right" }
        );
        return;
      }

      if (!passwordRegex.test(loginData.password)) {
        toast.error(
          "❌ Weak password! It must be at least 8 characters with uppercase, lowercase, number, and special character.",
          { position: "top-right" }
        );
        return;
      }
      if (loginData.password !== loginData.confirm_password) {
        toast.error("❌ Your Password and confirm Password Should be same", {
          position: "top-right",
        });
        return;
      }
      console.log(loginData);
      axios
        .post("http://192.168.1.85:8000/register/", loginData)
        .then((response) => {
          toast.info("🟢 Registring account...", { position: "top-right" });
        })
        .catch((error) => {
          if (error.response) {
            console.log("Server responded with:", error.response.data);
          } else if (error.request) {
            console.log("No response received:", error.request);
          } else {
            console.log("Error:", error.message);
          }
          toast.error(
            `❌${error.response.data.detail || error.message || error.request}`,
            {
              position: "top-right",
            }
          );
        });
    } else if (email && !password) {
      console.log("reset");
      if (loginData.password !== loginData.confirm_password) {
        toast.error("❌ Your Password and confirm Password Should be same", {
          position: "top-right",
        });
        return;
      }

      console.log(loginData);
      
      axios.post("http://192.168.1.85:8000/forgot-password/",null, {params:{email:loginData.email}}).then(res=>{
        toast.info("🟢 Reseting Password...", { position: "top-right" });


      }).catch(err=>{console.log(err.message);
        toast.error(`❌${err.message}`, {
          position: "top-right",
        });
      })
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
                  type="submit"
                  className="cursor-pointer py-2 px-7 text-sm font-medium text-[#333333] bg-[#F2F2F2] hover:bg-[#A749FF] hover:text-white transition ease-linear duration-300"
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
                type="submit"
                className="py-2 px-7 text-sm bg-gray-100 text-gray-950 hover:bg-purple-800 hover:text-white transition ease-linear duration-300"
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
                type="submit"
                className="py-2 px-7 text-sm bg-gray-100 text-gray-950 hover:bg-purple-800 hover:text-white transition ease-linear duration-300"
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
