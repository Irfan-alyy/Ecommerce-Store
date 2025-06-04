
import { FaEye } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import useAllProducts from "../../customHooks/useFetchAllProducts";
import { useEffect, useState } from "react";
import QuickView from "../quickView/QuickView";
import { useNavigate } from "react-router";
import { addToCart } from "../../store/Redux/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FeaturedProducts = ({quickView}) => {

const [showProducts, setShowProducts]=useState([])
  const {products,loading, error} = useAllProducts()

  useEffect(()=>{
      setShowProducts(products.slice(0,8))
  },[products])

  const navigate=useNavigate()
  const dispatch=useDispatch()
  const cartItems = useSelector((state) => state.reducer.items);
  
  function isNew(createdAt) {
    const createdTime = new Date(createdAt).getTime(); // parse your ISO date
    const currentTime = Date.now(); // current timestamp in ms
    const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
    return (currentTime - createdTime) < sevenDaysInMillis;
  }
  // console.log(loading,error)
  // console.log(showProducts)


  const handleAddCart = (product) => {
    const isInCart = cartItems.some(
      (elem) => elem.variant.id === product.variants[0]?.id
    );

    if(isInCart){
      toast.info("Product Already added to cart",{position:"top-center"})
      return
    }
      const item = {
        id: product.id,
        name: product.product_name,
        variant: product.variants[0],
        quantity: 1,
      };
      toast.success("Product added to cart",{position:"top-center"})

      dispatch(addToCart(item));
    };
  

  if (error) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-[rgb(218,237,255)]">
        <h1 className="text-2xl font-bold">{error}</h1>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-[rgb(218,237,255)]">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }
    return (<>
    <ToastContainer/>
     <div className="flex items-center flex-wrap gap-10 justify-center">
 {showProducts.map((elem, ind) => {
  const variant = elem.variants?.[0];
  if (!variant) return null; // skip rendering if no variant

  return (
    <div key={ind} className="poduct-card ...">
      <span className="z-10 text-pink-400 text-s font-semibold absolute top-5 right-5">
        -{variant.discount}%
      </span>
      <span className="z-10 absolute top-12 right-6 text-xs text-violet-500 font-semibold">
        {isNew(elem.created_at) && "New"}
      </span>

      <div
        className="... product-one ..."
        onClick={() => navigate(`category/product/${elem.id}`)}
      >
        <img
          src={`${BASE_URL}${variant.images?.[0] || ""}`}
          alt=""
          loading="lazy"
          className="hover-image1 ..."
        />
        <img
          src={`${BASE_URL}${elem?.variants?.[1]?.images?.[0] || variant.images?.[0] || ""}`}
          alt=""
          loading="lazy"
          className="hover-image2 ..."
        />
        <CiShoppingCart
          title="Add Cart"
          className="cart ..."
          onClick={(e) => {
            e.stopPropagation();
            handleAddCart(elem);
          }}
        />
        <FaEye
          title="Quick View"
          className="eye ..."
          onClick={(e) => {
            e.stopPropagation();
            quickView(elem);
          }}
        />
      </div>

      <div className="flex justify-between mt-[20px] gap-1">
        <div>
          <h1 className="hover:text-gray-600 cursor-pointer ">
            {elem.product_name}
          </h1>
          <p>
            <span>$ {variant.price}</span> -
            <strike className="text-[rgb(127,127,127)]">
              {(variant.price / (1 - variant.discount / 100)).toFixed(2)}
            </strike>
          </p>
        </div>
        <CiShoppingCart
          onClick={() => handleAddCart(elem)}
          title="Add Cart"
          className="cursor-pointer ..."
        />
      </div>
    </div>
  );
})}

  {/* <QuickView /> */}
</div>
    </>  );
}
 
export default FeaturedProducts;