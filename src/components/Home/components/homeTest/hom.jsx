import { useState } from "react";
import HeroSection from "./HeroSection";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import slideOne from "../../../assets/slide1.png";
import slideTwo from "../../../assets/slide2.png";
import FadeInFromBottom from "../../../../ui/animations/FadeInFromBottom";
const HomeCopy = () => {
  const [current, setCurrent] = useState(0);
  const hero = [
    {
      title: "New Arrival",
      description: "New Design Bluetooth Speaker",
      productId: "bs1",
      image: slideOne,
    },
    {
      title: "Smart Products",
      description: "Summer offer2024 Collection",
      productId: "bs2",
      image: slideTwo,
    },
    {
      title: "New Arrival",
      description: "New Design Bluetooth Speaker",
      productId: "bs3",
      image: slideOne,
    },
  ];

  const slideBack = () => {
    current === 0 ? setCurrent(2) : setCurrent(current - 1);
  };
  const slideForward = () => {
    current === 2 ? setCurrent(0) : setCurrent(current + 1);
  };

  return (
    <div className="relative">
      
      <div className="px-10  relative sm:px-18  md:px-25 lg:px-40 flex flex-col md:flex-row pt-10 pb-20 md:py-20 lg:py-30 justify-between">
        
          <HeroSection item={{hero, current}} slideBack={slideBack} slideForward={slideForward} />
      
      </div>
      
    </div>
  );
};

export default HomeCopy;
