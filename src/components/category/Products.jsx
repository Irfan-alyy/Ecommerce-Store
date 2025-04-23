import { useNavigate } from "react-router";
import image1 from "../../assets/1.jpg";
import image2 from "../../assets/7.jpg";
import { CiShoppingCart } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import QuickView from "../Home/components/QuickView";
import { useState } from "react";

const Product = ({ product }) => {
  const [QuickViewVisible, setQuickViewVisible] = useState(false);

  const actualPrice = (product.price + product.price * 0.1).toFixed(2);
  const navigate = useNavigate();
  const quickView = (e) => {
    e.stopPropagation();
    setQuickViewVisible(true);
  };
const addToCart = (e) => {
  e.stopPropagation();
  // Add to cart logic here
  console.log("Product added to cart:", product.id);
}


  return (
    <>
      <div className=" relative group mb-[35px]  flex flex-col  cursor-pointer w-full h-auto  shadow-md rounded-lg overflow-hidden">
        <span className="z-20 text-pink-400 text-s font-semibold absolute top-5 right-5">
          -10%
        </span>
        <span className="z-20 absolute top-12 right-6 text-xs text-violet-500 font-semibold">
          New
        </span>

        <div
          className="w-full h-auto"
          onClick={() => navigate(`product/${product.id}`)}
        >
          {/* <div className="relative w-full h-auto group-hover:opacity-0 transition-opacity duration-300 flex justify-between">
            <img src={product.image} alt="product" className="group-hover:hidden object-cover " />
            <img src={image2} alt="product" className="hidden group-hover:block" />
            </div> */}

          <div className="flex items-center justify-center flex-col w-full inset-0 group-hover:flex z-50 ">
            <img
              src={product.image}
              alt="product 2"
              className="object-cover h-80 w-auto z-10"
            />
            <div className=" flex w-full  items-center gap-0">
              <span className="flex items-center justify-center cursor-pointer brightness-100  opacity-100 transition-opacity transition-brightness duration-300  bg-[rgb(167,73,255)] hover:bg-black w-2/11 h-12 text-xl"
                onClick={addToCart}>
                <CiShoppingCart title="Add Cart" className="text-3xl" />
              </span>
              <button
                type="submit"
                className=" py-3 bg-[rgb(167,73,255)] text-white text-md hover:bg-black  font-semibold  cursor-pointer w-8/12 border-x-1"
              >
                Select Options
              </button>
              <span
                className="flex items-center justify-center cursor-pointer brightness-100  opacity-100 transition-opacity transition-brightness duration-300   bg-[rgb(167,73,255)] hover:bg-black w-2/12 h-12 text-xl"
                onClick={quickView}
              >
                <FaEye title="Quick View" className="text-3xl" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-[20px] gap-1 w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="hover:text-gray-600 cursor-pointer w-8/12 m-auto truncate text-center text-[rgb(119,55,178)] font-semibold text-lg">
              {product.title}
            </h1>
            <p className="text-center">
              <span>${product.price}</span> -
              <strike className="text-[rgb(127,127,127)]">{actualPrice}</strike>
            </p>
          </div>
        </div>
      </div>

      {QuickViewVisible&& (
        <QuickView
          product={product}
          setVisible={setQuickViewVisible}
          visible={QuickViewVisible}
        />
      )}
    </>
  );
};

export default Product;
