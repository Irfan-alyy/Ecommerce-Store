import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useFeaturedProducts from "../../customHooks/useFeaturedProducts";
import FadeInFromBottom from "../../ui/animations/FadeInFromBottom";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import product1 from "../../assets/headphones.png"
import product3 from "../../assets/watch.png"

import product2 from "../../assets/slide1.png";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const HeroSection = () => {
  const [visibleContainer, setVisibleContainer] = useState({
    one: true,
    two: false,
    three: false,
  });
  const [current, setCurrent] = useState(0);
  const [currentProduct, setCurrentProduct] = useState([]);
  const { FeaturedProducts, loading, error } = useFeaturedProducts();

  const images=[product1, product2, product3]

  useEffect(() => {
    if (FeaturedProducts.length > 0) {
      setCurrentProduct(FeaturedProducts[current]);
    }
  }, [FeaturedProducts, current]);

  const refContainer1 = useRef();
  const navigate = useNavigate();

  const slideForward = (e) => {
    if (current === 2) {
      setCurrent(0);
      return;
    }
    setCurrent(current + 1);
    // if (visibleContainer.one == true) {
    //   setVisibleContainer({
    //     one: false,
    //     two: true,
    //     three: false,
    //   });
    // }
    // if (visibleContainer.two == true) {
    //   setVisibleContainer({
    //     one: false,
    //     two: false,
    //     three: true,
    //   });
    // }
    // if (visibleContainer.three == true) {
    //   setVisibleContainer({
    //     one: true,
    //     two: false,
    //     three: false,
    //   });
    // }
  };
  const slideBack = (e) => {
    if (current === 0) {
      setCurrent(2);
      return;
    }
    setCurrent(current - 1);
    // if (visibleContainer.one == true) {
    //   setVisibleContainer({
    //     one: false,
    //     two: false,
    //     three: true,
    //   });
    // }
    // if (visibleContainer.two == true) {
    //   setVisibleContainer({
    //     one: true,
    //     two: false,
    //     three: false,
    //   });
    // }
    // if (visibleContainer.three == true) {
    //   setVisibleContainer({
    //     one: false,
    //     two: true,
    //     three: false,
    //   });
    // }
  };

  const handleHeroBtn = () => {
    navigate(`/category/product/${currentProduct.id}`);
  };


  if (error) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-[rgb(218,237,255)]">
        <h1 className="text-2xl font-bold">{error}</h1>
      </div>
    );
  }
  if (loading || FeaturedProducts.length == 0 || currentProduct.length == 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-[rgb(218,237,255)]">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }
  return (
    <section className=" bg-[rgb(218,237,255)] min-h-[115vh]">
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
            <FadeInFromBottom duration={1} delay={0} yOffset={50} key={current}>
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-10 md:leading-15 tracking-wide">
                  {/* New Design <br />
                        Bluetooth Speaker
                        {(visibleContainer.one && "1") ||
                          (visibleContainer.two && "2") ||
                          (visibleContainer.three && "3")} */}

                  {currentProduct.product_name}
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
          <div className="bg-transparent">
            <FadeInFromBottom
              duration={1}
              delay={0.5}
              yOffset={100}
              key={current}
              className="bg-transparent"
            >
              <img
                src={images[current]}
                className="object-fill m-auto h-auto xl:h-100"
                alt={currentProduct.title}
              />
            </FadeInFromBottom>
          </div>
          <IoIosArrowForward
            className="icon-right absolute right-[10%] top-[40%] text-5xl text-violet-400  hover:text-violet-700  hidden cursor-pointer"
            onClick={slideForward}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
