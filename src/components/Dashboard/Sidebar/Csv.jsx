import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const CSV = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [csvImageNames, setCsvImageNames] = useState([]);

  const handleCsvChange = (e) => {
  const file = e.target.files[0];
  setCsvFile(file);

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      const imageNames = results.data
        .map(row => row.image?.trim().toLowerCase())
        .filter(Boolean); // remove empty/null/undefined
      setCsvImageNames(imageNames);
    },
    error: (err) => {
      toast.error('CSV parsing error: ' + err.message);
    }
  });
};


  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  if (!csvFile) {
    toast.error('Please upload a CSV file.');
    return;
  }

  if (imageFiles.length === 0) {
    toast.error('Please upload at least one image file.');
    return;
  }

  // Normalize uploaded image filenames
  const uploadedImageNames = imageFiles.map(file => file.name.trim().toLowerCase());

  // Find unmatched CSV image names
  const unmatched = csvImageNames.filter(name => !uploadedImageNames.includes(name));

  if (unmatched.length > 0) {
    toast.error(`Missing image files: ${unmatched.join(', ')}`);
    return;
  }

  const formData = new FormData();
  formData.append('file', csvFile);
  imageFiles.forEach(file => formData.append('images', file));

  try {
    const response = await axios.post(`${BASE_URL}/products/bulk-upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    toast.success('Upload successful!');
    console.log('Upload response:', response.data);
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data?.message || 'Unknown error'
      : 'Network error';
    console.error('Upload error:', errorMessage);
    toast.error(`Upload failed: ${errorMessage}`);
  }
};


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 mt-20 w-[100%] ">
      <div className="w-[92%] md:w-[50%] max-w-3xl bg-white shadow-2xl rounded-xl p-6 md:p-10 relative">
        <h1 className="text-3xl font-bold text-center  text-gray-500 mb-8">Upload files</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-600 mb-2">Upload CSV Products File</label>
            <input
              type="file"
              accept=".csv"
              onChange={handleCsvChange}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600">Upload Product Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files))}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
            <p className="text-sm text-gray-500 mt-1">You can select multiple image files at once.</p>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-purple-700 text-black hover:text-white cursor-pointer text-lg font-semibold py-3 px-6 shadow-md transition duration-300"
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

export default CSV;
