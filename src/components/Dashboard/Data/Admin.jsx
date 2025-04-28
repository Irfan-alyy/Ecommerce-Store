import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, username, email, password, confirm_password } = formData;

    if (!name || !username || !email || !password || !confirm_password) {
      toast.error('❌ All fields are required!', { position: 'top-right' });
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      toast.error('❌ Invalid email format!', { position: 'top-right' });
      return false;
    }

    if (password.length < 6) {
      toast.error('❌ Password must be at least 6 characters!', { position: 'top-right' });
      return false;
    }

    if (password !== confirm_password) {
      toast.error('❌ Passwords do not match!', { position: 'top-right' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post('http://192.168.1.85:8000/admin/create-admin', formData);

      toast.success('✅ Admin created successfully!', { position: 'top-right' });
      setLoading(false);
      navigate('/main');
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to create admin!', { position: 'top-right' });
      setLoading(false);
    }
  };

  return (
    <div className='h-[100%] w-[100%] flex justify-center items-center mt-2 mb-2 p-4'>
      
      <div className='w-[400px] border-gray-500 border flex flex-col justify-center items-center p-6 shadow-md'>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-400 py-2 px-3 w-full mb-4"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-400 py-2 px-3 w-full mb-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-400 py-2 px-3 w-full mb-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-400 py-2 px-3 w-full mb-4"
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="border border-gray-400 py-2 px-3 w-full mb-6"
          />
          <button
            type="submit"
            className="hover:bg-purple-500 text-black w-full bg-gray-300 hover:text-white py-2 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Admin;
