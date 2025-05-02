import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      try {
        const response = await axios.get('http://192.168.1.18:8000/orders/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        toast.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className='bg-white h-[100vh] w-full flex items-center justify-center'>
      <div className="p-6 bg-white h-[90%] w-[98%] shadow-2xl">
        {/* Close Icon */}
        <div className="mb-4">
          <button
            onClick={() => navigate('/main')}
            className="flex items-center gap-2 cursor-pointer ml-[90%] hover:bg-gray-300 rounded-full hover:text-purple-800"
          >
            <RxCross2 className='text-3xl rounded-full text-black' />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Orders</h2>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className="px-5 py-3 border-b">Customer Name</th>
                <th className="px-5 py-3 border-b">Email</th>
                <th className="px-5 py-3 border-b">Order ID</th>
                <th className="px-5 py-3 border-b">Order Date</th>
                <th className="px-5 py-3 border-b">Amount</th>
                <th className="px-5 py-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-purple-50 transition">
                  <td className="px-5 py-4 border-b">{order.user?.name}</td>
                  <td className="px-5 py-4 border-b">{order.user?.email}</td>
                  <td className="px-5 py-4 border-b">{order.id}</td>
                  <td className="px-5 py-4 border-b">{new Date(order.order_date).toLocaleDateString()}</td>
                  <td className="px-5 py-4 border-b">Rs. {order.final_amount}</td>
                  <td className="px-5 py-4 border-b">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                      ${order.order_status === 'Delivered'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {order.order_status}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
