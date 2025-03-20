import slideOne from "../../assets/slide1.png";
import slideTwo from "../../assets/slide2.png";
import product3 from "../../assets/slide3.jpg";
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";
import img1 from "../../assets/1.jpg";
import { FaEye } from "react-icons/fa";

import { CiShoppingCart } from "react-icons/ci";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useRef } from "react";
import "./Home.css";
import { useState } from "react";
import QuickView from "./QuickView";
const Home = () => {
  const [visibleContainer, setVisibleContainer] = useState({
    one: true,
    two: false,
    three: false,
  });


  const refContainer1 = useRef();
  const refContainer2 = useRef();
  const refContainer3 = useRef();

  const slideForward = (e) => {
    if (visibleContainer.one == true) {
      setVisibleContainer({
        one: false,
        two: true,
        three: false,
      });
    }
    if (visibleContainer.two == true) {
      setVisibleContainer({
        one: false,
        two: false,
        three: true,
      });
    }
    if (visibleContainer.three == true) {
      setVisibleContainer({
        one: true,
        two: false,
        three: false,
      });
    }
  };
  const slideBack = (e) => {
    if (visibleContainer.one == true) {
      setVisibleContainer({
        one: false,
        two: false,
        three: true,
      });
    }
    if (visibleContainer.two == true) {
      setVisibleContainer({
        one: true,
        two: false,
        three: false,
      });
    }
    if (visibleContainer.three == true) {
      setVisibleContainer({
        one: false,
        two: true,
        three: false,
      });
    }
  };
  const quickView=(product)=>{


  }

  return (
    <>
      <section className=" bg-[rgb(218,237,255)]">
        <div className="flex overflow-hidden items-center justify-center  pb-50 ">
          {visibleContainer.one && (
            <div
              ref={refContainer1}
              className="px-10 sm:px-18  md:px-25 lg:px-40 container-one grid grid-cols-1 md:grid-cols-2 pt-10 pb-20 md:py-20 lg:py-30 gap-10 w-full justify-between"
            >
              <IoIosArrowBack
                className="icon-left absolute  left-25 top-110 text-5xl text-violet-400  hover:text-violet-700  hidden cursor-pointer"
                onClick={slideBack}
              />
              <div className="flex flex-col justify-center  w-fit gap-3">
                <h5 className="text-lg font-semibold leading-4  ">
                  New Arrival
                </h5>
                <h1 className="text-4xl font-semibold leading-15 tracking-wide">
                  New Design <br />
                  Bluetooth Speaker1
                </h1>
                <button className="shop-btn px-15 py-4 bg-transparent border-1  w-fit">
                  SHOP NOW
                </button>
              </div>
              <div>
                <img src={slideOne} className="bg-transparent m-auto" />
              </div>
              <IoIosArrowForward
                className="icon-right absolute right-30 top-110 text-5xl text-violet-400  hover:text-violet-700  hidden cursor-pointer"
                onClick={slideForward}
              />
            </div>
          )}

          {visibleContainer.two && (
            <div
              ref={refContainer2}
              className="px-10 sm:px-18  md:px-25 lg:px-40 container-one grid grid-cols-1 md:grid-cols-2 pt-10 pb-20 md:py-20 lg:py-30 w-full justify-between"
            >
              <IoIosArrowBack
                className="icon-left absolute  left-25 top-110 text-5xl  hover:text-violet-700 text-violet-400 hidden cursor-pointer"
                onClick={slideBack}
              />
              <div className="flex flex-col justify-center  w-fit gap-3">
                <h5 className="text-lg font-semibold leading-4  ">
                  Smart Products
                </h5>
                <h1 className="text-5xl font-semibold leading-15 tracking-wide">
                  Summer offer
                  <br />
                  2024 Collection
                </h1>
                <button className="shop-btn px-15 py-4 bg-transparent border-1  w-fit">
                  SHOP NOW
                </button>
              </div>
              <div className="w-full ">
                <img src={slideTwo} className="bg-transparent m-auto" />
              </div>

              <IoIosArrowForward
                className="icon-right absolute right-30 top-110 text-5xl :text-violet-400  hover:text-violet-700  hidden cursor-pointer"
                onClick={slideForward}
              />
            </div>
          )}

          {visibleContainer.three && (
            <div className="px-10 sm:px-18  md:px-25 lg:px-40 container-one grid grid-cols-1 md:grid-cols-2 pt-10 pb-20 md:py-20 lg:py-30  w-full justify-between">
              <IoIosArrowBack
                className="icon-left absolute  left-25 top-110 text-5xl text-violet-400 hover:text-violet-700  hidden cursor-pointer"
                onClick={slideBack}
              />
              <div className="flex flex-col justify-center  w-fit gap-3">
                <h5 className="text-lg font-semibold leading-4  ">
                  New Arrival
                </h5>
                <h1 className="text-5xl font-semibold leading-15 tracking-wide">
                  New Design <br />
                  Bluetooth Speaker3
                </h1>
                <button className="shop-btn px-15 py-4 bg-transparent border-1  w-fit">
                  SHOP NOW
                </button>
              </div>
              <div>
                <img src={slideOne} className=" bg-transparent m-auto" />
              </div>
              <IoIosArrowForward
                className="icon-right absolute right-30 top-110 text-5xl text-violet-400 hover:text-violet-700 hidden cursor-pointer"
                onClick={slideForward}
              />
            </div>
          )}
        </div>
      </section>
      <section className="px-10 sm:px-18  md:px-25 lg:px-40">
        <div className="flex flex-col lg:flex-row gap-8 items-center mt-[-180px] pb-20">
          <div className="flex flex-col items-center justify-end pb-10 gap-2 w-[375px] h-[350px] relative overflow-hidden">
            <div className="absolute overflow-hidden">
              <img
                src={product1}
                alt="product-three"
                className="z-0 hover:scale-110 transition-all ease-in"
              />
            </div>
            <div className="z-10 flex flex-col items-center">
              <h5 className="text-lg">4 products</h5>
              <h2 className="text-xl font-semibold ">Bluetooth Speaker</h2>
            </div>
          </div>
          <div className="flex flex-col items-center justify-end pb-10 gap-2 w-[375px] h-[350px] relative overflow-hidden">
            <div className="absolute overflow-hidden">
              <img
                src={product2}
                alt="product-three"
                className="z-0 hover:scale-110 transition-all ease-in"
              />
            </div>
            <div className="z-10 flex flex-col items-center">
              <h5 className="text-lg">4 products</h5>
              <h2 className="text-xl font-semibold">Bluetooth Speaker</h2>
            </div>
          </div>
          <div className="flex flex-col items-center justify-end pb-10 gap-2 w-[375px] h-[350px] relative overflow-hidden">
            <div className="absolute overflow-hidden">
              <img
                src={product3}
                alt="product-three"
                className="z-0 hover:scale-110 transition-all ease-in"
              />
            </div>
            <div className="z-10 flex flex-col items-center">
              <h5 className="text-lg">4 products</h5>
              <h2 className="text-xl font-semibold">Bluetooth Speaker</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center md:mx-0 lg:mx-[200px] pb-22.5 justify-center text-center leading-7">
          <h6 className="text-xl font-medium">Who we are</h6>
          <h1 className="text-3xl font-semibold tracking-wide pb-5">
            Welcome To Flone
          </h1>
          <div className="bg-black h-1 w-20 mb-7"></div>
          <p className="text-lg leading-7 font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            illum ullam quidem tempore alias, facilis libero officiis excepturi
            vel optio praesentium recusandae accusamus autem quaerat itaque enim
            blanditiis nesciunt aut.
          </p>
        </div>
      </section>
      <section className="px-20">
        <div className="flex">
          <div className="mb-[35px]  flex flex-col w-[-260px] relative hover:not-target:.cart-flex transform transition-all ease-in">
            <span className="z-10 text-pink-400 text-s font-semibold absolute top-5 right-5">
              -10%
            </span>
            <span className="z-10 absolute top-12 right-6 text-xs text-violet-500 font-semibold">
              New
            </span>

            <div className="group product-one w-[260px] h-[345px]">
              <CiShoppingCart
                title="Add Cart"
                className="brightness-50 opacity-0 group-hover:brightness-100 group-hover:opacity-100 transition-opacity transition-brightness duration-300 z-10 absolute top-1/2 right-22 bg-[rgb(31,115,23)] text-white hover:text-black hover:bg-white rounded-4xl text-3xl "
              />
              <FaEye
                onClick={quickView}
                title="Quick View"
                className="brightness-50 opacity-0 group-hover:brightness-100  group-hover:opacity-100 transition-opacity transition-brightness duration-300  absolute top-1/2 left-22  bg-[rgb(31,115,23)] text-white hover:text-black hover:bg-white rounded-4xl   text-3xl z-10 "
              />
            </div>
            <div className="flex justify-between mt-[20px] gap-1">
              <div>
                <h1 className="hover:text-gray-600 cursor-pointer ">Lorem Ispum Speaker</h1>
                <p>
                  <span>$10</span>  - 
                  <strike className="text-[rgb(127,127,127)]">$15</strike>
                </p>
              </div>
              <CiShoppingCart
                title="Add Cart"
                className="cursor-pointer brightness-100  group-hover:brightness-70 group-hover:opacity-100 transition-opacity transition-brightness duration-300 z-10  bg-amber-50 rounded-4xl text-3xl"
              />
            </div>
          </div>
        </div>
      </section>
      <QuickView />
    </>
  );
};

export default Home;
