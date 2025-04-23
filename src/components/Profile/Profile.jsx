import React, { useState } from 'react';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    address: '',
    contact: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for file upload
    const data = new FormData();
    data.append('name', formData.name);
    data.append('id', formData.id);
    data.append('address', formData.address);
    data.append('contact', formData.contact);
    data.append('image', formData.image);

    try {
      const response = await fetch('http://127.0.0.1:8000/me/profile', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to create profile');
      }

      const result = await response.json();
      alert('Profile created successfully!');
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4'>
        <h2 className='text-2xl font-bold text-center text-gray-700'>Create Profile</h2>

        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
          required
          className='w-full p-2 border border-gray-300 rounded'
        />

        <input
          type='text'
          name='id'
          placeholder='ID'
          value={formData.id}
          onChange={handleChange}
          required
          className='w-full p-2 border border-gray-300 rounded'
        />

        <input
          type='text'
          name='address'
          placeholder='Address'
          value={formData.address}
          onChange={handleChange}
          required
          className='w-full p-2 border border-gray-300 rounded'
        />

        <input
          type='text'
          name='contact'
          placeholder='Contact'
          value={formData.contact}
          onChange={handleChange}
          required
          className='w-full p-2 border border-gray-300 rounded'
        />

        <input
          type='file'
          name='image'
          accept='image/*'
          onChange={handleChange}
          required
          className='w-full p-2 border border-gray-300 rounded'
        />

        <button
          type='submit'
          className='w-full bg-purple-500 hover:bg-purple-700 cursor-pointer text-white font-semibold py-4 rounded'
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
