import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Logo = () => {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !logo) {
      toast.info('Please provide both name and logo');
      return;
    }

    if (name.length <= 3 || name.length >= 15) {
      toast.info('Website name must be greater than 3 and less than 15 characters');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('logo', logo);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/admin/pages/website_logo`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      toast.success('Logo and name uploaded successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload logo and name');
    }
  };

  return (
    <div className="w-[100%] flex justify-center items-center mt-60 flex-col">
      <h2 className="text-xl text-gray-500 font-semibold mb-4">Upload Website Logo & Name</h2>
      <div className='flex flex-col gap-6 border-2 border-gray-400 w-[80%] h-auto p-8 rounded-lg md:w-[50%] md:py-20'>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-500 font-medium mb-1">Website Name:</label>
            <input
              type="text"
              value={name}
              maxLength={15}
              minLength={3}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-500 font-medium mb-1 mt-4">Website Logo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files[0])}
              className="w-full border px-3 py-2 rounded mb-4 cursor-pointer"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gray-300 text-black hover:text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Update
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Logo;
