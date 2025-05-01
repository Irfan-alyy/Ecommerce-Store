
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
  {
    showProducts.map((elem,ind)=>{
      return(
      <div key={ind} className="poduct-card mb-[35px]  flex flex-col w-[-260px] relative cart-flex transform transition-all ease-in">
      <span className="z-10 text-pink-400 text-s font-semibold absolute top-5 right-5">
        -{elem.variants[0].discount}%
      </span>
      <span className="z-10 absolute top-12 right-6 text-xs text-violet-500 font-semibold">
        {isNew(elem.created_at) && "New"}
      </span>

      <div
        className=" bg-[rgb(246,246,246)] relative flex flex-col items-center justify-center overflow-hidden group product-one w-[260px] h-[345px]"
        onClick={() => navigate(`category/product/${elem.id}`)}
      >
        <img src={`${BASE_URL}${elem.variants[0].images[0]}`} alt="" loading="lazy" className="w-full hover-image1 absolute inset-0 object-cover transition transform duration-500 ease-in-out m-auto  " />
        <img src={`${BASE_URL}${elem?.variants[1]?.images[0] ||elem.variants[0].images[0] }`} alt="" className="hover-image2 absolute inset-0 object-cover transition transform duration-500 ease-in-out m-auto " />
        <CiShoppingCart
          title="Add Cart"
          className=" cart cursor-pointer icon  group-hover:brightness-100 group-hover:opacity-100 transition-opacity transition-brightness duration-300 z-10 absolute top-1/2 right-22 bg-[rgb(31,115,23)] text-white hover:text-black hover:bg-white rounded-4xl text-3xl "
          onClick={(e) => {
            e.stopPropagation();
            handleAddCart(showProducts[ind])
          }}
        />
        <FaEye
          title="Quick View"
          className="eye cursor-pointer icon  group-hover:brightness-100  group-hover:opacity-100 transition-opacity transition-brightness duration-500  absolute top-1/2 left-22  bg-[rgb(31,115,23)] text-white hover:text-black hover:bg-white rounded-4xl   text-3xl z-10 "
          onClick={(e)=>{
            e.stopPropagation()
            quickView(showProducts[ind])
          }}
        />
      </div>
      <div className="flex justify-between mt-[20px] gap-1">
        <div>
          <h1 className="hover:text-gray-600 cursor-pointer ">
            {elem.product_name}
          </h1>
          <p>
            <span>$ {elem.variants[0].price}</span> -
            <strike className="text-[rgb(127,127,127)]">{(elem.variants[0].price/(1-elem.variants[0].discount/100)).toFixed(2)}</strike>
          </p>
        </div>
        <CiShoppingCart
        onClick={()=>{handleAddCart(showProducts[ind])}}
          title="Add Cart"
          className="cursor-pointer brightness-100 hover:brightness-70  hover:opacity-100 transition-opacity transition-brightness duration-300 z-10  bg-amber-50 rounded-4xl text-3xl"
        />
      </div>
    </div>
    )})
  }
  {/* <QuickView /> */}
</div>
    </>  );
}
 
export default FeaturedProducts;