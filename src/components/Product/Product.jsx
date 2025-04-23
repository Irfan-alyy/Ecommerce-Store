import { useEffect, useRef, useState } from "react";
import image1 from "../../assets/1.jpg";
import { IoCloseSharp } from "react-icons/io5";
import image2 from "../../assets/7.jpg";
import image3 from "../../assets/product1.jpg";
import image4 from "../../assets/product2.jpg";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import BasicButton from "../../ui/components/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
  TiSocialDribbble,
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialPinterest,
  TiSocialTwitter,
} from "react-icons/ti";
import { borderBottom } from "@mui/system";
import RatingForm from "./RatingForm";
import { useParams } from "react-router";
import axios from "axios";
import useProduct from "./useProduct";

const Product = () => {
  const { id } = useParams();
  const {product, loading,error} = useProduct({id});
  const [startIndex, setStartIndex] = useState(0);
  const [currentPic, setCurrentPic] = useState("");
  const [isDescriptionVisible, setDescriptionVisble] = useState(true);
  const images = [image1, image2, image3, image4];
  const visibleCount = 4;
  useEffect(() => {
   images.unshift(product?.image) 
   setCurrentPic(images[0])
  },[product]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1) % images.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1 + images.length) % images.length);
  };

  const getVisibleImages = () => {
    const endIndex = startIndex + visibleCount;
    if (endIndex <= images.length) {
      return images.slice(startIndex, endIndex);
    } else {
      return [
        ...images.slice(startIndex),
        ...images.slice(0, endIndex - images.length),
      ];
    }
  };
 if(loading){
  return <p className="text-center text-2xl">Loading...</p>
 }


  return (
    <div className="px-10 sm:px-20 md:px-30 xl:px-40">
      
      <div className="justify-center h-auto bg-white rounded-xl py-10 lg:py-25  ">
        <div className="flex flex-col lg:flex-row  py-5 lg:py-10 gap-5 md:gap-10 lg:gap-15">
          <div className=" flex flex-col ">
            <div className=" relative flex w-full h-auto  bg-[rgb(246,246,246)] items-center justify-center">
              <img
                src={currentPic}
                alt="product"
                className=" w-full md:w-1/2"
              />
              <p className=" absolute top-5 left-5 bg-[rgb(250,107,255)] px-2 rounded text-sm">
                -30%
              </p>
            </div>

            <div className="relative w-full max-w-3xl mx-auto overflow-hidden group">
              <IoIosArrowBack
                onClick={handlePrev}
                className=" group-hover:hidden text-2xl absolute    left-0 top-1/2 -translate-y-1/2 "
              />
              <div className="w-full flex flex-row items-center justify-between gap-2 py-5">
                {getVisibleImages().map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`img-${idx}`}
                    className="w-[22.5%] object-cover transition-all  duration-500 "
                    onClick={() => setCurrentPic(src)}
                  />
                ))}
              </div>

              <IoIosArrowForward
                onClick={handleNext}
                className="text-2xl absolute right-0 top-1/2 -translate-y-1/2 "
              />
            </div>
          </div>
          <div className="flex flex-col w-11/12 pl-5">
            <div className="md:pr-15 flex flex-col md:gap-2 py-2">
              <h1 className="text-2xl md:text-3xl">{product.title}</h1>
              <p className="text-2xl py-2">
                ${product.price} <strike className="text-lg">{(product.price*1.1).toFixed(2)}</strike>
              </p>

              <p className="text-xl py-5 md:py-10">
                {product.description.slice(0,200)}...
              </p>
              <hr className="hidden md:block text-[#7d7d7dcb] pb-5  md:pb-10" />
              <BasicButton text="ADD TO CART" />
              <p className="leading-10 pt-5">Catagories:{product.category}</p>
              <p>Tags: {product.category}</p>

              <div className="flex gap-10 mt-5">
                <TiSocialFacebook className="text-2xl cursor-pointer" />
                <TiSocialDribbble className="text-2xl cursor-pointer" />
                <TiSocialPinterest className="text-2xl cursor-pointer" />
                <TiSocialTwitter className="text-2xl cursor-pointer" />
                <TiSocialLinkedin className="text-2xl cursor-pointer" />
              </div>
            </div>
          </div>
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
            Reviews({product?.ratings?.lenght || 0})
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
              <p>
                {product.description}
              </p>
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
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex flex-col lg:flex-row gap-5 w-7/12">
                  <img src={image1} alt="user" className="w-20 h-20" />
                  <div className="flex flex-col gap-4 ">
                    <div className=" w-full flex flex-wrap items-center gap-5 py-10">
                      <h3 className="flex-shrink-1">User Name</h3>
                      <span className="flex gap-1">
                        {[...Array(5)].map((_, ind) => (
                          <FaStar
                          key={ind}
                            className={`${ind < Math.ceil(product.rating.rate) ? "text-yellow-400" : ""}`}
                          />
                        ))}
                      </span>
                    </div>
                    <p className="max-w-lg">
                      Vestibulum ante ipsum primis aucibus orci luctustrices
                      posuere cubilia Curae Suspendisse viverra ed viverra.
                      Mauris ullarper euismod vehicula. Phasellus quam nisi,
                      congue id nulla.
                    </p>
                  </div>
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
