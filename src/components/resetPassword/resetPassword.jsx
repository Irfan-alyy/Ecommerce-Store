import { useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
const BASE_URL=import.meta.env.VITE_API_BASE_URL

const ResetPassword = () => {
  const [loginData, setLoginData] = useState([]);
  const token= new URLSearchParams(useLocation().search).get("token")
  const formDataHandle = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
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

    axios.post(`${BASE_URL}/login/reset-password/`, {
      token: token,
      new_password: loginData.password,
    }).then(res=>{console.log(res); 
        
    }).catch(err=>console.log(err.message)
    );
  };
  return (
    <>
    <div className="py-10">
      <h1 className="text-center text-[rgb(167,73,255)] cursor-pointer text-3xl mb-10 font-bold">
        Reset Password
      </h1>
      <div className="py-10 px-4 m-auto formDiv flex justify-center items-center w-10/12 md:w-2/3 lg:w-1/2 lg:p-24 shadow-[0_0px_3px_rgba(0,0,0,0.25)]">
        <form onSubmit={handleSubmit} className="w-full">
          <input
            onChange={formDataHandle}
            maxLength="15"
            minLength="6"
            name="password"
            type="password"
            required
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
            placeholder="Confirm password"
            className="mb-7 w-full leading-10 px-3 border border-[#bdbdbd] focus:outline-none"
          />
          <span className="w-full">
            <button
              type="submit"
              className="py-2 px-7 text-sm bg-gray-100 text-gray-950 hover:bg-purple-800 hover:text-white transition ease-linear duration-300"
            >
              RESET PASSWORD
            </button>
          </span>
        </form>
      </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default ResetPassword;
