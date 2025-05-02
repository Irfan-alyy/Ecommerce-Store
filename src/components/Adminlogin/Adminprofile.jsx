import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Adminprofile = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('http://192.168.1.85:8000/admin/admin-profile');
        setAdminData(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className=' flex justify-center items-center  h-[400px] w-[500px ]  '>
      <h2>Admin Profile</h2>
      {adminData ? (
        <div>
          <p><strong>Name:</strong> {adminData.name}</p>
          <p><strong>Email:</strong> {adminData.email}</p>
          {/* Baaki fields bhi show kar sakte ho agar response mein ho */}
        </div>
      ) : (
        <p>Loading admin data...</p>
      )}
    </div>
  );
};

export default Adminprofile;
