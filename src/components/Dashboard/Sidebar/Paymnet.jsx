import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PAYMENT_METHODS = ["credit_card", "debit_card", "paypal", "cash_on_delivery"];

const Paymnet = () => {
  const [enabledMethods, setEnabledMethods] = useState([...PAYMENT_METHODS]); // all enabled by default
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/admin/paypal/status`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Accept only valid known methods
      const validEnabled = PAYMENT_METHODS.filter(method => res.data.includes(method));
      setEnabledMethods(validEnabled);
      toast.success("Payment status loaded");
    } catch (error) {
      console.error('Error fetching payment method status:', error);
      toast.error('Failed to load payment methods');
    } finally {
      setLoading(false);
    }
  };

  const toggleMethod = async (method) => {
    const isCurrentlyEnabled = enabledMethods.includes(method);
    const newStatus = !isCurrentlyEnabled;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      await axios.put(
        `${BASE_URL}/admin/${method}/toggle?enable=${newStatus}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (newStatus) {
        setEnabledMethods(prev => [...prev, method]);
        toast.success(`${method.replace(/_/g, ' ')} enabled`);
      } else {
        setEnabledMethods(prev => prev.filter(m => m !== method));
        toast.warn(`${method.replace(/_/g, ' ')} disabled`);
      }

    } catch (error) {
      console.error(`Error toggling ${method}:`, error);
      toast.error(`Failed to toggle ${method.replace(/_/g, ' ')}`);
    } finally {
      setLoading(false);
    }
  };

  const seedPaymentMethods = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(`${BASE_URL}/admin/seed-payment-methods`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Payment methods seeded successfully");
    } catch (error) {
      console.error('Error seeding payment methods:', error);
      toast.error("Try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 mt-30 w-full h-auto flex justify-center items-center flex-col lg:mt-40">
      <ToastContainer />
      <h2 className="text-xl text-gray-600 md:text-2xl font-bold mb-4 mr-[40%]">Payment Methods</h2>

      {/* <div className='mb-4'>
        <button
        //   onClick={fetchStatus}
        //   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        //   disabled={loading}
        // >
        //   Load Payment Status
        // </button>
      </div> */}

      <table className="w-[90%] md:w-[70%] lg:w-[60%] border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Method</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {PAYMENT_METHODS.map(method => {
            const isEnabled = enabledMethods.includes(method);
            return (
              <tr key={method} className="text-center">
                <td className="p-2 border">{method.replace(/_/g, ' ').toUpperCase()}</td>
                <td className="p-2 border">{isEnabled ? 'Enabled' : 'Disabled'}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => toggleMethod(method)}
                    disabled={loading}
                    className={`px-4 py-1 rounded cursor-pointer text-white ${isEnabled ? 'bg-red-500' : 'bg-green-500'}`}
                  >
                    {isEnabled ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className='flex justify-around mx-8 items-center mt-8'>
        <p className='sm:text-lg lg:text-[20px]'>
          Click the button to seed the Payment Method
        </p>
        <button
          onClick={seedPaymentMethods}
          className="bg-gray-300 hover:bg-purple-700 px-4 py-2 ml-4 cursor-pointer hover:text-white text-xl rounded-lg"
          disabled={loading}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Paymnet;
