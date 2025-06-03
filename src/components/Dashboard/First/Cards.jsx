import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers, FaBox, FaClipboardList, FaHourglassHalf, FaListAlt, FaShoppingCart } from 'react-icons/fa';

const Cards = () => {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get('http://192.168.1.59:8000/admin/dashboard-summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const data = response.data;

        const formattedData = [
          { record: data.total_products, value: "Total Products", icon: <FaBox />, color: "red" },
          { record: data.total_users, value: "Total Users", icon: <FaUsers />, color: "green" },
          { record: data.total_reviews, value: "Total Reviews", icon: <FaClipboardList />, color: "green" },
          { record: data.total_pending_orders, value: "Pending Orders", icon: <FaHourglassHalf />, color: "red" },
          { record: data.total_categories, value: "Total Categories", icon: <FaListAlt />, color: "green" },
          { record: data.total_orders, value: "Total Orders", icon: <FaShoppingCart />, color: "green" },
        ];

        setDashboardData(formattedData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className='flex ml-0 justify-center gap-2 flex-wrap items-center flex-col h-auto w-full
        sm:grid sm:grid-cols-3 md:flex md:flex-wrap md:flex-row md:gap-4    '>
      {
        dashboardData.map((item, index) => (
          <div key={index} className='bg-white h-[150px] w-[300px] sm:w-[185px] shadow-sm mb-6 relative flex flex-col justify-center items-center'>
          
            <div className={`absolute top-2 right-2 text-2xl ${item.color === 'red' ? 'text-red-600' : 'text-green-600'}`}>
              {item.icon}
            </div>

            <div className='flex flex-col justify-center items-center mb-8 text-gray-700'>
              <h3 className='text-3xl font-semibold text-gray-700'>{item.record}</h3>
              <h3>{item.value}</h3>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Cards;
