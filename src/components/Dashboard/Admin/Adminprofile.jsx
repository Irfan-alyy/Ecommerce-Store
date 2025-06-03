import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaUserShield,
  FaBoxOpen,
  FaShoppingCart,
  FaDollarSign,
  FaMoneyBillWave
} from 'react-icons/fa';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Adminprofile = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No token found. Admin not authenticated.");
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/admin/admin-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdminData(response.data);
      } catch (error) {
        toast.error('Error fetching admin data');
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="h-auto  mt-40  flex items-center justify-center bg-gradient-to-br ">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[500px] space-y-6">
        <h2 className="text-4xl font-bold text-purple-700 text-center flex items-center justify-center gap-2">
          <FaUserShield /> Admin Profile
        </h2>

        {adminData ? (
          <div className="space-y-4 text-gray-800 text-lg">
            <p className="flex items-center gap-3 text-xl">
              <FaUserShield className="text-purple-600" />
              <strong>Name:</strong> {adminData.admin_name}
            </p>
            <p className="flex items-center gap-3 text-xl">
              <FaBoxOpen className="text-blue-600" />
              <strong>Total Products:</strong> {adminData.total_products}
            </p>
            <p className="flex items-center gap-3 text-xl">
              <FaShoppingCart className="text-green-600" />
              <strong>Total Orders:</strong> {adminData.total_orders}
            </p>
            <p className="flex items-center gap-3 text-xl">
              <FaDollarSign className="text-yellow-500" />
              <strong>Total Sales:</strong> {adminData.total_sales}
            </p>
            <p className="flex items-center gap-3 text-xl">
              <FaMoneyBillWave className="text-indigo-500" />
              <strong>Total Revenue:</strong> ${adminData.total_revenue ?? "0"}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading admin data...</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Adminprofile;
