import { CiShoppingCart } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import React, { useState, useEffect } from "react";
import HeroButton from "./button";
import FadeInFromBottom from "../../../ui/animations/FadeInFromBottom";
import { Navigate, useNavigate } from "react-router";
import { current } from "@reduxjs/toolkit";

const HeroSection = ({ item, slideBack, slideForward }) => {
  const data = item.hero;
  const current = item.current;
  const navigate = useNavigate();

  return (
    <>
      <div className="overflow-hidden items-center justify-center pb-30 sm:pb-50 ">
        {current === 0 && (
          <div className="px-10 sm:px-18 relative  md:px-25 lg:px-40 container-one grid grid-cols-1 md:grid-cols-2 pt-10 pb-20 md:py-20 lg:py-30 gap-10 w-full justify-between">
            <IoIosArrowBack
              className="icon-left absolute left-[5%] top-[40%] lg:left-[7%] text-5xl text-violet-400  hover:text-violet-700  hidden cursor-pointer"
              onClick={slideBack}
            />

            <div className="flex flex-col justify-center  w-fit gap-3">
              <h5 className="text-md sm:text-lg font-semibold leading-4  ">
                New Arrival
              </h5>
              <FadeInFromBottom duration={1} delay={0} yOffset={50}>
                <div className="flex flex-col gap-3">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-10 md:leading-15 tracking-wide">
                    New Design <br />
                    Bluetooth Speaker1
                  </h1>
                  <button className="shop-btn md:px-15 md:py-4 px-8 py-3 bg-transparent border-1  w-fit">
                    SHOP NOW
                  </button>
                </div>
              </FadeInFromBottom>
            </div>
            <div>
              <FadeInFromBottom duration={1} delay={0.8} yOffset={100}>
                <img src={data[0].image} className="bg-transparent m-auto" />
              </FadeInFromBottom>
            </div>
            <IoIosArrowForward
              className="icon-right absolute right-[10%] top-[40%] text-5xl text-violet-400  hover:text-violet-700  hidden cursor-pointer"
              onClick={slideForward}
            />
          </div>
        )}

        {current == 1 && (
          <div className=" relative px-10 sm:px-18  md:px-25 lg:px-40 container-one grid grid-cols-1 md:grid-cols-2 pt-10 pb-20 md:py-20 lg:py-30 w-full justify-between">
            <IoIosArrowBack
              className="icon-left absolute  left-[5%] top-[40%] lg:left-[7%] text-5xl  hover:text-violet-700 text-violet-400 hidden cursor-pointer"
              onClick={slideBack}
            />
            <div className="flex flex-col justify-center  w-fit gap-3">
              <h5 className="text-lg font-semibold leading-4  ">
                Smart Products
              </h5>
              <FadeInFromBottom delay={0.8} yOffset={50} duration={1}>
                <div className="flex flex-col gap-3">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-15 tracking-wide">
                    Summer offer
                    <br />
                    2024 Collection
                  </h1>
                  <button className="shop-btn px-15 py-4 bg-transparent border-1  w-fit">
                    SHOP NOW
                  </button>
                </div>
              </FadeInFromBottom>
            </div>
            <div className="w-full ">
              <FadeInFromBottom duration={1} delay={0.8} yOffset={100}>
                <img src={data[1].image} className="bg-transparent m-auto" />
              </FadeInFromBottom>
            </div>

            <IoIosArrowForward
              className="icon-right absolute right-[10%]  top-[40%] text-5xl :text-violet-400   hover:text-violet-700 text-violet-400 hidden cursor-pointer"
              onClick={slideForward}
            />
          </div>
        )}


        {current === 1 && (
          <div className="px-10  relative sm:px-18  md:px-25 lg:px-40 container-one grid grid-cols-1 md:grid-cols-2 pt-10 pb-20 md:py-20 lg:py-30  w-full justify-between">
            <IoIosArrowBack
              className="icon-left absolute left-[5%] top-[40%] lg:left-[7%] text-5xl text-violet-400 hover:text-violet-700  hidden cursor-pointer"
              onClick={slideBack}
            />
           
            <div className="flex flex-col justify-center  w-fit gap-3">
              <h5 className="text-lg font-semibold leading-4  ">Smart Products</h5>
              <FadeInFromBottom delay={0.8} yOffset={50} duration={1}>
                <div className="flex flex-col gap-3">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-15 tracking-wide">
                    Summer offer <br />
                    2024 Collection
                  </h1>
                  <button className="shop-btn px-15 py-4 bg-transparent border-1  w-fit">
                    SHOP NOW
                  </button>
                </div>
              </FadeInFromBottom>
            </div>
            <div className="w-1/2">
              <FadeInFromBottom duration={1} delay={0.8} yOffset={100}>
                <img src={data[1].image} className="bg-transparent m-auto" />
              </FadeInFromBottom>
            </div>
            <IoIosArrowForward
              className="icon-right absolute right-[10%] top-[40%] text-5xl text-violet-400 hover:text-violet-700 hidden cursor-pointer"
              onClick={slideForward}
            />
          </div>
        )}
        {current === 2 && (
          <div className="px-10  relative sm:px-18  md:px-25 lg:px-40 container-one grid grid-cols-1 md:grid-cols-2 pt-10 pb-20 md:py-20 lg:py-30  w-full justify-between">
            <IoIosArrowBack
              className="icon-left absolute left-[5%] top-[40%] lg:left-[7%] text-5xl text-violet-400 hover:text-violet-700  hidden cursor-pointer"
              onClick={slideBack}
            />
            <div className="flex flex-col justify-center  w-fit gap-3">
              <h5 className="text-lg font-semibold leading-4  ">New Arrival</h5>
              <FadeInFromBottom duration={1} delay={0} yOffset={50}>
                <div className="flex flex-col gap-3">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-15 tracking-wide">
                    New Design <br />
                    Bluetooth Speaker3
                  </h1>
                  <button className="shop-btn px-15 py-4 bg-transparent border-1  w-fit">
                    SHOP NOW
                  </button>
                </div>
              </FadeInFromBottom>
            </div>
            <div>
              <FadeInFromBottom duration={1} delay={0.8} yOffset={100}>
                <img src={data[2].image} className="bg-transparent m-auto" />
              </FadeInFromBottom>
            </div>
            <IoIosArrowForward
              className="icon-right absolute right-[10%] top-[40%] text-5xl text-violet-400 hover:text-violet-700 hidden cursor-pointer"
              onClick={slideForward}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default HeroSection;
