import slideOne from "../../assets/slide1.png";
import slideTwo from "../../assets/slide2.png";
import product3 from "../../assets/slide3.jpg";
import product1 from "../../assets/product1.jpg"
import product2 from "../../assets/product2.jpg"



import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useRef } from "react";
import "./Home.css";
import { useState } from "react";
const Home = () => {
    const [visibleContainer,setVisibleContainer]=useState({
        one:true, two:false, three: false
    })

  const refContainer1 = useRef();
  const refContainer2 = useRef();
  const refContainer3 = useRef();

  const slideForward = (e) => {
    if (visibleContainer.one == true) {
      setVisibleContainer({
        one:false, two:true, three:false
      })
    } 
    if (visibleContainer.two == true) {
        setVisibleContainer({
          one:false, two:false, three:true
        })
      }
      if (visibleContainer.three == true) {
        setVisibleContainer({
          one:true, two:false, three:false
        })
      }
  };
  const slideBack = (e) => {
    if (visibleContainer.one == true) {
        setVisibleContainer({
          one:false, two:false, three:true
        })
      } 
      if (visibleContainer.two == true) {
          setVisibleContainer({
            one:true, two:false, three:false
          })
        }
        if (visibleContainer.three == true) {
          setVisibleContainer({
            one:false, two:true, three:false
          })
        }
    };

  return (
    <>
    <section>
      <div className="flex overflow-hidden items-center justify-center bg-[rgb(218,237,255)] pb-50">
        {visibleContainer.one && (
          <div
            ref={refContainer1}
            className="container-one grid grid-cols-2 px-40 py-30 w-full justify-between"
          >
            <IoIosArrowBack
              className="icon-left absolute  left-25 top-110 text-5xl text-violet-400  hover:text-violet-700  hidden cursor-pointer"
              onClick={slideBack}
            />
            <div className="flex flex-col justify-center  w-fit gap-3">
              <h5 className="text-lg font-semibold leading-4  ">New Arrival</h5>
              <h1 className="text-5xl font-semibold leading-15 tracking-wide">
                New Design <br />
                Bluetooth Speaker1
              </h1>
              <button className="shop-btn px-15 py-4 bg-transparent border-1  w-fit">
                SHOP NOW
              </button>
            </div>
            <div>
              <img src={slideOne} className="bg-transparent m-auto"  />
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
            className="container-one grid grid-cols-2 px-40 py-30 w-full justify-between"
          >
            <IoIosArrowBack
              className="icon-left absolute  left-25 top-110 text-5xl  hover:text-violet-700 text-violet-400 hidden cursor-pointer cursor-pointer"
              onClick={slideBack}
            />
            <div className="flex flex-col justify-center  w-fit gap-3">
              <h5 className="text-lg font-semibold leading-4  ">Smart Products</h5>
              <h1 className="text-5xl font-semibold leading-15 tracking-wide">
                Summer offer<br />
                2024 Collection
              </h1>
              <button className="shop-btn px-15 py-4 bg-transparent border-1  w-fit">
                SHOP NOW
              </button>
            </div>
            <div className="w-full ">
              <img src={slideTwo}  className="bg-transparent m-auto"/>
            </div>
        
            <IoIosArrowForward
              className="icon-right absolute right-30 top-110 text-5xl :text-violet-400  hover:text-violet-700  hidden cursor-pointer cursor-pointer"
              onClick={slideForward}
            />
          </div>
        )}

        {visibleContainer.three && (
          <div className="container-one grid grid-cols-2 px-40 py-30  w-full justify-between">
            <IoIosArrowBack
              className="icon-left absolute  left-25 top-110 text-5xl text-violet-400 hover:text-violet-700  hidden cursor-pointer"
              onClick={slideBack}
            />
            <div className="flex flex-col justify-center  w-fit gap-3">
              <h5 className="text-lg font-semibold leading-4  ">New Arrival</h5>
              <h1 className="text-5xl font-semibold leading-15 tracking-wide">
                New Design <br />
                Bluetooth Speaker3
              </h1>
              <button className="shop-btn px-15 py-4 bg-transparent border-1  w-fit">
                SHOP NOW
              </button>
            </div>
            <div>
              <img src={slideOne} className=" bg-transparent m-auto"/>
            </div>
            <IoIosArrowForward
              className="icon-right absolute right-30 top-110 text-5xl text-violet-400 hover:text-violet-700 hidden cursor-pointer"
              onClick={slideForward}
            />
          </div>
        )}
      </div>
      </section>
      <section className="px-40">
        <div className="flex  gap-8  mt-[-180px] pb-20">
        <div className="flex flex-col items-center justify-end pb-10 gap-2 w-[375px] h-[350px] relative overflow-hidden">
                <div className="absolute overflow-hidden">
                    <img src={product1} alt="product-three" className="z-0 hover:scale-110 transition-all ease-in"/>

                </div>
                <div className="z-10 flex flex-col items-center">
                <h5 className="text-lg">4 products</h5>
                <h2 className="text-xl font-semibold ">Bluetooth Speaker</h2>

                </div>
            </div>
            <div className="flex flex-col items-center justify-end pb-10 gap-2 w-[375px] h-[350px] relative overflow-hidden">
                <div className="absolute overflow-hidden">
                    <img src={product2} alt="product-three" className="z-0 hover:scale-110 transition-all ease-in"/>

                </div>
                <div className="z-10 flex flex-col items-center">
                <h5 className="text-lg">4 products</h5>
                <h2 className="text-xl font-semibold">Bluetooth Speaker</h2>

                </div>
            </div>
            <div className="flex flex-col items-center justify-end pb-10 gap-2 w-[375px] h-[350px] relative overflow-hidden">
                <div className="absolute overflow-hidden">
                    <img src={product3} alt="product-three" className="z-0 hover:scale-110 transition-all ease-in"/>

                </div>
                <div className="z-10 flex flex-col items-center">
                <h5 className="text-lg">4 products</h5>
                <h2 className="text-xl font-semibold">Bluetooth Speaker</h2>

                </div>
            </div>
        </div>
        <div className="flex flex-col items-center mx-[200px] pb-22.5 justify-center text-center leading-7">
            <h6 className="text-xl font-medium">Who we are</h6>
            <h1 className="text-3xl font-semibold tracking-wide pb-5">Welcome To Flone</h1>
            <div className="bg-black h-1 w-20 mb-7"></div>
            <p className="text-lg leading-7 font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam illum ullam quidem tempore alias, facilis libero 
                officiis excepturi vel optio praesentium recusandae accusamus autem quaerat itaque enim blanditiis nesciunt aut.</p>
        </div>

      </section>
    </>
  );
};

export default Home;
