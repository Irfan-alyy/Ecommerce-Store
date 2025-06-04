import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Users = () => {
  const [data, setData] = useState([]);
const [page , setPage] = useState(1);
const UserperPage = 10;





  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("API response is", response.data);
      setData(response.data.users);
    } catch (error) {
      toast.error('Try again');
      console.log("The error is", error);
    }
  };

 const handleblockunblock = async (userId, isActive) => {
  const token = localStorage.getItem('token');
  const newIsActive = !isActive; 

  try {
    const response = await axios.put(
      `${BASE_URL}/admin/user/${userId}`,
      { is_active: newIsActive },  
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    toast.success(`User ${newIsActive ? 'unblocked' : 'blocked'} successfully`);
    fetchData();
  } catch (error) {
    console.log('API Error:', error.response?.data || error.message);
    toast.error(error.response?.data?.msg || 'Action failed');
  }
};

const startIndex = (page - 1) * UserperPage;
const selectedusers = data.slice(startIndex, startIndex + UserperPage);
const totalPages = Math.ceil(data.length / UserperPage);

const changePage=(num)=>{
setPage(num);
}



  return (
    <div className='mt-30 flex flex-col items-center w-full px-6 mb-8 pb-4 '>
      <h2 className="text-2xl font-bold mb-6 ml-0 mr-[80%] text-gray-500">Users</h2>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white  rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-100 text-gray-700 text-left rounded-2xl   ">
              <th className="py-3 px-4 border-b">User Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">User ID</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Action</th>
               {/* <th className="py-3 px-4 border-b">Access</th> */}
              
            </tr>
          </thead>
          <tbody>
            {selectedusers.map((user, index) => (
              <tr key={index} className="transition duration-200 even:bg-gray-50 hover:bg-gray-100">
                <td className="py-3 px-4 border-b">{user.name}</td>
                <td className="py-3 px-4 border-b">{user.email}</td>
                <td className="py-3 px-4 border-b">{user.id}</td>
                <td className="py-3 px-4 border-b">
                 <span className={`px-2 py-1 rounded text-sm ${user.is_active ? 'bg-gray-200 text-[16px] text-green-800' : 'bg-red-200 text-red-800'}`}>
  {user.is_active ? 'Active' : 'IN-Active'}
</span>

                </td>
                <td className="py-3 px-4 border-b space-x-2">
                 <button  
  onClick={() => handleblockunblock(user.id, user.is_active)}
  className={`px-5 py-2 rounded cursor-pointer ${
    user.is_active 
      ? 'bg-green-500 hover:bg-red-500 text-black hover:text-white' 
      : 'bg-red-400 text-white hover:bg-green-500 hover:text-black'
  }`}
>
  {user.is_active ? 'Block' : 'Un-Block'}
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
<div className='flex justify-center items-center gap-4 flex-wrap mt-10 '>

<button 
onClick={()=> changePage(page - 1)}
disabled={page === 1}
className={`py-2 px-4 bg-gray-300 rounded-sm  text-white ${
page === 1 ? 'bg-purple-600 text-black  cursor-not-allowed  ' : ' bg-purple-600 text-white cursor-pointer'

}`}>
  Pre
</button>
{[...Array(totalPages)].map((_, idx)=> (

<button
key={idx + 1}
onClick={()=> changePage(idx + 1)}
className={` px-4 py-2 rounded-full text-black cursor-pointer ${
page === idx + 1 
? 'bg-purple-600 text-white font-bold  curosr-not-allowed  '
: 'bg-gray-300 text-black hover:bg-purple-600'
}`}
>
{idx + 1}
</button>

))}

<button
onClick={()=> changePage(page + 1)}
disabled={page === totalPages}
className={`py-2 px-4 cursor-pointer rounded-sm ${
page === totalPages ? 'bg-gray-300 text-black cursor-not-allowed  ' : 'bg-purple-600 cursor-pointer text-white   '


} `}

>
  Next
</button>




</div>



      </div>
    </div>
  );
};

export default Users;
