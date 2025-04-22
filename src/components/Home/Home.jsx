import slideOne from "../../assets/slide1.png";
import slideTwo from "../../assets/slide2.png";
import product3 from "../../assets/slide3.jpg";
import product1 from "../../assets/product1.jpg";
import product2 from "../../assets/product2.jpg";


import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useRef } from "react";
import "./Home.css";
import { useState } from "react";
import QuickView from "./components/QuickView";
import FadeInFromBottom from "../../ui/animations/FadeInFromBottom";
import Testimonial from "./components/Testimonial";
import { useNavigate } from "react-router";
import FeaturedProducts from "./components/homeProducts";
import Banner from "./components/banner";
const Home = () => {
  const [visibleContainer, setVisibleContainer] = useState({
    one: true,
    two: false,
    three: false,
  });
  const [quickViewVisble, setQuickViewVisble] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const navigate = useNavigate();

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
  const showQuickView = (item) => {
    setQuickViewItem(item);
    setQuickViewVisble(true);
  };

  const handleHeroBtn = () => {
    if (visibleContainer.one) navigate("/category/product/1");
    else if (visibleContainer.two) navigate("/category/product/2");
    else navigate("/category/product/3");
  };
  return (
    <>
      <section className=" bg-[rgb(218,237,255)]">
        <div className="flex overflow-hidden items-center justify-center pb-30 sm:pb-50 ">
          <div
            ref={refContainer1}
            className="px-10 sm:px-18 relative  md:px-25 lg:px-40 container-one grid grid-cols-1 md:grid-cols-2 pt-10 pb-20 md:py-20 lg:py-30 gap-10 w-full justify-between"
          >
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
                    Bluetooth Speaker{(visibleContainer.one && "1") ||
                    (visibleContainer.two && "2") ||
                    (visibleContainer.three && "3")}
                  </h1>
                  <button
                    className="hero-shop-btn md:px-15 md:py-4 px-8 py-3 z-2 bg-transparent border-1  w-fit"
                    onClick={handleHeroBtn}
                  >
                    <span className="absolute inset-0  -z-1"></span>
                    SHOP NOW
                  </button>
                </div>
              </FadeInFromBottom>
            </div>
            <div>
              <FadeInFromBottom duration={1} delay={0.8} yOffset={100}>
                <img
                  src={
                    (visibleContainer.one && slideOne) ||
                    (visibleContainer.two && slideTwo) ||
                    (visibleContainer.three && slideOne)
                  }
                  className="bg-transparent m-auto h-auto xl:h-100"
                />
              </FadeInFromBottom>
            </div>
            <IoIosArrowForward
              className="icon-right absolute right-[10%] top-[40%] text-5xl text-violet-400  hover:text-violet-700  hidden cursor-pointer"
              onClick={slideForward}
            />
          </div>

          {/* {visibleContainer.two && (
            <div
              ref={refContainer2}
              className=" relative px-10 sm:px-18  md:px-25 lg:px-40 container-one grid grid-cols-1 md:grid-cols-2 pt-10 pb-20 md:py-20 lg:py-30 w-full justify-between"
            >
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
                      Summer offer<br />
                      2024 Collection
                    </h1>
                    <button className="shop-btn px-15 py-4 bg-transparent border-1  w-fit" onClick={()=>navigate("/category/product/1")}>
                      SHOP NOW
                    </button>
                  </div>
                </FadeInFromBottom>
              </div>
              <div className="w-full ">
                <FadeInFromBottom duration={1} delay={0.8} yOffset={100}>
                  <img src={slideTwo} className="bg-transparent m-auto" />
                </FadeInFromBottom>
              </div>

              <IoIosArrowForward
                className="icon-right absolute right-[10%]  top-[40%] text-5xl :text-violet-400   hover:text-violet-700 text-violet-400 hidden cursor-pointer"
                onClick={slideForward}
              />
            </div>
          )}

          {visibleContainer.three && (
            <div className="px-10  relative sm:px-18  md:px-25 lg:px-40 container-one grid grid-cols-1 md:grid-cols-2 pt-10 pb-20 md:py-20 lg:py-30  w-full justify-between">
              <IoIosArrowBack
                className="icon-left absolute left-[5%] top-[40%] lg:left-[7%] text-5xl text-violet-400 hover:text-violet-700  hidden cursor-pointer"
                onClick={slideBack}
              />
              <div className="flex flex-col justify-center  w-fit gap-3">
                <h5 className="text-lg font-semibold leading-4  ">
                  New Arrival
                </h5>
                <FadeInFromBottom duration={1} delay={0} yOffset={50}>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-15 tracking-wide">
                      New Design <br />
                      Bluetooth Speaker3
                    </h1>
                    <button className="shop-btn px-15 py-4 bg-transparent border-1  w-fit" onClick={()=>navigate("/category/product/1")}>
                      SHOP NOW
                    </button>
                  </div>
                </FadeInFromBottom>
              </div>
              <div>
                <FadeInFromBottom duration={1} delay={0.8} yOffset={100}>
                  <img src={slideOne} className="bg-transparent m-auto" />
                </FadeInFromBottom>
              </div>
              <IoIosArrowForward
                className="icon-right absolute right-[10%] top-[40%] text-5xl text-violet-400 hover:text-violet-700 hidden cursor-pointer"
                onClick={slideForward}
              />
            </div>
          )} */}
        </div>
      </section>
      <section className="px-10 sm:px-18  md:px-25 lg:px-40 overfllow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 items-center mt-[-100px] sm:mt-[-180px] pb-20">
          <div className="flex flex-col items-center justify-end pb-10 gap-2 w-75 sm:w-[375px] h-80 sm:h-[350px] relative overflow-hidden" onClick={()=>navigate("/category")}>
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
          <div className="flex flex-col items-center justify-end pb-10 gap-2 w-75 sm:w-[375px] h-80 sm:h-[350px] relative overflow-hidden" onClick={()=>navigate("/category")}>
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
          <div className="flex flex-col items-center justify-end pb-10 gap-2 w-75 sm:w-[375px] h-80 sm:h-[350px] relative overflow-hidden" onClick={()=>navigate("/category")}>
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
      <section className="px-10 md:px-20 overflow-hidden py-10">
        <FeaturedProducts quickView={showQuickView}/>
       
          {/* {[...Array(8)].map((elem,ind)=>
          <div key={ind} className="mb-[35px]  flex flex-col w-[-260px] relative hover:not-target:.cart-flex transform transition-all ease-in">
            <span className="z-10 text-pink-400 text-s font-semibold absolute top-5 right-5">
              -10%
            </span>
            <span className="z-10 absolute top-12 right-6 text-xs text-violet-500 font-semibold">
              New
            </span>

            <div
              className="group product-one w-[260px] h-[345px]"
              onClick={() => navigate(`category/product/${1}`)}
            >
              <CiShoppingCart
                title="Add Cart"
                className="cursor-pointer icon brightness-50 opacity-0 group-hover:brightness-100 group-hover:opacity-100 transition-opacity transition-brightness duration-300 z-10 absolute top-1/2 right-22 bg-[rgb(31,115,23)] text-white hover:text-black hover:bg-white rounded-4xl text-3xl "
                onClick={(e) => {
                  e.stopPropagation();
                  ("add to cart dispacther");
                }}
              />
              <FaEye
                title="Quick View"
                className="cursor-pointer icon brightness-50 opacity-0 group-hover:brightness-100  group-hover:opacity-100 transition-opacity transition-brightness duration-300  absolute top-1/2 left-22  bg-[rgb(31,115,23)] text-white hover:text-black hover:bg-white rounded-4xl   text-3xl z-10 "
                onClick={(e) => {
                  e.stopPropagation();
                  showQuickView("elem from map");
                }}
              />
            </div>
            <div className="flex justify-between mt-[20px] gap-1">
              <div>
                <h1 className="hover:text-gray-600 cursor-pointer ">
                  Lorem Ispum Speaker
                </h1>
                <p>
                  <span>$10</span> -
                  <strike className="text-[rgb(127,127,127)]">$15</strike>
                </p>
              </div>
              <CiShoppingCart
                title="Add Cart"
                className="cursor-pointer brightness-100  group-hover:brightness-70 group-hover:opacity-100 transition-opacity transition-brightness duration-300 z-10  bg-amber-50 rounded-4xl text-3xl"
              />
            </div>
          </div>)} */}
      
      </section>
      <section className="flex items-center justify-center">
        {quickViewVisble && (
          <QuickView
            visible={quickViewVisble}
            setVisible={setQuickViewVisble}
            product={quickViewItem}
          />
        )}
      </section>
      {/* <QuickView />  */}
      <section>
        <Banner/>
        
      </section>

      <section className="mt-6  sm:mb-20 ">
        <Testimonial />
      </section>
    </>
  );
};

export default Home;
