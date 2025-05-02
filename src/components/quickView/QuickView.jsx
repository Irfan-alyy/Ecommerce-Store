import { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import BasicButton from "../../ui/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/Redux/cartSlice";
import FadeInFromBottom from "../../ui/animations/FadeInFromBottom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const QuickView = ({ product, visible, setVisible }) => {

  
  if(!product) return
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [currentPic, setCurrentPic] = useState(product?.variants[0]?.images[0]);
  const [addedToCart, setAddedToCart] = useState(false);
  const cartItems = useSelector((state) => state.reducer.items);

  const modalRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    const isInCart = cartItems.some(
      (elem) => elem.variant.id === selectedVariant.id
    );
    setAddedToCart(isInCart);
    // console.log(cartItems);
  }, [cartItems, selectedVariant.id]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setVisible(false); // close the modal
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const handleImageChange = (val) => {
    if (val === "prev") {
      if (currentPic === selectedVariant.images[0]) {
        setCurrentPic(
          selectedVariant.images[selectedVariant.images.length - 1]
        );
      } else
        setCurrentPic(
          selectedVariant.images[selectedVariant.images.indexOf(currentPic) - 1]
        );
    } else if (val === "next") {
      if (
        currentPic === selectedVariant.images[selectedVariant.images.length - 1]
      ) {
        setCurrentPic(selectedVariant.images[0]);
      } else
        setCurrentPic(
          selectedVariant.images[selectedVariant.images.indexOf(currentPic) + 1]
        );
    }
  };

  const handleVariantChange = (elem, idx) => {
    setSelectedVariant(elem);
    setCurrentPic(elem.images[0]);
  };
  const handleAddCart = () => {
    const item = {
      id: product.id,
      name: product.product_name,
      variant: selectedVariant,
      quantity: 1,
    };
    dispatch(addToCart(item));
    toast.success("Product Added to Cart", { position: "top-center" });
  };

  // const getVisibleImages = () => {
  //   const endIndex = startIndex + visibleCount;
  //   if (endIndex <= images.length) {
  //     return images.slice(startIndex, endIndex);
  //   } else {
  //     return [
  //       ...images.slice(startIndex),
  //       ...images.slice(0, endIndex - images.length),
  //     ];
  //   }
  // };

  if (visible === false) return;
  return (
    <div className="fixed  inset-0 z-50  bg-gradient-to-br from-black/30 via-black/35 to-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative justify-center  w-11/12  md:w-7/11 h-auto bg-white rounded-xl py-10 lg:py-15  ">
        <IoCloseSharp
          className=" absolute right-5 top-2 lg:top-4 text-3xl text-black"
          onClick={() => setVisible(false)}
        />
        <hr className="text-[#959292d3] w-full" />
        <div
          ref={modalRef}
          className="flex flex-col md:flex-row  py-5 lg:py-10 px-5"
        >
          {/* <div className="px-3  md:w-100 flex md:flex-col ">
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
          </div> */}
          <div className=" flex flex-col ">
            <div className="relative flex w-full h-auto bg-[rgb(246,246,246)] items-center justify-center">
              {/* Button for previous image */}

              <IoIosArrowBack
                onClick={() => handleImageChange("prev")}
                className=" group-hover:hidden text-2xl absolute    left-0 top-1/2 -translate-y-1/2 "
              />

              <img
                src={`${BASE_URL}${currentPic}`}
                alt={currentPic}
                className="w-full md:w-auto h-100 object-cover"
              />

              {/* Button for next image */}
              <IoIosArrowForward
                onClick={() => handleImageChange("next")}
                className="group-hover:hidden text-2xl absolute right-0 top-1/2 -translate-y-1/2 "
              />

              <p className="absolute top-5 left-5 bg-[rgb(250,107,255)] px-2 rounded text-sm">
                {selectedVariant?.id && "-" + selectedVariant.discount + "%"}
              </p>
            </div>

            <div className="relative w-full max-w-3xl mx-auto overflow-hidden group">
              <h1 className="text-2xl pb-3">Product Variants</h1>
              <div className="w-100 flex flex-row items-center gap-2 pb-5 flex-wrap justify-start">
                {product.variants.map((elem, idx) => (
                  <img
                    key={idx}
                    src={`${BASE_URL}${elem.images[0]}`}
                    alt={`img-${idx}`}
                    className={`w-[22.5%] max-h-22  object-cover transition-all  duration-500 ${selectedVariant.id===elem.id?"border":""} rounded-xl`}
                    onClick={() => handleVariantChange(elem, idx)}
                    // onMouseOver={() => setCurrentPic(elem.images[0])}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-11/12 pl-5">
            <div className="md:pr-15 flex flex-col md:gap-2 py-2">
              <h1 className="text-2xl md:text-3xl">{product.product_name}</h1>
              <p className="text-2xl py-2">
                $ {selectedVariant.price}{" "}
                <strike className="text-lg">
                  {selectedVariant.discount &&
                    (
                      selectedVariant.price /
                      (1 - selectedVariant.discount / 100)
                    ).toFixed(2)}
                </strike>
              </p>

              <p className="text-xl py-5 md:py-10">{product.description}</p>
              <hr className="hidden md:block text-[#7d7d7dcb]pb-5  md:pb-10" />

              <button
                className=" px-15 py-4 disabled:cursor-not-allowed  bg-black text-white text-lg font-semibold  cursor-pointer w-fit"
                disabled={addedToCart}
                onClick={handleAddCart}
              >
                {addedToCart ? "ADDED TO CART" : "ADD TO CART"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default QuickView;
