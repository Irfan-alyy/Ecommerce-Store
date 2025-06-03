import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/orders/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    }
  };

  const handleDeleteOrder = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders((prev) => prev.filter((order) => order.id !== id));
      toast.success('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${BASE_URL}/orders/${orderId}/status?status=${newStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, order_status: newStatus } : order
        )
      );
      toast.success(`Order status updated to "${newStatus}"`);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  return (
    <div className='bg-white h-auto mb-8 pb-4 w-full flex items-center justify-center mt-20 py-4'>
      <div className="px-2 bg-white h-auto w-[98%] shadow-2xl md:px-4 pb-4">
        <h2 className="text-3xl font-bold text-gray-500 mb-6 mt-4 ml-4">Orders</h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-100 text-black">
              <tr>
                <th className="px-5 py-3 border-b">Customer Name</th>
                <th className="px-5 py-3 border-b">Email</th>
                <th className="px-5 py-3 border-b">Order ID</th>
                <th className="px-5 py-3 border-b">Order Date</th>
                <th className="px-5 py-3 border-b">Amount</th>
                <th className="px-5 py-3 border-b">Status</th>
                <th className="px-5 py-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, index) => (
                <tr key={index} className="hover:bg-purple-50 transition">
                  <td className="px-5 py-4 border-b">{order.user?.name}</td>
                  <td className="px-5 py-4 border-b">{order.user?.email}</td>
                  <td className="px-5 py-4 border-b">{order.id}</td>
                  <td className="px-5 py-4 border-b">{new Date(order.order_date).toLocaleDateString()}</td>
                  <td className="px-5 py-4 border-b">Rs. {order.final_amount}</td>
                  <td className="px-5 py-4 border-b">
                    <select
                      value={order.order_status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-gray-100 px-2 py-1 rounded border text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-5 py-4 border-b">
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="bg-gray-300 hover:bg-purple-600 text-black hover:text-white px-4 py-2 rounded shadow cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {orders.length > itemsPerPage && (
            <div className="flex justify-center items-center mt-6 gap-2 flex-wrap pb-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md transition font-medium ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white cursor-pointer hover:bg-purple-700'
                }`}
              >
                Prev
              </button>

              {(() => {
                const buttons = [];
                const startPage = Math.max(1, currentPage - 1);
                const endPage = Math.min(totalPages, currentPage + 1);

                if (startPage > 2) {
                  buttons.push(
                    <button
                      key={1}
                      onClick={() => setCurrentPage(1)}
                      className="w-10 h-10 rounded-full bg-gray-100 text-gray-800 hover:bg-purple-100 font-semibold"
                    >
                      1
                    </button>
                  );
                  buttons.push(<span key="start-ellipsis">...</span>);
                }

                for (let i = startPage; i <= endPage; i++) {
                  buttons.push(
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`w-10 h-10 rounded-full cursor-pointer font-semibold ${
                        currentPage === i
                          ? 'bg-purple-700 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-purple-100'
                      }`}
                    >
                      {i}
                    </button>
                  );
                }

                if (endPage < totalPages - 1) {
                  buttons.push(<span key="end-ellipsis">...</span>);
                  buttons.push(
                    <button
                      key={totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                      className="w-10 h-10 rounded-full bg-gray-100 text-gray-800 hover:bg-purple-100 font-semibold"
                    >
                      {totalPages}
                    </button>
                  );
                }

                return buttons;
              })()}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md transition font-medium ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Order;
