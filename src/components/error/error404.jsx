import React from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router";
function Error404(props) {
  return (
    <>
      <div className=" flex flex-col justify-center items-center md:w-full py-10">
        <div className="wrap w-7/12  text-center flex flex-col justify-center items-center">
          <h1 className="text-9xl lg:text-[300px] font-extrabold leading-40 lg:leading-80 text-[#A749FF]">
            404
          </h1>
          <h2 className="text-2xl font-bold mb-2">OPPS! PAGE NOT FOUND</h2>
          <p className="text-[#333333]">
            Sorry but the page you are looking for does not exist, have been
            removed, name changed or is temporarity unavailable.
          </p>

<div className="w-fit border-b-4 border-[#A749FF] my-3">
          <NavLink to="/">
            <button className="mt-10 mb-2 py-3 px-2 text-medium bg-[#A749FF] text-white hover:bg-black hover:text-white transition ease-linear duration-300">
              Back to home page
            </button>
          </NavLink>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Error404;
