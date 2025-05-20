import React, { useEffect, useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { IoBagAddSharp } from "react-icons/io5";

import { NavLink } from 'react-router-dom';



const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 10;

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products/allproducts/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {




  
      await axios.delete(`${BASE_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const startIndex = (page - 1) * productsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + productsPerPage);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const changePage = (num) => {
    setPage(num);
  };

  return (
    <div className="py-2 px-2 mb-4 bg-gray-100 min-h-screen font-sans mt-30 md:px-12   ">
      <h2 className="text-2xl text-gray-500 font-semibold ml-2 mb-8">Product List</h2>

<NavLink to='/admin/addproduct'>
<button className='flex justify-center items-center gap-2 text-[20px]  bg-purple-600  border-2 border-purple-800 hover:bg-gray-200 text-white hover:text-black   
rounded-sm  mb-4 cursor-pointer mr-0 ml-[84%] py-2 px-5

'  ><IoBagAddSharp />Add</button>
</NavLink>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-sm  px-8  "
        style={{



        }}
        
        >
          <thead>
            <tr className="bg-blue-100 text-gray-500 w-full">
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Brand</th>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Discount</th>
              <th className="p-4 text-left">Action</th>
              <th className="p-4 text-left">Up-Date</th>
              
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-4 text-center">
                  <img
                    src={`${BASE_URL}${product.variants[0]?.images[0]}`}
                    alt="Product"
                    className="w-20 h-auto rounded"
                  />
                </td>

                <td className="p-4">{product.brand}</td>
                <td className="p-4">{product.id}</td>
                <td className="p-4">${product.variants[0]?.price}</td>
                <td className="p-4">${product.variants[0]?.discount}</td>
                
                <td className="p-4"> 
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-gray-300 border-2 border-purple-800 rounded-sm hover:bg-purple-700 text-black hover:text-white  cursor-pointer  px-4 py-2 "
                  >
                    Delete
                  </button>
                 
                </td>
              <td>
                  <NavLink to="/admin/updateproduct/:id" className="group">
            <button className='px-5 py-2  bg-purple-600 rounded-sm  text-white cursor-pointer hover:bg-gray-200 hover:text-black border-2 border-purple-900'>
              Up-Date
            </button>
             </NavLink>
              </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
        <button
          onClick={() => changePage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-sm text-black   ${
            page === 1 ? 'bg-gray-300   cursor-not-allowed' : 'bg-gray-300 hover:bg-purple-600 cursor-pointer  text-white'
          }`}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => changePage(idx + 1)}
            className={`px-4 py-2 text-black cursor-pointer   rounded-full ${
              page === idx + 1
                ? 'bg-purple-600 text-white font-bold'
                : 'bg-gray-200 hover:bg-purple-500'
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() => changePage(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 text-black rounded-sm  cursor-pointer   ${
            page === totalPages ? 'bg-gray-300 cursor-not-allowed text-black' : 'bg-gray-300 hover:bg-purple-600  text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewProducts;
