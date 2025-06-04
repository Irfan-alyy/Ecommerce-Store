import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {loginSuccess} from "../../../store/Redux/adminAuthSlice"; // Adjust the import path as necessary


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Adminlogin = () => {
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formDataHandle = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showError = (error) => {
    let message = "An error occurred.";
    if (error.name === "AbortError" || error.code === "ERR_CANCELED") {
      message = "Try again.";
    } else if (error.response?.data?.detail) {
      message = error.response.data.detail;
    } else if (error.message) {
      message = error.message;
    }

    toast.error(`❌ ${message}`, { position: "top-right" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { username, password } = loginData;
    if (!username || !password) {
      toast.error("❌ Please enter both username and password.");
      setLoading(false);
      return;
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    timeoutRef.current = setTimeout(() => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }, 10000);

    axios
      .post(`${BASE_URL}/login/`, { username, password }, { signal })
      .then((res) => {
        toast.success("🟢 Login successful!", { position: "top-right" });

        const token = res.data.access_token;
        localStorage.setItem("token", token);

        // ✅ Update Redux state
        dispatch(loginSuccess(token));

        setLoading(false);
        clearTimeout(timeoutRef.current);
        navigate("/admin");
      })
      .catch((error) => {
        showError(error);
        setLoading(false);
        clearTimeout(timeoutRef.current);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="loginBox flex justify-center items-center mb-10">
        <h2 className="text-[rgb(167,73,255)] text-2xl font-bold">Admin Login</h2>
      </div>
      <div className="py-10 px-4 formDiv flex justify-center items-center w-10/12 md:w-2/3 lg:w-1/2 lg:p-24 shadow-[0_0px_3px_rgba(0,0,0,0.25)]">
        <form onSubmit={handleSubmit} className="w-full">
          <input
            required
            onChange={formDataHandle}
            name="username"
            type="text"
            placeholder="Username"
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
          <button
            disabled={loading}
            type="submit"
            className="cursor-pointer py-2 px-7 text-sm font-medium text-[#333333] bg-[#F2F2F2] hover:bg-[#A749FF] hover:text-white transition ease-linear duration-300"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Adminlogin;
