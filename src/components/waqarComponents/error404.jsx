import React from "react";
import { FaSearch } from "react-icons/fa";
function Error404(props) {
  return (
    <>
      <div className="container w-full flex flex-col justify-center items-center md:w-full">
        <div className="wrap w-7/12  text-center flex flex-col justify-center items-center">
          <h1 className="text-[300px] font-extrabold leading-80 text-[#A749FF]">
            404
          </h1>
          <h2 className="text-2xl font-bold mb-2">OPPS! PAGE NOT FOUND</h2>
          <p className="text-[#333333]">
            Sorry but the page you are looking for does not exist, have been
            removed, name changed or is temporarity unavailable.
          </p>
          <label
            htmlFor="#"
            className="flex justify-center items-center my-2.5"
          >
            <input
              type="text"
              className="inline-block border h-10 border-[#3333] focus:outline-none pt-[1px] pr-[80px] pb-[1px] pl-[15px]"
              placeholder="Search..."
            />
            <button className="py-1  border-none bg-[#A749FF] text-white hover:bg-black transition duration-300 h-10 w-20">
              <FaSearch className="m-auto" />
            </button>
          </label>
          <button className="mt-10 mb-20 py-5 px-2 text-medium bg-[#A749FF] text-white hover:bg-black hover:text-white transition ease-linear duration-300">
                Back to home page
              </button>
        </div>
      </div>
    </>
  );
}

export default Error404;
