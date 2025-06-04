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
        let allImageNames = [];
        results.data.forEach(row => {
          if (row.image_filenames) {
            // Remove quotes if any, then split by comma
            const imagesStr = row.image_filenames.replace(/^"|"$/g, '');
            const images = imagesStr.split(',').map(img => img.trim().toLowerCase());
            allImageNames = allImageNames.concat(images);
          }
        });
        // Remove duplicates
        allImageNames = [...new Set(allImageNames)];
        setCsvImageNames(allImageNames);
      },
      error: (err) => {
        toast.error('CSV parsing error: ' + err.message);
      }
    });
  };

  // Prepare uploaded images in lowercase trimmed
  const uploadedImageNames = imageFiles.map(f => f.name.trim().toLowerCase());

  // Find images listed in CSV but not uploaded yet
  const unmatchedCsvImages = csvImageNames.filter(name => !uploadedImageNames.includes(name));

  // Find images uploaded that are not in CSV list
  const extraImages = uploadedImageNames.filter(name => !csvImageNames.includes(name));

  // Check if number of uploaded images exceeds CSV images count
  const isImageCountMismatch = uploadedImageNames.length !== csvImageNames.length;

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

    if (unmatchedCsvImages.length > 0) {
      toast.error(`Missing image files: ${unmatchedCsvImages.join(', ')}`);
      return;
    }

    if (extraImages.length > 0) {
      toast.error(`Extra image files not listed in CSV: ${extraImages.join(', ')}`);
      return;
    }

    if (isImageCountMismatch) {
      toast.error(`Number of uploaded images (${uploadedImageNames.length}) does not match number of images in CSV (${csvImageNames.length})`);
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

      // Reset form
      setCsvFile(null);
      setImageFiles([]);
      setCsvImageNames([]);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data?.message || 'Unknown error'
        : 'Network error';
      console.error('Upload error:', errorMessage);
      toast.error(`Upload failed: ${errorMessage}`);
    }
  };

  return (
    <div className="   bg-gray-100 min-h-screen flex items-center justify-center p-4 mt-40 h-auto px-10   w-[100%] ">
      <div className="w-[92%] md:w-[50%] max-w-3xl bg-white shadow-2xl rounded-xl p-6 md:p-10 relative">
        <h1 className="text-3xl font-bold text-center text-gray-500 mb-8">Upload files</h1>
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

          {/* Show expected images from CSV */}
          {csvImageNames.length > 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded max-h-40 overflow-auto">
              <h3 className="font-semibold mb-2 text-yellow-800">Expected Images (from CSV):</h3>
              <ul className="list-disc list-inside text-yellow-700">
                {csvImageNames.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>
          )}

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

          {/* Show missing images dynamically */}
          {unmatchedCsvImages.length > 0 && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded max-h-40 overflow-auto">
              <h3 className="font-semibold mb-2 text-red-800">Missing Image Files:</h3>
              <ul className="list-disc list-inside text-red-700">
                {unmatchedCsvImages.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Show extra images uploaded */}
          {extraImages.length > 0 && (
            <div className="mt-4 p-4 bg-blue-100 border border-blue-400 rounded max-h-40 overflow-auto">
              <h3 className="font-semibold mb-2 text-blue-800">Extra Image Files Not in CSV:</h3>
              <ul className="list-disc list-inside text-blue-700">
                {extraImages.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Show image count mismatch error */}
          {isImageCountMismatch && (
            <div className="mt-4 p-4 bg-orange-100 border border-orange-400 rounded">
              <h3 className="font-semibold mb-2 text-orange-800">
                Number of uploaded images ({uploadedImageNames.length}) does not match number of images in CSV ({csvImageNames.length})
              </h3>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={
                unmatchedCsvImages.length > 0 || 
                extraImages.length > 0 || 
                isImageCountMismatch
              }
              className={`bg-gray-300 text-black cursor-pointer text-lg font-semibold py-3 px-6 shadow-md transition duration-300
                ${
                  unmatchedCsvImages.length > 0 || extraImages.length > 0 || isImageCountMismatch
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-purple-700 hover:text-white"
                }`}
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
