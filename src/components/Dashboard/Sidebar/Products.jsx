import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { ImOffice } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const Navigate = useNavigate();

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Fetch products on component mount
  useEffect(() => {
    axios.get('http://192.168.1.18:8000/product/allproducts/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setProducts(response.data);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
  }, []);

  // Delete product function
  const handleDelete = (id) => {
    axios.delete(`http://192.168.1.18:8000/product/products/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      // Remove deleted product from state
      setProducts(prev => prev.filter(product => product.id !== id));
    })
    .catch(error => {
      console.error('Error deleting product:', error);
    });
  };

  return (
    <div className='products flex flex-col items-center  bg-white justify-start pt-4 min-h-screen'>
    
      <div className='bg-white shadow-lg rounded-md w-[97%] flex justify-center items-center flex-col p-4'>
      <RxCross2  className='text-3xl hover:bg-gray-400 rounded-full cursor-pointer mr-0 ml-[80%]  ' onClick={()=> Navigate('/main')}/>
        <h1 className='text-3xl text-purple-600 mb-4'></h1>

<button className='bg-purple-600 text-white py-2 px-4 rounded mb-4 flex items-center cursor-pointer ml-[70%]  ' >
  Add files
</button>


        <table className='w-full text-left border  border-purple-400'>
          <thead >
            <tr className='bg-purple-300'>
              <th className='p-2 border'>Image</th>
              <th className='p-2 border'>ID</th>
              <th className='p-2 border'>Price</th>
              <th className='p-2 border'>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className='border-t'>
                <td className='p-2 border'>
                  <img
                  src={`${BASE_URL}${product.variants[0]?.images[0]}`}
                    alt='Product'
                    className='h-16 w-16 object-cover rounded'
                  />
                </td>
                <td classname='p-2 border'>{product.product_name}</td>
                <td className='p-2 border'>{product.id}</td>
                <td className='p-2 border'>${product.variants[0]?.price}</td>
                <td className='p-2 border'>
                  <button onClick={() => handleDelete(product.id)} className='text-red-600 hover:text-red-800'>
                  <MdDelete />
                  </button>
                  <button className='text-white bg-purple-600 py-2 px-6 cursor-pointer '>
                    Update
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
