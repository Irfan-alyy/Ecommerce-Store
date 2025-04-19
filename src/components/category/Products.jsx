import { useNavigate } from "react-router";
import image1 from "../../assets/1.jpg";
import image2 from "../../assets/7.jpg";
import { CiShoppingCart } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import QuickView from "../Home/components/QuickView";
import Test from "./Test";

const Product = () => {
    const navigate=useNavigate()
    const quickView=(id)=>{
        return(
            <QuickView item={""}/>
        )
    }
  return (
    <>

        <div className=" relative group mb-[35px]  flex flex-col  cursor-pointer w-full h-auto  shadow-md rounded-lg overflow-hidden">
          <span className="z-10 text-pink-400 text-s font-semibold absolute top-5 right-5">
            -10%
          </span>
          <span className="z-10 absolute top-12 right-6 text-xs text-violet-500 font-semibold">
            New
          </span>

          <div
            className=" w-auto h-auto bg-amber-200"
            onClick={() => navigate(`product/${1}`)}
          >
            <div className="relative w-full h-auto group-hover:opacity-0 transition-opacity duration-300">
            <img src={image1} alt="product" className="group-hover:hidden" />
            <img src={image2} alt="product" className="hidden group-hover:block" />
            </div>

            <div className="w-full absolute inset-0 group-hover:flex hidden z-50 ">
              <img src={image2} alt="product 2" className="" />
              <div className=" flex absolute bottom-0 w-full  items-center gap-0">
                <span className="flex items-center justify-center cursor-pointer brightness-100  opacity-100 transition-opacity transition-brightness duration-300  bg-[rgb(167,73,255)] hover:bg-black w-13 h-12 text-xl">
                  <CiShoppingCart title="Add Cart" className="text-3xl" />
                </span>
                <button
                  type="submit"
                  className=" py-3 bg-[rgb(167,73,255)] text-white text-md hover:bg-black  font-semibold  cursor-pointer w-40 border-x-1"
                >
                  Select Options
                </button>
                <span
                  className="flex items-center justify-center cursor-pointer brightness-100  opacity-100 transition-opacity transition-brightness duration-300   bg-[rgb(167,73,255)] hover:bg-black w-13 h-12 text-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    quickView(1)
                  }}
                >
                  <FaEye title="Add Cart" className="text-3xl" />
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-[20px] gap-1">
            <div>
              <h1 className="hover:text-gray-600 cursor-pointer ">
                Lorem Ispum Speaker
              </h1>
              <p className="text-center">
                <span>$10</span> -
                <strike className="text-[rgb(127,127,127)]">$15</strike>
              </p>
            </div>
          </div>
        </div>
    

    </>
  );
};

export default Product