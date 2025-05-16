import axios from "axios";
import React, { useEffect, useState } from "react";
import useAllProducts from "../../../customHooks/useFetchAllProducts";
import { div, form, tr } from "framer-motion/client";
import { useParams } from "react-router";
import { RxCross2 } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const VariantForm = ({
  index,
  variant,
  onChange,
  handleImageChange,
  imagePreviews,
  apiPreviews,
  removeApiImage,
  removeImage,
}) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg mb-4 shadow-sm">
      <h4 className="font-semibold text-lg mb-2">Variant #{index + 1}</h4>

      <input
        type="file"
        multiple
        onChange={(e) => handleImageChange(index, e)}
        accept="image/*"
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
      />
      <div className="flex gap-3 flex-wrap">
        {imagePreviews[index]?.map((src, idx) => (
          <div key={idx} className="relative w-24 h-24">
            <img
              src={src}
              alt={`preview-${idx}`}
              className="w-24 h-24 object-cover rounded border"
            />
          </div>
        ))}
        {apiPreviews[index]?.map((src, idx) => (
          <div key={idx} className="relative w-24 h-24">
            <RxCross2
              title="Remove Image"
              className="absolute top-0 right-0 text-red-500 cursor-pointer text-2xl"
              onClick={() => {
                removeApiImage(idx, index);
              }}
            />
            <img
              src={src}
              title="Remove Image"
              alt={`preview-${idx}`}
              className="w-24 h-24 object-cover rounded border"
            />
          </div>
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
        value={variant.color}
        onChange={(e) => onChange(index, "color", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
        required
      />
      <input
        type="text"
        placeholder="Size"
        value={variant.size}
        onChange={(e) => onChange(index, "size", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={variant.price}
        onChange={(e) => onChange(index, "price", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
        required
      />
      <input
        type="number"
        placeholder="stock"
        value={variant.stock}
        onChange={(e) => onChange(index, "stock", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
        required
      />

      <input
        type="number"
        placeholder="discount"
        value={variant.discount}
        onChange={(e) => onChange(index, "discount", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        required
      />
      <input
        type="number"
        placeholder="Image Count"
        value={variant.image_count}
        onChange={(e) => onChange(index, "image_count", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        required
      />

      <input
        type="number"
        placeholder="Shipping Days"
        value={variant.shipping_time}
        onChange={(e) => onChange(index, "shipping_time", e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2"
        required
      />
    </div>
  );
};

const UpdateProductForm = () => {
  const params = useParams();
  const productId = params.id;
  // console.log(productId);
  const [isFeatured, setIsFeatured] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([[]]);
  const [localImages, setLocalImages] = useState([]);
  const [apiImages, setApiImages] = useState([[]]);
  const [apiPreviews, setApiPreviews] = useState([[]]);
  const [product, setProduct] = useState({
    product_name: "",
    description: "",
    created_at: new Date(),
    isFeatured: false,
    brand: "",
    category_id: "",
    is_feature: isFeatured,
  });

  const [variants, setVariants] = useState([
    {
      price: "",
      gender: "",
      color: "",
      size: "",
      stock: "",
      discount: "",
      image_count: "",
      shipping_time: "",
    },
  ]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products/${productId}/`)
      .then((response) => {
        const productData = response.data;
        console.log(productData);
        setProduct({
          product_name: productData.product_name,
          description: productData.description,
          created_at: new Date(productData.created_at),
          isFeatured: productData.is_featured,
          brand: productData.brand,
          category_id: productData.category_id,
        });
        const shownVariants = productData.variants.map((elem, ind) => {
          return {
            price: elem.price,
            gender: elem?.gender || "",
            color: elem.attributes.color,
            size: elem.attributes.size,
            stock: elem.stock,
            discount: elem.discount,
            image_count: elem.images.length,
            shipping_time: elem.shipping_time,
          };
        });
        setIsFeatured(productData.is_feature || false);

        console.log(shownVariants);

        setVariants(shownVariants);
        if (productData.variants.length > 0) {
          const initialImages = productData.variants.map(
            (variant) => variant.images || []
          );
          setApiImages(initialImages);
          const initialPreviews = initialImages.map((images) =>
            images.map((image) => `${BASE_URL}${image}`)
          );
          setApiPreviews(initialPreviews);
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error.message);
      });
  }, [productId]);

  // console.log(variants)
  // console.log(variants)
  const { categories, loading, error } = useAllProducts();

  const handleImageChange = (index, e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setLocalImages((file) => [...file, ...files]);
    setImagePreviews((prev) => {
      const updatedPreviews = [...prev];
      updatedPreviews[index] = previews; // Update previews for the specific variant
      return updatedPreviews;
    });
  };

  useEffect(() => {
    return () => {
      imagePreviews.flat().forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const removeApiImage = (idx, index) => {
    const updatedApiImages = [...apiImages];
    const updatedApiPreviews = [...apiPreviews];
    updatedApiImages[index].splice(idx, 1);
    updatedApiPreviews[index].splice(idx, 1);
    setApiImages(updatedApiImages);
    setApiPreviews(updatedApiPreviews);

    // console.log(apiImages);
  };

  // console.log(localImages)
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const isVariantFilled = (variant) => {
    if (variant === null || variant === undefined) return true;
    return Object.values(variant).every((val) => val !== "");
  };
  const handleAddVariant = () => {
    const last = variants[variants.length - 1];
    if (!isVariantFilled(last)) {
      alert("Please fill the last variant before adding a new one.");
      return;
    }
    setVariants([
      ...variants,
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

    setLocalImages((prev) => [...prev, []]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const last = variants[variants.length - 1];
    if (!isVariantFilled(last)) {
      alert("Please fill all variant fields before submitting.");
      return;
    }

    const filledVariants = variants.filter((v) => isVariantFilled(v));
    const formData = new FormData();

    apiImages.forEach((variantImages, index) => {
      variantImages.forEach((link) =>
        formData.append(`variant_image_links`, link)
      );
      // console.log(variantImages, "images");

      // formData.append(`variant_image_link`, JSON.stringify(variantImages));
    });

    const apiImage=[...apiImages]
    const apiImgs = apiImage.flat();
    console.log(apiImgs, "count");
    const count = apiImgs.length + localImages.length;
    console.log(count, "count");
    const imageCount = filledVariants.reduce(
      (acc, curr) => parseInt(curr.image_count) + acc,
      0
    );
    console.log(imageCount,"after reduce");
    if (imageCount != count) {
      toast.error("Image Count should should be correct");
      return;
    }

    // const imageCount=localImages.length+ apiImages.reduce(elem=>elem?.length)
    // console.log("image count", imageCount)

    localImages.forEach((file, index) => {
      formData.append(`variant_images`, file);
      // files.forEach((file) => {
      //   // console.log(file,"inner")
      //   formData.append(`variant_images`, file);
      // });
      // console.log(files,"outer")
    });

    // formData.append("variant_images", localImages);

    formData.append("product_name", product.product_name);
    formData.append("brand", product.brand);
    formData.append("category_id", product.category_id);
    formData.append("description", product.description);
    formData.append("is_feature", isFeatured);

    // filledVariants.forEach((variant, index) => {
    //   try {
    //     let price = variant.price;
    //     variant.price = parseFloat(price);
    //     let stock = variant.stock;
    //     variant.stock = parseInt(stock);
    //     let discount = variant.discount;
    //     variant.discount = parseInt(discount);
    //     let image_count = variant.image_count;
    //     variant.image_count = parseInt(image_count);
    //     let shipping_time = variant.shipping_time;
    //     variant.shipping_time = parseInt(shipping_time);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });
    // filledVariants.forEach((variant, index) => {
    //   formData.append(`variants`, JSON.stringify(variant));
    // });

    filledVariants.forEach((variant, index) => {
      try {
        variant.price = parseFloat(variant.price) || 0;
        variant.stock = parseInt(variant.stock) || 0;
        variant.discount = parseInt(variant.discount) || 0;
        variant.image_count = parseInt(variant.image_count) || 0;
        variant.shipping_time = parseInt(variant.shipping_time) || 0;
      } catch (err) {
        console.log(err);
      }
    });
    // formData.append(`variants`, JSON.stringify(filledVariants));
    filledVariants.forEach((variant, index) => {
      formData.append(`variants`, JSON.stringify(variant));
    });
    formData.append("created_at", product.created_at);

    console.log([...formData.entries()]);

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3NDc0MjEyNzMsInJvbGUiOiJhZG1pbiIsInN1YiI6IjIifQ.5CzpDjZpKoLuM38mREbdkR-g9LGej88nnU9XZczBKY8";
    try {
      const res = await axios.put(
        `${BASE_URL}/products/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Upload success:", res.data);
      toast.success("Product Updated successfully")
    } catch (err) {
      console.error("Upload failed:", err.response);
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">Update Product</h2>

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

        <select
          name="category_id"
          id="category"
          value={product.category_id}
          onChange={handleProductChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 max-h-50 overflow-y-auto"
          required
        >
          <option value="1">Select Category</option>
          {!loading &&
            !error &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
        </select>

        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleProductChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />

        <fieldset className="border border-gray-300 p-4 rounded-lg mb-4 shadow-sm flex  gap-2">
          <input
            type="checkbox"
            id="isFeature"
            name="isFeature"
            checked={product.is_feature || null}
            onChange={(e) => setIsFeatured(!isFeatured)}
          />
          <label htmlFor="isFeature">Is Feature Product</label>
        </fieldset>

        <div>
          <h3 className="text-xl font-semibold mb-2">Variants</h3>
          {variants?.map((variant, index) => (
            <VariantForm
              key={index}
              index={index}
              variant={variant}
              onChange={handleVariantChange}
              handleImageChange={handleImageChange}
              imagePreviews={imagePreviews}
              apiPreviews={apiPreviews}
              removeApiImage={removeApiImage}
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

      <div>
        <div>
          <form action="">
            <label htmlFor="category_name"></label>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProductForm;
