import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiMiniUsers } from "react-icons/hi2";
import { FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const Reports = () => {
  const [reportData, setReportData] = useState(null); // No default static data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${BASE_URL}/admin/reports`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReportData(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen text-gray-600 text-xl'>
        Loading report...
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className='flex justify-center items-center min-h-screen text-red-500 text-lg'>
        Failed to load report data.
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center flex-col min-h-screen bg-gray-100 px-4'>
      <h1 className='text-2xl  mr-30  md:text-3xl  font-bold text-gray-700 mb-10'>Admin Report</h1>

      <div className='bg-white rounded-xl shadow-lg p-8 w-full max-w-md'>
        <h2 className='text-xl font-semibold text-gray-600 mb-6'>User Reports</h2>

        <div className='flex items-center gap-4 mb-4'>
          <HiMiniUsers className='text-blue-500 text-3xl' />
          <p className='text-lg font-medium text-gray-700'>Total Users: <span className='font-bold'>{reportData.total_users}</span></p>
        </div>

        <div className='flex items-center gap-4 mb-4'>
          <FaShoppingCart className='text-green-500 text-2xl' />
          <p className='text-lg font-medium text-gray-700'>Total Orders: <span className='font-bold'>{reportData.total_orders}</span></p>
        </div>

        <div className='flex items-center gap-4'>
          <FaMoneyBillWave className='text-teal-500 text-2xl' />
          <p className='text-lg font-medium text-gray-700'>Total Revenue: <span className='font-bold'>{reportData.total_revenue ?? 0}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
