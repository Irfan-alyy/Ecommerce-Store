import { useEffect, useRef, useState } from "react";
import image1 from "../../../assets/1.jpg";
import { IoCloseSharp } from "react-icons/io5";
import image2 from "../../../assets/7.jpg";
import image3 from "../../../assets/product1.jpg";
import image4 from "../../../assets/product2.jpg";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import BasicButton from "../../../ui/components/Button";

const QuickView = ({ product, visible, setVisible }) => {
  const [startIndex, setStartIndex] = useState(0);
  
  const [currentPic, setCurrentPic] = useState(image1);
  const modalRef = useRef();
  useEffect(() => {

  });
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setVisible(false); // close the modal
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

 

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


  if (visible === false) return;
  return (
    <div className="fixed  inset-0 z-50  bg-gradient-to-br from-black/30 via-black/35 to-black/50 backdrop-blur-sm flex items-center justify-center">
    <div  className="relative justify-center  w-11/12  md:w-7/11 h-auto bg-white rounded-xl py-10 lg:py-15  ">
        <IoCloseSharp
          className=" absolute right-5 top-2 lg:top-4 text-3xl text-black"
          onClick={() => setVisible(false)}
        />
        <hr className="text-[#959292d3] w-full" />
      <div ref={modalRef} className="flex flex-col md:flex-row  py-5 lg:py-10 px-5">
        
        <div className="px-3  md:w-100 flex md:flex-col ">
          <div className="flex w-full h-auto md:h-100 bg-[rgb(246,246,246)] items-center justify-center">
            <img src={currentPic} alt="" className="w-full " />
          </div>

          <div className="relative w-full max-w-3xl mx-auto overflow-hidden group">
            <IoIosArrowBack
              onClick={handlePrev}
              className=" group-hover:hidden text-2xl absolute rotate-90 md:rotate-0 -translate-x-1/2 md:translate-x-0 left-1/2 -top-2   md:left-0 md:top-1/2 md:-translate-y-1/2 "
            />
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-2 py-5">
              {getVisibleImages().map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`img-${idx}`}
                  className="w-[22.5%] object-cover transition-all  duration-500 "
                  onClick={() => setCurrentPic(src)}
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
          <p className="text-2xl py-2" >
            $20 <strike className="text-lg">$30</strike>
          </p>
      
          <p className="text-xl py-5 md:py-10">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
            expedita neque dignissimos itaque facilis tempore tenetur
            voluptatem, maiores laudantium distinctio voluptatum. Repellat iusto
            atque fuga enim optio mollitia libero eos.
          </p>
          <hr className="hidden md:block text-[#7d7d7dcb]pb-5  md:pb-10"/>
          <BasicButton text="ADD TO CART" />
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default QuickView;
