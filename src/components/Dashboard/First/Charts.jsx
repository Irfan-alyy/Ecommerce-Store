import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Chart2 from './Chart2';

const DONUT_COLORS = ['rgb(53, 197, 53)', 'rgb(6, 153, 6)', 'rgb(34, 139, 34)', 'rgb(46, 204, 113)'];
const PIE_COLORS = ['#1e3a8a', '#3b82f6', '#93c5fd', 'lightblue', '#2563eb', '#60a5fa'];

const Charts = () => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token'); // 🔐 get token
        const res = await axios.get('http://192.168.1.59:8000/admin/orders/payment-summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.status === 'success') {
          const summary = res.data.summary;
          const formattedData = Object.keys(summary).map(key => ({
            name: key,
            value: summary[key],
          }));
          setPieData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching payment summary:', error);
      }
    };

    fetchSummary();
  }, []);

  // If you want to use the same data in donut and pie charts, but colors differ
  // Just reuse pieData but different color sets

  return (
    <div className='flex justify-start items-start flex-col h-auto w-[100%] mt-4 md:mt-26 overflow-x-hidden lg:mt-4 overflow-y-hidden'>
      <div className='h-[40px] bg-blue-200 text-black w-full rounded flex justify-start pl-4 items-center'>
        <h2>Read Our Documentation with the Code Sample</h2>
      </div>

      <div className='w-full flex justify-center items-center gap-2 flex-col md:flex-row mt-8'>
        {/* Donut Chart using API data */}
        <div className='bg-white h-auto w-[100%] md:w-[50%] shadow-sm rounded-sm'>
          <div className='border-b-gray-300 border-b-2 pb-4 flex items-center'>
            <h1 className='text-2xl mt-2 ml-4'>Payment Success</h1>
          </div>
          <div className='w-full h-[300px] px-4'>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}  // Donut style
                  outerRadius={90}
                  label={({ percent, name }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='bg-white h-auto w-[100%] md:w-[50%] shadow-sm rounded-sm'>
          <div className='border-b-gray-300 border-b-2 pb-4 flex items-center'>
            <h1 className='text-2xl mt-2 ml-4'>Payment Summary</h1>
          </div>
          <div className='w-full h-[300px]'>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Chart2 />
    </div>
  );
};

export default Charts;
