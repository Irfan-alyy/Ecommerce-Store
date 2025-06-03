import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const Customer = () => {
  const [reviews, setReviews] = useState([]);
  const[currentpage, setCurrentpage]= useState(1);
  const itemsPerPage = 10;
  const Navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/reviews/`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleDelete = async (id)=>{
const token = localStorage.getItem('token');

try{

  await axios.delete(`${BASE_URL}/admin/reviews/${id}`, {
headers:{
Authorization: `Bearer ${token}`,


},
  })


  setReviews(reviews.filter((review) => review.id !== id));
  toast.success('Review deleted successfully');


}catch(error){
console.log("error deleting review",error )
toast.error("failed to delete review");
}

  }
const startIndex = currentpage * itemsPerPage - itemsPerPage;
  const paginatedReviews = reviews.slice(startIndex , startIndex + itemsPerPage);
    const totalPages = Math.ceil(reviews.length / itemsPerPage);

  return (
    <div className="min-h-screen w-full mt-30 bg-transparent     flex items-center justify-center flex-col px-2 md:px-6  mb-8  ">
      <h1 className='text-3xl text-gray-500 mb-4  mr-[60%] md:mr-[80%] '>Reviews</h1>
      <div className="w-full  p-2 bg-transparent rounded-sm  shadow-2xl overflow-x-auto">

        <table className="w-full table-auto border-collapse text-sm md:text-base rounded-sm ">
          <thead> 
            <tr className="bg-blue-100 text-gray-500      "> 
              <th className="p-4 text-left">Customer ID</th> 
              <th className="p-4 text-left">Product ID</th>
              <th className="p-4 text-left">Review</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 font-medium">
            {paginatedReviews.map((review, index) => (
              <tr
                key={review.id}
                className={`${
                  index % 4 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-gray-100 transition`}
              >
                <td className="p-4 border-b">{review.user_id}</td>
                <td className="p-4 border-b">{review.product_id}</td>
                <td className="p-4 border-b">{review.description}</td>
                <td className="p-4 border-b">
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="bg-rgray-300 hover:bg-purple-700 cursor-pointer text-black hover:text-white  px-5 py-2  shadow"
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
      <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
  <button
    onClick={() => setCurrentpage((prev) => Math.max(prev - 1, 1))}
    disabled={currentpage === 1}
    className={`px-4 py-2 rounded-md transition font-medium ${
      currentpage === 1
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
        : 'bg-purple-600 text-white hover:bg-purple-700'
    }`}
  >
    Prev
  </button>

  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      onClick={() => setCurrentpage(i + 1)}
      className={`w-10 h-10 rounded-full transition font-semibold ${
        currentpage === i + 1
          ? 'bg-purple-700 text-white shadow-md'
          : 'bg-gray-100 text-gray-800 hover:bg-purple-100'
      }`}
    >
      {i + 1}
    </button>
  ))}

  <button
    onClick={() => setCurrentpage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentpage === totalPages}
    className={`px-4 py-2 rounded-md transition font-medium ${
      currentpage === totalPages
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
        : 'bg-purple-600 text-white hover:bg-purple-700'
    }`}
  >
    Next
  </button>
</div>

      <ToastContainer />
    </div>
  );
};

export default Customer;
