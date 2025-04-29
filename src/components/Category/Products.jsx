import { useNavigate } from "react-router";
import image1 from "../../assets/1.jpg";
import image2 from "../../assets/7.jpg";
import { CiShoppingCart } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import QuickView from "../quickView/QuickView";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/Redux/cartSlice";
import { toast,ToastContainer } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Products = ({ product }) => {
  const [QuickViewVisible, setQuickViewVisible] = useState(false);
  const [addedToCart,setAddedToCart]=useState(false)

  const cartItems = useSelector((state) => state.reducer.items);
  useEffect(() => {
    const isInCart = cartItems.some(
      (elem) => elem?.variant?.id === product.variants[0]?.id
    );
    setAddedToCart(isInCart);
    // console.log(cartItems);
  }, [cartItems, product]);

  const dispatch=useDispatch()
  const price=product.variants[0]?.price
  const discount=product.variants[0]?.discount
  let actualPrice = price;

  
  if(discount) actualPrice=(price/(1-(discount/100))).toFixed(2)


  const navigate = useNavigate();
  const quickView = (e) => {
    e.stopPropagation();
    setQuickViewVisible(true);
  };
  
  const createdDate = new Date(product.created_at);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - createdDate.getTime();
  const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;


  const handleAddToCart = (e) => {
    e.stopPropagation();
    if(!addedToCart){
      const item = {
        id: product.id,
        name: product.product_name,
        variant: product?.variants[0],
        quantity: 1,
      };
      // console.log(item)
      dispatch(addToCart(item));
      alert("Product Added to Cart");
      

    }
    };
  return (
    <>
    
      <div className=" relative group mb-[35px]  flex flex-col  cursor-pointer w-full h-auto  shadow-md rounded-lg overflow-hidden">
        <span className="z-20 text-pink-400 text-s font-semibold absolute top-5 right-5">
          {discount>0?"-"+discount + "%":null}
        </span>
        <span className="z-20 absolute top-12 right-6 text-xs text-violet-500 font-semibold">
          {timeDifference<sevenDaysInMillis? "New":null}
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
              src={`${BASE_URL}${product.variants[0]?.images[0]}`}
              alt="product 2"
              className="object-cover h-80 w-auto z-10"
            />
            <div className=" flex w-full  items-center gap-0">
              <span
                className="flex items-center justify-center cursor-pointer brightness-100  opacity-100 transition-opacity transition-brightness duration-300  bg-[rgb(167,73,255)] hover:bg-black w-2/11 h-12 text-xl"
                onClick={handleAddToCart}
              >
                <CiShoppingCart title="Add Cart" className={`text-3xl ${addedToCart?"cursor-not-allowed":null}`} />
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
              {product.product_name}
            </h1>
            <p className="text-center">
              <span>${product.variants[0]?.price}</span> 
              

              { actualPrice!=price && <span className="text-[rgb(127,127,127)]"> - <strike>{actualPrice}</strike></span>}
            </p>
          </div>
        </div>
      </div>

      {QuickViewVisible && (
        <QuickView
          product={product}
          setVisible={setQuickViewVisible}
          visible={QuickViewVisible}
        />
      )}
      
    </>
  );
};

export default Products;
