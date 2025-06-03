import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import ReactPaginate from 'react-paginate';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Tabels = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [orderChartData, setOrderChartData] = useState([]);
  const itemsPerPage = 10;




  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/admin/purchased-products-last-30-days`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("API full response:", response.data);

      const fetchedData = response.data.purchased_products_last_30_days;

      if (Array.isArray(fetchedData)) {
        setData(fetchedData);

        const orderMap = {};
        fetchedData.forEach(item => {
          const date = new Date(item.order_date).toLocaleDateString();
          if (orderMap[date]) {
            orderMap[date]++;
          } else {
            orderMap[date] = 1;
          }
        });

        const chartData = Object.keys(orderMap).map(date => ({
          date,
          orders: orderMap[date]
        }));

        setOrderChartData(chartData);
      } else {
        console.error("Expected array but got:", fetchedData);
        toast.error("Unexpected API response format.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Fetch error: ", error);
      toast.error("Failed to fetch data!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  

  const displayItems = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className='w-full h-auto flex justify-start mt-4 items-center flex-col bg-white'>
      <div className='w-full border-b-2 border-b-gray-400 h-[50px] flex justify-start items-center'>
        <h1 className='mt-4 text-[20px] ml-4 mb-2'>Development Activity</h1>
      </div>

      <div className='bg-white h-[50vh] w-full p-4'>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={orderChartData}>
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#7fd3fad7"
              fill="#7fd3fad7"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {loading ? (
        <p className="p-4">Loading...</p>
      ) : (
        <table className="w-full table-auto border-collapse mt-4">
          <thead>
            <tr className="bg-white border-b-2  border-b-gray-200">
              <th className="p-2 text-gray-500">User</th>
              <th className="p-2 text-gray-500"></th>
              <th className="p-2 text-gray-500">Order ID</th>
              <th className="p-2 text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(displayItems) && displayItems.length > 0 ? (
              displayItems.map((item, index) => (
                <tr key={index} className="text-center border-b-2  border-b-gray-200">
                  <td className="p-2 ">
                    <img
                      src={item?.user_profile_pic ? `${BASE_URL}/${item.user_profile_pic}` : "/default-user.png"}
                      alt="User"
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="p-2">{item.user_full_name}</td>
                  <td className="p-2">{item.order_id}</td>
                  <td className="p-2">{new Date(item.order_date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {!loading && data.length > itemsPerPage && (
        <ReactPaginate
          breakLabel="..."
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          previousLabel={
            <span className="w-10 h-10 flex justify-center bg-gray-300 hover:bg-purple-700 hover:text-white items-center rounded-full border mr-4">
              <FaAngleLeft />
            </span>
          }
          nextLabel={
            <span className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-300 hover:bg-purple-700 hover:text-white border ml-4">
              <FaAngleRight />
            </span>
          }
          pageCount={Math.ceil(data.length / itemsPerPage)}
          forcePage={currentPage}
          onPageChange={handlePageChange}
          containerClassName="flex justify-center items-center mt-8 mb-4"
          pageClassName="flex justify-center items-center rounded-full border-gray-400 hover:bg-gray-400 pointer w-10 h-8 mr-0 md:mr-2 lg:mr-6"
          activeClassName="bg-purple-700 rounded-full text-white"
        />
      )}
    </div>
  );
};

export default Tabels;
