import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://192.168.1.85:8000/admin/admin-profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error(error);
        toast.error('❌ Failed to fetch profile!', { position: 'top-right' });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className='h-[400px] w-[100%] flex justify-center items-center text-3xl'>Loading...</div>;
  }

  if (!profile) {
    return <div className='h-[400px] w-[100%] flex justify-center items-center text-3xl'>No profile data available</div>;
  }

  return (
    <div className='h-[100vh] w-full flex justify-center items-center mt-2 mb-2'>
      <div className='w-[500px] h-auto border border-gray-300 flex flex-col items-center p-6 rounded-lg shadow-md'>
        <div className='flex justify-center items-center h-[140px] w-[140px] border border-gray-400 mb-6'>
          <img src={profile.image || 'https://via.placeholder.com/150'} alt="Admin" className='rounded-full w-full h-full object-cover' />
        </div>
        
        {/* Admin Information */}
        <h3 className='text-2xl font-bold mb-4'>{profile.name}</h3>
        <p className='text-lg mb-2'>
          <span className='font-semibold'>Username:</span> {profile.username}
        </p>
        <p className='text-lg mb-2'>
          <span className='font-semibold'>Email:</span> {profile.email}
        </p>

        {/* Only show password if you want (not recommended for security) */}
        {/* <p className='text-lg mb-2'>
          <span className='font-semibold'>Password:</span> {profile.password}
        </p> */}

        <button className='border bg-transparent border-gray-500 px-6 py-3 mt-4 hover:bg-purple-500 cursor-pointer'>
          Edit Profile
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminProfile;
