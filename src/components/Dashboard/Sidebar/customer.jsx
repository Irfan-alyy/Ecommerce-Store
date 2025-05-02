import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

const Customer = () => {
  const [reviews, setReviews] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://192.168.1.18:8000/reviews/');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.1.18:8000/reviews/${id}`);
      setReviews(reviews.filter((review) => review.id !== id));
      toast.success('Review deleted successfully');
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="w-[98%] p-2 bg-white  shadow-2xl overflow-x-auto">

      <RxCross2  className='text-3xl font-bold my-8 rounded-full hover:bg-gray-300 cursor-pointer ml-[94%] mb-5  '  
      
      onClick={()=> Navigate("/main")}
      />


        <table className="w-full table-auto border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-4 text-left">Customer ID</th>
              <th className="p-4 text-left">Product ID</th>
              <th className="p-4 text-left">Review</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 font-medium">
            {reviews.map((review, index) => (
              <tr
                key={review.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-purple-50 transition`}
              >
                <td className="p-4 border-b">{review.user_id}</td>
                <td className="p-4 border-b">{review.product_id}</td>
                <td className="p-4 border-b">{review.description}</td>
                <td className="p-4 border-b">
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="bg-rgray-300 hover:bg-purple-700 text-black hover:text-white  px-5 py-2  shadow"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Customer;
