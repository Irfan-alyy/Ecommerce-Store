import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Analytics = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!csvFile || imageFiles.length === 0) {
      toast.error('Please upload the CSV file and at least one image.');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', csvFile);
    imageFiles.forEach((file) => formData.append('images', file));

    try {
      const response = await axios.post(
        'http://192.168.1.18:8000/products/bulk-upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Upload response:', response.data);
      toast.success('Upload successful!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-xl p-6 md:p-10 relative">
        <div className="absolute top-4 right-4">
          <RxCross2
            className="text-3xl text-gray-500 hover:bg-gray-200 p-1 rounded-full border cursor-pointer"
            onClick={() => navigate('/main')}
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Add Bulk Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CSV FILE INPUT */}
          <div>
            <label className="block text-lg font-medium text-purple-700 mb-2">Upload CSV Products File</label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files[0])}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* IMAGE FILE INPUT */}
          <div>
            <label className="block text-lg font-medium  mb-2 text-purple-700">Upload Product Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files))}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <p className="text-sm text-gray-500 mt-1">You can select multiple image files at once.</p>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-purple-700 text-black hover:text-white cursor-pointer text-lg font-semibold py-3 px-6  shadow-md transition duration-300"
            >
              Add Products
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Analytics;
