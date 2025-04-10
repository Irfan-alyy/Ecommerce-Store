import { useEffect, useRef, useState } from "react";
import image1 from "../../assets/1.jpg";
import { IoCloseSharp } from "react-icons/io5";
import image2 from "../../assets/7.jpg";
import image3 from "../../assets/product1.jpg";
import image4 from "../../assets/product2.jpg";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import BasicButton from "../../ui/components/Button";
import { TiSocialDribbble, TiSocialFacebook, TiSocialLinkedin, TiSocialPinterest, TiSocialTwitter } from "react-icons/ti";

const Product = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [currentPic, setCurrentPic] = useState(0);
  const images = [image1, image2, image3, image4];
  const visibleCount = 4;

  const total = images.length;

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1) % images.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1 + images.length) % images.length);
  };

  const getVisibleImages = () => {
    const endIndex = startIndex + visibleCount;
    if (endIndex <= images.length) {
      return images.slice(startIndex, endIndex);
    } else {
      return [
        ...images.slice(startIndex),
        ...images.slice(0, endIndex - images.length),
      ];
    }
  };

  return (
    <div className="flex  items-center justify-center px-40">
      <div className="justify-center h-auto bg-white rounded-xl py-10 lg:py-25  ">
        <div className="flex flex-col md:flex-row  py-5 lg:py-10 gap-15">
          <div className=" flex md:flex-col ">
            <div className=" relative flex w-full h-auto bg-[rgb(246,246,246)] items-center justify-center">
              <img src={image1} alt="" className="w-full " />
              <p className=" absolute top-5 left-5 bg-[rgb(250,107,255)] px-2 rounded text-sm">-30%</p>
            </div>

            <div className="relative w-full max-w-3xl mx-auto overflow-hidden group">
              <IoIosArrowBack
                onClick={handlePrev}
                className=" group-hover:hidden text-2xl absolute rotate-90 md:rotate-0 -translate-x-1/2 md:translate-x-0 left-1/2 -top-2   md:left-0 md:top-1/2 md:-translate-y-1/2 "
              />
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 py-5">
                {getVisibleImages().map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`img-${idx}`}
                    className="w-[22.5%] object-cover transition-all  duration-500 "
                    onClick={() => setCurrentPic(idx)}
                  />
                ))}
              </div>

              <IoIosArrowForward
                onClick={handleNext}
                className="text-2xl absolute right-1/2 bottom-0 rotate-90 translate-x-1/2 md:translate-x-0 md:rotate-0 md:right-0 md:top-1/2 md:-translate-y-1/2 "
              />
            </div>
          </div>
          <div className="flex flex-col w-11/12 pl-5">
            <div className="md:pr-15 flex flex-col md:gap-2 py-2">
              <h1 className="text-2xl md:text-3xl">Lorem Ispum Speaker</h1>
              <p className="text-2xl py-2">
                $20 <strike className="text-lg">$30</strike>
              </p>

              <p className="text-xl py-5 md:py-10">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
                expedita neque dignissimos itaque facilis tempore tenetur
                voluptatem, maiores laudantium distinctio voluptatum. Repellat
                iusto atque fuga enim optio mollitia libero eos.
              </p>
              <hr className="hidden md:block text-[#7d7d7dcb] pb-5  md:pb-10" />
              <BasicButton text="ADD TO CART" />
              <p className="leading-10">Catagories: electronics</p>
              <p>Tags: electronics</p>

              <div className="flex gap-10 mt-5">
                <TiSocialFacebook className="text-2xl"/>
                <TiSocialDribbble className="text-2xl"/>
                <TiSocialPinterest className="text-2xl"/>
                <TiSocialTwitter className="text-2xl"/>
                <TiSocialLinkedin className="text-2xl"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
