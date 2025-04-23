import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, password } = formData;

    if (!name || !password) {
      toast.error('❌ Please fill in all fields!', { position: 'top-right' });
      return;
    }

    if (password.length < 8) {
      toast.error('❌ Password too short! Must be at least 8 characters.', {
        position: 'top-right',
      });
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        '❌ Password must include uppercase, lowercase, number, and special character.',
        { position: 'top-right' }
      );
      return;
    }

    toast.success('🟢 Form submitted successfully!', {
      position: 'top-right',
    });

    // Clear form if needed
    // setFormData({ name: '', password: '' });
  };

  return (
    <div
      className="flex justify-center items-center h-[100vh] w-[100%]"
      style={{ backgroundColor: 'rgb(255,255,255)' }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-transparent border rounded-sm shadow-2xl border-gray-400 h-[500px] w-[500px] flex justify-center gap-4 items-center flex-col"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          className="border rounded-sm pl-2 py-4 px-16 mb-4"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          className="border rounded-sm pl-2 py-4 px-16 mt-4"
        />
        <button
          type="submit"
          className="bg-transparent  text-black border border-gray-500 hover:bg-purple-600 hover:text-white px-8 py-4 cursor-pointer mt-10"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Admin;
