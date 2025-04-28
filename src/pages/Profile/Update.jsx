import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { motion } from 'framer-motion';

const BASE_URL = 'http://127.0.0.1:8000'; // Use your local base URL

const Update = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    contact: '',
    age: '',
    image: null,
    address: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
    toast.info("🟢 Updating profile...", { position: "top-right" });

    const token = localStorage.getItem("token"); // Get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Update Profile using the updated endpoint
      await axios.put(
        `${BASE_URL}/me/profile`, // Use the correct URL for updating profile
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          birth_date: formData.birthDate,
          contact: formData.contact,
          age: formData.age,
        },
        config
      );

      // Update Address
      await axios.put(
        `${BASE_URL}/user/address`, // Address endpoint remains unchanged
        {
          address: formData.address,
        },
        config
      );

      // If image exists, update the profile picture
      if (formData.image) {
        const imageData = new FormData();
        imageData.append("image", formData.image);

        await axios.post(
          `${BASE_URL}/user/upload-picture/`, // Use BASE_URL here
          imageData,
          {
            headers: { 'Content-Type': 'multipart/form-data', ...config.headers },
          }
        );
      }

      toast.success("✅ Profile updated successfully!", { position: "top-right" });
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to update profile!", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='flex justify-center items-center md:mb-20 h-[120vh] w-full mt-8 md:mt-8'>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className='border border-gray-300 h-auto w-[500px] p-8 flex flex-col items-center gap-6'
      >
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-6 w-full'>
          {/* Profile Image Upload */}
          <label htmlFor="image" className='mt-4'>Upload your image</label>
          <input
            placeholder='Upload an image'
            type="file"
            name="image"
            onChange={handleChange}
            className='h-[130px] w-[130px] cursor-pointer bg-white text-white overflow-hidden border-4 rounded-full border-purple-500'
          />
          
          {/* User Information Fields */}
          <input
            type="text"
            name="firstName"
            placeholder='Enter your first name'
            onChange={handleChange}
            className='border border-gray-400 py-3 px-8 w-full'
          />
          <input
            type="text"
            name="lastName"
            placeholder='Enter your last name'
            onChange={handleChange}
            className='border border-gray-400 py-3 px-8 w-full'
          />
          <input
            type="date"
            name="birthDate"
            onChange={handleChange}
            className='border border-gray-400 py-3 px-8 w-full'
          />
          <input
            type="number"
            name="contact"
            placeholder='Enter your contact number'
            onChange={handleChange}
            className='border border-gray-400 py-3 px-8 w-full'
          />
          <input
            type="number"
            name="age"
            placeholder='Enter your age'
            onChange={handleChange}
            className='border border-gray-400 py-3 px-8 w-full'
          />
          <input
            type="text"
            name="address"
            placeholder='Enter your address'
            onChange={handleChange}
            className='border border-gray-400 py-3 px-8 w-full'
          />
         
          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className='border border-gray-500 py-3 px-5 text-lg cursor-pointer hover:bg-purple-500 hover:text-white disabled:text-gray-400 disabled:cursor-not-allowed'
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Update;
