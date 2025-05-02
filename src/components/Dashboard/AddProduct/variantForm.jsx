import React, { useState } from "react";

const VariantForm = ({ index, variant, onChange, handleImageChange, imagePreviews }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg mb-4 shadow-sm">
      <h4 className="font-semibold text-lg mb-2">Variant #{index + 1}</h4>

      <input
        type="file"
        multiple
        onChange={(e)=>handleImageChange(index,e)}
        accept="image/*"
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
      />
      <div className="flex gap-3 flex-wrap">
        {imagePreviews[index]?.map((src, idx) => (
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
        placeholder="gender"
        value={variant.name}
        onChange={(e) => onChange(index, "gender", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
        required
      />
      <input
        type="text"
        placeholder="Color"
        value={variant.name}
        onChange={(e) => onChange(index, "color", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
        required
      />
      <input
        type="number"
        placeholder="Size"
        value={variant.sku}
        onChange={(e) => onChange(index, "size", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={variant.name}
        onChange={(e) => onChange(index, "price", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
        required
      />
      <input
        type="number"
        placeholder="stock"
        value={variant.name}
        onChange={(e) => onChange(index, "stock", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
        required
      />

      <input
        type="number"
        placeholder="discount"
        value={variant.sku}
        onChange={(e) => onChange(index, "discount", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        required
      />
      <input
        type="number"
        placeholder="Image Count"
        value={variant.sku}
        onChange={(e) => onChange(index, "image_count", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        required
      />
      
      <input
        type="number"
        placeholder="Shipping Days"
        value={variant.sku}
        onChange={(e) => onChange(index, "shipping_time", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        required
      />
    </div>
  );
};

const ProductForm = () => {
      const [images, setImages] = useState([]);
      const [imagePreviews, setImagePreviews] = useState([[]]);
      const [allImages,setAllImages]=useState([[]])
      const [product, setProduct] = useState({
    product_name: "",
    description: "",
    created_at: new Date(),
    isFeatured: false,
    brand: "",
    category_id: "",
  });
  const [variants, setVariants] = useState([
    {
      gender: "",
      color: "",
      size: "",
      price: "",
      stock: "",
      discount: "",
      image_count: "",
      shipping_time: "",
    },
  ]);

  const handleImageChange = (index,e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setAllImages((prev) => {
        const updated = [...prev];
        updated[index] = files; // set files for variant at index
        return updated;
      });
    setImagePreviews((prev) => {
        const updatedPreviews = [...prev];
        updatedPreviews[index] = previews; // Update previews for the specific variant
        return updatedPreviews;
      });
  };
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const isVariantFilled = (variant) =>
    Object.values(variant).every((val) => val.trim() !== "");

  const handleAddVariant = () => {
    const last = variants[variants.length - 1];
    if (!isVariantFilled(last)) {
      alert("Please fill the last variant before adding a new one.");
      return;
    }
    setVariants([...variants,{
        gender: "",
        color: "",
        size: "",
        price: "",
        stock: "",
        discount: "",
        image_count: "",
        shipping_time: "",
      },]);

      setAllImages((prev) => [...prev, []]); 
      setImages([])
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const last = variants[variants.length - 1];
    if (!isVariantFilled(last)) {
      alert("Please fill all variant fields before submitting.");
      return;
    }

    const filledVariants = variants.filter((v) => isVariantFilled(v));
    // const payload = {
    //   ...product,
    //   variants: filledVariants,
    // };

    console.log(allImages)
    console.log("Submitting:", product);
    console.log("Varints:", filledVariants);

    console.log("variant one:", allImages[0], filledVariants[0]);
    console.log("variant two:", allImages[1], filledVariants[1]);

    const formData = new FormData();
    allImages.forEach((variantImages, index) => {
      variantImages.forEach((file) => formData.append(`variant_images[${index}]`, file));
    }   );
    formData.append("product_name", product.product_name);  

    formData.append("brand", product.brand);
    formData.append("category_id", product.category_id);
    formData.append("description", product.description);
    formData.append("is_feature", product.isFeatured);
    formData.append("variants", JSON.stringify(filledVariants));
    formData.append("created_at", product.created_at);
    // formData.append("isFeatured", product.isFeatured);




    // send payload to backend
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">Add Product</h2>

      <input
        type="text"
        name="product_name"
        placeholder="Product Title"
        value={product.product_name}
        onChange={handleProductChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        required
      />
      <input
        type="text"
        name="brand"
        placeholder="Product Brand"
        value={product.brand}
        onChange={handleProductChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        required
      />
      <input
        type="number"
        name="category_id"
        placeholder="Product category id"
        value={product.category_id}
        onChange={handleProductChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        required
      />

      <textarea
        name="description"
        placeholder="Product Description"
        value={product.description}
        onChange={handleProductChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        required
      />

      <div>
        <h3 className="text-xl font-semibold mb-2">Variants</h3>
        {variants.map((variant, index) => (
          <VariantForm
            key={index}
            index={index}
            variant={variant}
            onChange={handleVariantChange}
            handleImageChange={handleImageChange}
            imagePreviews={imagePreviews}
          />
        ))}

        <button
          type="button"
          onClick={handleAddVariant}
          disabled={!isVariantFilled(variants[variants.length - 1])}
          className={`mt-2 px-4 py-2 rounded-md text-white ${
            isVariantFilled(variants[variants.length - 1])
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          + Add Variant
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold"
      >
        Submit Product
      </button>
    </form>
  );
};

export default ProductForm;
