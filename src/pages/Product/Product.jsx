import { useEffect, useRef, useState } from "react";


import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import {
  TiSocialDribbble,
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialPinterest,
  TiSocialTwitter,
} from "react-icons/ti";
import { useParams } from "react-router";
import useProduct from "../../customHooks/useFetchProduct";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/Redux/cartSlice";

import RatingForm from "../../components/Product/RatingForm";
import ProductReviews from "../../components/Product/productReview";

import FadeInFromBottom from "../../ui/animations/FadeInFromBottom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Product = () => {
  const { id } = useParams();
  const { product,category, loading, error, productReviews } = useProduct({ id });
  const [currentPic, setCurrentPic] = useState("");
  const [selectedVariant, setSelectedVariant] = useState([]);
const [addedToCart,setAddedToCart]=useState(false)
  const [isDescriptionVisible, setDescriptionVisble] = useState(true);
  const dispatch = useDispatch();

  // console.log(category,"categ")
  const cartItems = useSelector((state) => state.reducer.items);
  useEffect(() => {
    const isInCart = cartItems.some(
      (elem) => elem.variant.id === selectedVariant.id
    );
    setAddedToCart(isInCart);
    console.log(cartItems);
  }, [cartItems, selectedVariant.id]);


  useEffect(() => {
    console.log("Product", product);
    if (product) {
      setCurrentPic(`${product?.variants[0]?.images[0]}`);
      setSelectedVariant(product?.variants[0]);
    }
  }, [product]);


  // console.log("Selected Variant", selectedVariant);
  // const handlePrev = () => {
  //   setStartIndex((prev) => (prev - 1) % images.length);
  // };

  // const handleNext = () => {
  //   setStartIndex((prev) => (prev + 1 + images.length) % images.length);
  // };

  const handleImageChange = (val) => {
    if (val === "prev") {
      if (currentPic === selectedVariant.images[0]) {
        setCurrentPic(
          selectedVariant.images[selectedVariant.images.length - 1]
        );
      } else
        setCurrentPic(
          selectedVariant.images[selectedVariant.images.indexOf(currentPic) - 1]
        );
    } else if (val === "next") {
      if (
        currentPic === selectedVariant.images[selectedVariant.images.length - 1]
      ) {
        setCurrentPic(selectedVariant.images[0]);
      } else
        setCurrentPic(
          selectedVariant.images[selectedVariant.images.indexOf(currentPic) + 1]
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-bold">{error}</h1>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center text-2xl">Product not found!</p>;
  }
  if (!selectedVariant)
    return <p className="text-center text-2xl">No variant found!</p>;

  const handleVariantChange = (elem, idx) => {
    setSelectedVariant(elem);
    setCurrentPic(elem.images[0]);
  };

  const handleAddCart = () => {
    const item = {
      id: product.id,
      name: product.product_name,
      variant: selectedVariant,
      quantity: 1,
    };
    dispatch(addToCart(item));
  };


  return (
    
    <div className="px-10 sm:px-20 md:px-30 xl:px-40">
      <div className="justify-center h-auto bg-white rounded-xl py-10 lg:py-25  ">
        <div className="flex flex-col lg:flex-row  py-5 lg:py-10 gap-5 md:gap-10 lg:gap-15">
          <div className=" flex flex-col ">
          <FadeInFromBottom duration={1} delay={0} yOffset={50}>
            <div className="relative flex w-full h-auto bg-[rgb(246,246,246)] items-center justify-center">
              {/* Button for previous image */}

              <IoIosArrowBack
                onClick={() => handleImageChange("prev")}
                className=" group-hover:hidden text-2xl absolute cursor-pointer  left-0 top-1/2 -translate-y-1/2 "
              />

              <img
                src={`${BASE_URL}${currentPic}`}
                alt={currentPic}
                className="w-full md:w-auto h-100 object-cover"
              />

              {/* Button for next image */}
              <IoIosArrowForward
                onClick={() => handleImageChange("next")}
                className="group-hover:hidden text-2xl absolute right-0 top-1/2 cursor-pointer  -translate-y-1/2 "
              />

              <p className="absolute top-5 left-5 bg-[rgb(250,107,255)] px-2 rounded text-sm">
                {selectedVariant?.id && "-"+selectedVariant.discount+"%"}
              </p>
            </div>
            </FadeInFromBottom>

            <div className="relative w-full max-w-3xl mx-auto overflow-hidden group">
              <div className="w-100 flex flex-row items-center gap-2 py-5 flex-wrap justify-start">
                {product.variants.map((elem, idx) => (
                  <img
                    key={idx}
                    src={`${BASE_URL}${elem.images[0]}`}
                    alt={`img-${idx}`}
                    className="w-[22.5%] max-h-25 object-cover transition-all cursor-pointer  duration-500 "
                    onClick={() => handleVariantChange(elem, idx)}
                    // onMouseOver={() => setCurrentPic(elem.images[0])}
                  />
                ))}
              </div>
            </div>
          </div>
          <FadeInFromBottom duration={1} delay={0} yOffset={50}>
          <div className="flex flex-col w-11/12 pl-5">
            <div className="md:pr-15 flex flex-col md:gap-2 py-2">
              <h1 className="text-2xl md:text-3xl">{product.product_name}</h1>
              <p className="text-2xl py-2">
                ${selectedVariant.price}{" "}
                <strike className="text-lg">
                  {(
                    selectedVariant.price /
                    (1 - selectedVariant.discount / 100)
                  ).toFixed(2)}
                </strike>
              </p>

              <p className="text-xl py-5 md:py-10">
                {product.description.slice(0, 200)}...
              </p>
              <hr className="hidden md:block text-[#7d7d7dcb] pb-5  md:pb-10" />

              <button
                onClick={handleAddCart}
                className="shop-btn px-15 py-4 bg-black text-white text-lg font-semibold disabled:cursor-not-allowed  cursor-pointer w-fit"
                 disabled={addedToCart}
                >
                {addedToCart? "ADDED TO CART":"ADD TO CART"}
              </button>

              <p className="leading-10 pt-5">Catagories: {category?.category_name}</p>
              <p>Tags: {product.brand}, {category?.category_name} </p>

              <div className="flex gap-10 mt-5">
                <TiSocialFacebook className="text-2xl cursor-pointer" />
                <TiSocialDribbble className="text-2xl cursor-pointer" />
                <TiSocialPinterest className="text-2xl cursor-pointer" />
                <TiSocialTwitter className="text-2xl cursor-pointer" />
                <TiSocialLinkedin className="text-2xl cursor-pointer" />
              </div>
            </div>
          </div>
          </FadeInFromBottom>
        </div>
      </div>
      <div className="w-full py-10 md:py-0 border-[#9d9b9bec] border-b-1">
        <div className="text-center">
          <button
            className={`text-3xl pb-2 mx-5 ${
              isDescriptionVisible && "border-b-3"
            }`}
            onClick={() => setDescriptionVisble(true)}
          >
            Description
          </button>
          <button
            className={`text-3xl pb-2 mx-5 ${
              isDescriptionVisible || "border-b-3"
            }`}
            onClick={() => setDescriptionVisble(false)}
          >
            Reviews({productReviews?.length})
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <div className="w-full py-10 h-auto">
          {isDescriptionVisible ? (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p>{product.description}</p>
            </motion.div>
          ) : (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col lg:flex-row gap-5 items-center"
            >
              <div className="flex w-full flex-col lg:flex-row gap-5">
                <div className="flex-1/2 flex-col col-span-6">
              {productReviews.length>0 && productReviews.map((elem,ind)=>(
                <ProductReviews review={elem}/>
              ))}
              </div>
                <RatingForm product={product} />
              </div>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Product;
