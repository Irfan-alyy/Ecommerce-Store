import React, { useState, useEffect } from "react";
import { BsSignpost2Fill } from "react-icons/bs";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      image:
        "https://flone.jamstacktemplates.dev/assets/img/testimonial/testi-1.png",
      name: "JOHN DOE",
      role: "Customer",
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum voluptate, itaque aut aliquam similique numquam vitae dolore.",
    },
    {
      id: 2,
      image:
        "https://flone.jamstacktemplates.dev/assets/img/testimonial/testi-2.png",
      name: "JANE DOE",
      role: "Client",
      review:
        "Dolor sit amet consectetur adipisicing elit. Itaque aut aliquam similique numquam vitae dolore, beatae nulla ea sit quo.",
    },
    {
      id: 3,
      image:
        "https://flone.jamstacktemplates.dev/assets/img/testimonial/testi-1.png",
      name: "MARK SMITH",
      role: "User",
      review:
        "Suscipit, vitae. Consequuntur dolor et ducimus. Suscipit, vitae temporibus eaque a eius quis sequi maiores eum perspiciatis.",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex mt-10   justify-center items-center flex-col px-6 mb-10 pb-4 ">
      {/* Testimonial Section */}
      <div className="relative w-full max-w-[95%] mx-auto overflow-hidden  h-[400px]">
        {testimonials.map((item, i) => (
          <div
            key={item.id}
            className={`absolute inset-0 flex flex-col items-center justify-center text-center py-40  bg-gray-100 px-10 rounded-lg shadow-md transition-transform duration-700 
              ${i === index
                ? "translate-x-0 opacity-100"
                : i > index
                ? "translate-x-full opacity-0"
                : (i<index) ? "translate-x-full opacity-0": null
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[100px] h-[100px] rounded-full mb-4 z-0 hover:scale-110"
            />
            <p className="text-gray-700">{item.review}</p>
            <a href="#" className="text-2xl text-gray-600 mt-3">
              <BsSignpost2Fill />
            </a>
            <h3 className="text-2xl mt-4 text-gray-600">{item.name}</h3>
            <h4 className="text-gray-800">{item.role}</h4>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center flex-row mt-20 gap-10 ">
        <img
          src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-3.png"
          alt=""
        />
        <img
          src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-2.png"
          alt=""
        />
        <img
          src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-5.png"
          alt=""
          className="hidden sm:block"
        />
        <img
          src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-1.png"
          alt=""
          className="hidden   md:block"
        />
        <img
          src="https://flone.jamstacktemplates.dev/assets/img/brand-logo/brand-logo-3.png"
          alt=""
          className="hidden lg:block"
        />
      </div>

      {/* Blog Section */}
      <h1 className="text-4xl font-semibold mt-10">OUR BLOG</h1>
      <hr className="mt-6" />
      <p className="text-gray-900">Lorem ipsum dolor sit amet consectetur.</p>

      {/* Blog Grid */}
      <div className="h-[100%] w-full gap-6 sm:grid items-center m-auto  sm:grid-cols-2 md:grid md:grid-cols-2 lg:flex lg:flex-row">
        {[
          {
            img: "https://flone.jamstacktemplates.dev/assets/img/blog/blog-1.jpg",
            title: "A guide at latest trend",
          },
          {
            img: "https://flone.jamstacktemplates.dev/assets/img/blog/blog-2.jpg",
            title: "Five ways to lead a happy life",
          },
          {
            img: "https://flone.jamstacktemplates.dev/assets/img/blog/blog-3.jpg",
            title: "Tips on having a happy life",
          },
        ].map((blog, idx) => (
          <div
            key={idx}
            className="mt-20 px-10 pb-20 mb-10 min-h-[100px]  flex justify-between items-center flex-col bg-cover bg-center transition-transform hover:scale-105 w-full h-[300px]"
            style={{ backgroundImage: `url(${blog.img})` }}
          >
            <span className="mt-4 px-2 mr-40 bg-purple-600 text-white">
              Lifestyle
            </span>
            <div className="flex justify-center items-center flex-col bg-white w-[100%]  mt-56  md:mt-70">
              <h2 className="text-2xl text-center">{blog.title}</h2>
              <h3 className="text-gray-700">By Admin</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
