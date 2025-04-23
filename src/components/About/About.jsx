import React from "react";
import { RiProjectorLine } from "react-icons/ri";
import { TfiCup } from "react-icons/tfi";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { CiFaceSmile } from "react-icons/ci";

import { FaRegArrowAltCircleRight } from "react-icons/fa";


const About = () => {
  return (
    <div className="gap-8 mb-10 pb-10 flex items-center flex-col overflow-y-hidden">
      {/* <header
        className="w-[100%] h-[80px] flex justify-center items-center"
        style={{ backgroundColor: "rgb(247,247,247)" }}
      >
        <NavLink to="/Ecommerce-Store">
          <h1 className="text-2xl  text-gray-700 ">
            HOME <span className="font-semibold text-gray-700">/ ABOUT US</span>
          </h1>
        </NavLink>
      </header> */}

      <div className="w-full flex justify-center items-center flex-col pt-20 pb-10 ">
        <h4 className="font-semibold text-gray-700 mb-4">WHO ARE WE</h4>
        <h1 className="text-3xl font-semibold">WELCOME TO FLONE</h1>
        <hr
          className="text-black w-[100px] mt-4 "
          style={{ color: "black", width: "100px", fontSize: "30px" }}
        ></hr>

        <p className="text-center max-w-lg mx-auto leading-relaxed mt-4 px-8 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, sequi.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          quos inventore autem nesciunt deleniti iure aspernatur placeat velit
          natus esse?
        </p>
      </div>

      <section className="w-full h-auto p-8  flex justify-center items-center flex-col md:flex-row gap-8">
        <div className="w-full max-w-9/10  h-auto md:w-[30%] bg-center bg-cover object-cover bg-[url('https://flone.jamstacktemplates.dev/assets/img/banner/banner-1.jpg')] cursor-pointer flex flex-col justify-center p-6">
          <h1 className="text-3xl text-red-900">Watch</h1>
          <h3 className="mt-4 text-[20px]">
            Starting at <span className="text-red-900">$99</span>
          </h3>
          <button className="text-3xl mt-10 text-red-900">
            <FaRegArrowAltCircleRight />
          </button>
        </div>

        <div className=" w-full max-w-9/10  h-auto md:w-[30%] bg-center bg-cover object-cover bg-[url('https://flone.jamstacktemplates.dev/assets/img/banner/banner-2.jpg')] flex flex-col justify-center p-6">
          <h1 className="text-3xl text-red-900">Plo Bag</h1>
          <h3 className="mt-4 text-[20px]">
            Starting at <span className="text-red-900">$79.00</span>
          </h3>
          <button className="text-3xl mt-10 text-red-900">
            <FaRegArrowAltCircleRight />
          </button>
        </div>

        <div className=" w-full max-w-9/10  h-auto md:w-[30%] bg-center bg-cover object-cover bg-[url('https://flone.jamstacktemplates.dev/assets/img/banner/banner-3.jpg')] flex flex-col justify-center p-6">
          <h1 className="text-3xl text-red-900">Sunglass</h1>
          <h3 className="mt-4 text-[20px]">
            Starting at <span className="text-red-900">$99</span>
          </h3>
          <button className="text-3xl mt-10 text-red-900">
            <FaRegArrowAltCircleRight />
          </button>
        </div>
      </section>

      <div className="flex gap-8 flex-col justify-center items-center pl-5 pr-5 sm:flex-col md:flex-row lg:flex-row  ">
        <div>
          <h2 className="text-3xl font-semibold   ">Our Vision</h2>
          <p className="text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            obcaecati. Iste ab error, facilis ipsam omnis temporibus autem
            minus, beatae aut dignissimos dolore. Debitis necessitatibus vero
            excepturi doloremque. Repellat, nihil?
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold   ">Our Mission</h2>
          <p className="text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            obcaecati. Iste ab error, facilis ipsam omnis temporibus autem
            minus, beatae aut dignissimos dolore. Debitis necessitatibus vero
            excepturi doloremque. Repellat, nihil?
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-semibold   ">Our Goal</h2>
          <p className="text-start">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            obcaecati. Iste ab error, facilis ipsam omnis temporibus autem
            minus, beatae aut dignissimos dolore. Debitis necessitatibus vero
            excepturi doloremque. Repellat, nihil?
          </p>
        </div>
      </div>
      <section
        className="flex px-10  justify-between items-center flex-col w-full py-8 sm:grid sm:grid-cols-2  md:grid md:grid-cols-2 lg:flex lg:flex-row  lg:px-10      "
        style={{ backgroundColor: "rgb(247,247,247)" }}
      >
        <div className="flex justify-center items-center flex-col mb-4">
          <a href="" className="mb-4">
            <RiProjectorLine style={{ fontSize: "59px " }} />
          </a>
          <h3
            className="text-4xl text-bold font-bold mb-4 "
            style={{ color: "rgb(167,73,255)" }}
          >
            360
          </h3>
          <h4 className="text-2xl">Project Done</h4>
        </div>

        <div className="flex justify-center items-center flex-col mb-4">
          <a href="" className="mb-4">
            <TfiCup style={{ fontSize: "59px " }} />
          </a>
          <h3
            className="text-4xl text-bold font-bold mb-4 "
            style={{ color: "rgb(167,73,255)" }}
          >
            690
          </h3>
          <h4 className="text-2xl">Cup Of Coffe</h4>
        </div>

        <div className="flex justify-center items-center flex-col mb-4">
          <a href="" className="mb-4">
            <HiOutlineLightBulb style={{ fontSize: "59px " }} />
          </a>
          <h3
            className="text-4xl text-bold font-bold mb-4 "
            style={{ color: "rgb(167,73,255)" }}
          >
            100
          </h3>
          <h4 className="text-2xl">Branding</h4>
        </div>

        <div className="flex justify-center items-center flex-col mb-4">
          <a href="" className="mb-4">
            <CiFaceSmile style={{ fontSize: "59px " }} />
          </a>
          <h3
            className="text-4xl text-bold font-bold mb-4 "
            style={{ color: "rgb(167,73,255)" }}
          >
            420
          </h3>
          <h4 className="text-2xl">Happy Client</h4>
        </div>
      </section>

      <h1 className="text-4xl mb-0 font-bold">Team Members</h1>
      <hr className="w-[100px]"></hr>
      <p className="text-center text-xl">
        Lorem ipsum dolor sit amet consectetur.
      </p>

      <div className="w-full px-10 m-auto h-auto person gap-6 lg:ml-20 lg:gap-12    flex flex-col sm:px-20 md:px-10  sm:grid sm:grid-cols-2  md:grid md:grid-rows-1 lg:flex lg:flex-row  ">
        <div className="flex justify-center items-center flex-col bg-gray-100 pb-4">
          <img
            src="https://flone.jamstacktemplates.dev/assets/img/team/team-1.jpg"
            alt=""
            className="w-[80%] mb-5  "
          />
          <h3>Mr.Mike Banding</h3>
          <h4>Manager</h4>
        </div>

        <div className="flex justify-center items-center flex-col  bg-gray-100 pb-4">
          <img
            src="https://flone.jamstacktemplates.dev/assets/img/team/team-3.jpg"
            alt=""
            className="w-[80%] mb-5 "
          />
          <h3>Mr.Peter Pan</h3>
          <h4>developer</h4>
        </div>

        <div className="flex justify-center items-center flex-col  bg-gray-100 pb-4">
          <img
            src="https://flone.jamstacktemplates.dev/assets/img/team/team-4.jpg"
            alt=""
            className="w-[80%] mb-5 "
          />
          <h3>Mr.Mike Banding</h3>
          <h4>Develpoper</h4>
        </div>

        <div className="flex justify-center items-center flex-col  bg-gray-100 pb-4 ">
          <img
            src="https://flone.jamstacktemplates.dev/assets/img/team/team-1.jpg"
            alt=""
            className="w-[80%] mb-5 "
          />
          <h3>Mr.Faheed</h3>
          <h4>Developer</h4>
        </div>
      </div>

      <section className="flex justify-center items-center flex-row gap-10    ">
        <img
          src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-1.png"
          alt=""
          className=""
        />
        <img
          src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-3.png"
          alt=""
          className=""
        />
        <img
          src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-5.png"
          alt=""
          className="hidden md:block"
        />
        <img
          src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-3.png"
          alt=""
          className="hidden lg:block"
        />
        <img
          src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-3.png"
          alt=""
          className="hidden lg:block"
        />
      </section>
    </div>
  );
};

export default About;
