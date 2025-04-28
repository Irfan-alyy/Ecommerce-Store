import React from 'react';
import { NavLink } from 'react-router-dom';

const Show = () => {
  return (
    <div className='w-full h-screen bg-gray-100  flex justify-center items-center'>
      <div className='w-[500px] bg-white rounded-lg shadow-lg p-8 flex flex-col items-center'>
        {/* Profile Picture */}
        <div className='w-[150px] h-[150px] rounded-full cursor-pointer overflow-hidden border-4 border-purple-500 mb-6'>
          <img 
            src="" 
            alt="Profile"
            className='w-full h-full object-cover'
          />
        </div>
        {/* Profile Data */}
        <div className='w-full flex flex-col items-center'>
          <h3 className='text-3xl font-bold text-gray-800 mb-2'>John Doe</h3>
          <p className='text-xl text-gray-600 mb-2'>Age: 30</p>
          <p className='text-xl text-gray-600 mb-2'>Contact: +1234567890</p>
          <p className='text-xl text-gray-600 mb-2'>Address: 1234 Elm Street, City, Country</p>
        </div>

        {/* Edit Profile Button */}
        <button className='mt-6 bg-gray-300 text-black text-lg cursor-pointer px-6 py-3  hover:bg-purple-700 transition-all'>
        <NavLink to="/update" className="flex items-center space-x-2">
  Edit-profile
</NavLink>
        </button>
      </div>
    </div>
  );
};

export default Show;
