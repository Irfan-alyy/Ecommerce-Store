import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.1.85:8000/admin/create-admin', formData);
      console.log('Admin created:', response.data);
      alert('Admin created successfully!');
    } catch (error) {
      console.error('Error creating admin:', error);
      alert('Failed to create admin');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <div className="bg-transparent  p-8 border border-gray-300 w-full max-w-lg">
        <h2 className="text-3xl     -bold text-center text-purple-4 00 mb-6">Create Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            {/* <label htmlFor="name" className="block text-lg font-medium text-gray-700">Full Name</label> */}
            <input 
              type="text" 
              name="name" 
              id="name" 
              placeholder="Enter your full name" 
              value={formData.name} 
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>

          <div>
            {/* <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label> */}
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Enter your email" 
              value={formData.email} 
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>

          <div>
            {/* <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label> */}
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Enter your password" 
              value={formData.password} 
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
          </div>

          <div className="text-center">
            <button 
              type="submit" 
              className="cursor-pointer text-lg bg-gray-300 hover:bg-purple-600 py-3 px-4 font-semibold  text-black hover:text-white transition duration-300 disabled:bg-gray-400"
            >
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
