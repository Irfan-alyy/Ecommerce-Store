import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MONTH_NAMES = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Chart2 = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const fetchMonthlyOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/admin/monthly-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data.monthly_orders;

      const labels = [];
      const values = [];

      Object.entries(data).forEach(([monthNum, count]) => {
        labels.push(MONTH_NAMES[parseInt(monthNum)]);
        values.push(count);
      });

      // Destroy previous chart if exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Monthly Orders',
            data: values,
            backgroundColor: 'rgba(34, 197, 94, 0.8)',
            borderRadius: 6,
            maxBarThickness: 40
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: { display: false }
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0,0,0,0.1)' }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(34, 197, 94, 0.9)',
              titleFont: { size: 14 },
              bodyFont: { size: 12 },
              padding: 8,
              cornerRadius: 6
            }
          }
        }
      });

    } catch (error) {
      console.error('Error fetching or rendering chart:', error);
    }
  };

  useEffect(() => {
    fetchMonthlyOrders();
  }, []);

  return (
    <div className="w-full bg-white py-4 my-4 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mt-8 px-4 rounded-lg shadow-md">
      {/* <h1>Here is the Monthly Sales </h1> */}
      <canvas ref={chartRef} className="w-full h-full" />
    </div>
  );
};

export default Chart2;
