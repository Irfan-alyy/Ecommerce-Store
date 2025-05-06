import React, { useRef, useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;



function AddProduct() {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [productData, setProductData] = useState({
    product_name: '',
    brand: '',
    category_id: '',
    description: '',
    is_feature: false,
    variants: {
      gender: '',
      color: '',
      size: '',
      price: '',
      discount:'',
      stock:'',
      shipping_time:'',
      image_count:''
    }
  });

  const formRef=useRef()
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in productData.variants) {
      setProductData(prev => ({
        ...prev,
        variants: {
          ...prev.variants,
          [name]: value
        }
      }));
    } else {
      setProductData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    images.forEach(file => formData.append('variant_images', file));
    formData.append('product_name', productData.product_name);
    formData.append('brand', productData.brand);
    formData.append('category_id', productData.category_id);
    formData.append('description', productData.description);
    formData.append('is_feature', productData.is_feature);
    formData.append('variants', JSON.stringify(productData.variants));

    console.log('--- FormData Preview ---');
    for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
    }

    try {
      const res = await axios.post(`${BASE_URL}/products/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload success:', res.data);
      setImagePreviews([])
    } catch (err) {
      console.error('Upload failed:', err);
      setImagePreviews([])

    }

    formRef.current.reset()
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Product</h2>

      <input
        type="file"
        multiple
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
      />

      <div className="flex gap-3 flex-wrap">
        {imagePreviews.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`preview-${idx}`}
            className="w-24 h-24 object-cover rounded border"
          />
        ))}
      </div>

      <input
        type="text"
        name="product_name"
        placeholder="Product Name"
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
      />

      <input
        type="text"
        name="brand"
        placeholder="Brand"
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
      />

      <input
        type="text"
        name="category_id"
        placeholder="Category ID"
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
      />

      <label className="inline-flex items-center">
        <input
          type="checkbox"
          name="is_feature"
          onChange={handleChange}
          className="mr-2"
        />
        <span className="text-sm text-gray-700">Featured Product</span>
      </label>

      <h4 className="text-lg font-semibold mt-4">Variants</h4>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
        <input
          type="text"
          name="size"
          placeholder="Size"
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount in %"
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock of Products"
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
        <input
          type="number"
          name="image_count"
          placeholder="Number of product images"
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
        <input
          type="number"
          name="shipping_time"
          placeholder="shipping time of product"
          onChange={handleChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Submit Product
      </button>
    </form>
  );
}

export default AddProduct;
