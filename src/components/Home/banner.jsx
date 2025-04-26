import { FaArrowRight } from "react-icons/fa";
import banner1 from "../../assets/banner-8.png"
import banner2 from "../../assets/banner-9.png"

import "../../styles/Home/banner.css"
import { useNavigate } from "react-router";
const Banner = () => {

    const navigate= useNavigate()
    return (<>
    <div className="w-full px-10 sm:px-18  md:px-25 lg:px-40 ">
          <div className="flex items-center justify-center flex-col md:flex-row gap-10 w-full">
            <div className="banner relative overflow-hidden w-fit">
              <img src={banner1} alt="banner photo" className="banner-image" onClick={()=>navigate("/category/product/10")}/>
              <div className="flex flex-col gap-0 sm:gap-5 md:gap-2  lg:gap-3 absolute top-2/12 left-1/12 sm:top-15 sm:left-10 md:top-5 md:left-5  lg:top-7 lg:left-5 xl:left-10 xl:top-15" onClick={(e)=>e.stopPropagation()}>
              <h1 className="text-2xl sm:text-5xl md:text-3xl lg:text-3xl xl:text-5xl">HeadPhone</h1>
              <p className="text-md sm:text-2xl md:text-lg lg:text-lg xl:text-2xl">Staring at $99.9</p>

              <span className=" mt-5 sm:mt-7 md:mt-6 xl:mt-15 flex border-2 w-fit rounded-full p-2 cursor-pointer" onClick={()=>navigate("/category")}>
                <FaArrowRight/>
              </span>
              </div>
            </div>
            <div className="banner relative overflow-hidden w-fit">
              <img src={banner2} alt="banner photo" className="banner-image" onClick={()=>navigate("/category/product/11")}/>
              <div className="flex flex-col gap-0 sm:gap-5 md:gap-2  lg:gap-3 absolute top-2/12 left-1/12 sm:top-15 sm:left-10 md:top-5 md:left-5  lg:top-7 lg:left-5 xl:left-10 xl:top-15" onClick={(e)=>e.stopPropagation()}>
              <h1 className="text-2xl sm:text-5xl md:text-3xl lg:text-3xl xl:text-5xl">Bluetooth</h1>
              <p className="text-md sm:text-2xl md:text-lg lg:text-lg xl:text-2xl">Staring at $79.9</p>

              <span className=" mt-5 sm:mt-7 md:mt-6 xl:mt-15 flex border-2 w-fit rounded-full p-2 cursor-pointer" onClick={()=>navigate("/category")}>
                <FaArrowRight/>
              </span>
              </div>
            </div>

          </div>
        </div>
    </>  );
}
 
export default Banner;