import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    contact: '',
    age: '',
    address: '',
    profilePicture: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    } else {
      toast.error("❌ Please upload a valid image file!", { position: "top-right" });
    }
  };

  const validateForm = () => {
    const { firstName, lastName, birthDate, contact, age, address } = formData;

    if (!firstName || !lastName || !birthDate || !contact || !age || !address) {
      toast.error("❌ All fields are required!", { position: "top-right" });
      return false;
    }

    if (!/^[A-Za-z]{2,20}$/.test(firstName)) {
      toast.error("❌ Invalid First Name!", { position: "top-right" });
      return false;
    }

    if (!/^[A-Za-z]{2,20}$/.test(lastName)) {
      toast.error("❌ Invalid Last Name!", { position: "top-right" });
      return false;
    }

    if (!/^\d{10,15}$/.test(contact)) {
      toast.error("❌ Invalid Contact Number!", { position: "top-right" });
      return false;
    }

    if (parseInt(age) < 0 || parseInt(age) > 120) {
      toast.error("❌ Invalid Age!", { position: "top-right" });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    toast.info("🟢 Creating profile...", { position: "top-right" });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    const profileData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      birth_date: formData.birthDate,
      contact: formData.contact,
      age: formData.age,
    };

    const addressData = {
      address: formData.address,
    };

    const formDataToSend = new FormData();
    if (formData.profilePicture) {
      formDataToSend.append('profile_picture', formData.profilePicture);
    }

    try {
      await axios.post(`${BASE_URL}/user/profile`, profileData, config); // ✅ BASE_URL used
      await axios.post(`${BASE_URL}/user/address`, addressData, config);   // ✅ BASE_URL used

      if (formData.profilePicture) {
        await axios.post(`${BASE_URL}/user/upload-picture/`, formDataToSend, config); // ✅ BASE_URL used
      }

      toast.success("✅ Profile created successfully!", { position: "top-right" });
      localStorage.setItem("profileData", JSON.stringify(profileData));
    } catch (error) {
      toast.error("❌ Error creating profile", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 flex justify-center bg-gray-100 min-h-screen">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-[500px] flex flex-col items-center gap-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          {/* Profile Image Upload */}
          <div className="flex justify-center flex-col items-center w-full">
            <label htmlFor="profilePicture" className="text-lg font-semibold text-gray-700">Upload your image</label>
            <input
              placeholder="Upload an image"
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleFileChange}
              className="h-[130px] w-[130px] cursor-pointer bg-white text-white overflow-hidden border-4 rounded-full border-purple-500 mt-4"
            />
          </div>
          
          {/* User Information Fields */}
          <div className="w-full flex flex-col gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              onChange={handleChange}
              className="border border-gray-400 py-3 px-8  w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              onChange={handleChange}
              className="border border-gray-400 py-3 px-8  w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="date"
              name="birthDate"
              onChange={handleChange}
              className="border border-gray-400 py-3 px-8  w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              name="contact"
              placeholder="Enter your contact number"
              onChange={handleChange}
              className="border border-gray-400 py-3 px-8  w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              onChange={handleChange}
              className="border border-gray-400 py-3 px-8  w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              onChange={handleChange}
              className="border border-gray-400 py-3 px-8 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className="py-3 px-5 text-lg cursor-pointer bg-gray-300 text-black  rounded-lg hover:bg-purple-600 transition-colors duration-300 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Profile;
