import React, { useState } from 'react';
import { MdPhone } from "react-icons/md";
import { FaEarthAfrica } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { CgTwitter } from "react-icons/cg";
import { FaTwitter } from "react-icons/fa";
import { NavLink } from 'react-router';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Message submitted successfully!");
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});
    }
  };

  return (
    <div className='w-full h-[200vh] pb-10 overflow-x-auto' style={{ backgroundColor: "rgb(255,255,255)" }}>
      <header className='w-full h-[80px] text-3xl flex justify-center items-center' style={{ backgroundColor: "rgb(247,247,247)" }}>
        <NavLink to="/Ecommerce-Store">
          <h1 className='text-2xl font-thin'>HOME <span className='font-semibold'>/ Contact</span></h1>
        </NavLink>
      </header>

      <section className='mt-20 mb-80  md:mb-20   w-full h-[500px] flex justify-center items-center'>
        <iframe src="https://www.google.com/maps/embed?...your_src_here..."
          frameBorder="0" className='h-[600px] w-[90%] '></iframe>
      </section>

      <div className="flex h-[600px] mt-10 justify-center items-center flex-col md:flex-row md:h-[600px]">
        
        {/* Left Contact Info Box */}
        <div className='h-full w-[88%] pb-6 flex justify-center items-center flex-col md:w-[40%]' style={{ backgroundColor: "rgb(243,243,243)" }} >
          <div className='main flex justify-center cursor-pointer items-center flex-row mt-20 mr-10 group'>
            <i className='border text-3xl h-[40px] w-[40px] flex justify-center items-center border-black group-hover:bg-black group-hover:text-white' style={{ borderRadius: "50%" }}>
              <MdPhone />
            </i>
            <p className='pare ml-10'>+012 345 678 102 <br />+012 345 678 102</p>
          </div>
          <div className='main flex justify-center cursor-pointer items-center flex-row mt-10 mr-10 group'>
            <i className='border text-3xl h-[40px] w-[40px] ml-6 flex justify-center items-center border-black group-hover:bg-black group-hover:text-white' style={{ borderRadius: "50%" }}>
              <FaEarthAfrica />
            </i>
            <p className='pare ml-8'>yourname@email.com <br />yourwebsitename.com</p>
          </div>
          <div className='main flex justify-center cursor-pointer items-center flex-row mt-10 mr-10 group'>
            <i className='border text-3xl ml-8 h-[40px] w-[40px] flex justify-center items-center border-black group-hover:bg-black group-hover:text-white' style={{ borderRadius: "50%" }}>
              <IoLocationOutline />
            </i>
            <p className='pare ml-10'>Address goes here,<br />street, Crossroad 123.</p>
          </div>

          <div className='flex justify-center items-center flex-col'>
            <h1 className='text-3xl mt-10 font-semibold text-gray-700 text-center'>Follow Us</h1>
          </div>

          <div className='icons flex justify-center gap-5 mt-5 items-center flex-row text-2xl cursor-pointer'>
            <i><FaFacebookF /></i>
            <i><CgTwitter /></i>
            <i><FaTwitter /></i>
          </div>
        </div>

        {/* Right Contact Form */}
        <form onSubmit={handleSubmit} className='w-[88%] h-[600px] flex flex-col justify-center items-center py-10 lg:w-[55%] bg-[#f3f3f3]'>
          <h1 className='text-3xl font-semibold text-gray-600 text-center'>Get In Touch</h1>

          <input type="text" name="name" placeholder='Name*' value={formData.name}
            onChange={handleChange} className='w-[88%] bg-transparent border border-gray-300 mt-5 p-3' />
          {errors.name && <p className="text-red-500 text-sm w-[88%] mt-1">{errors.name}</p>}

          <input type="email" name="email" placeholder='Email*' value={formData.email}
            onChange={handleChange} className='w-[88%] bg-transparent border border-gray-300 mt-5 p-3' />
          {errors.email && <p className="text-red-500 text-sm w-[88%] mt-1">{errors.email}</p>}

          <input type="text" name="subject" placeholder='Subject*' value={formData.subject}
            onChange={handleChange} className='w-[88%] bg-transparent border border-gray-300 mt-5 p-3' />
          {errors.subject && <p className="text-red-500 text-sm w-[88%] mt-1">{errors.subject}</p>}

          <textarea name="message" placeholder='Your Message*' value={formData.message}
            onChange={handleChange} className='w-[88%] bg-transparent border border-gray-300 mt-5 pb-20 pt-2 pl-3' />
          {errors.message && <p className="text-red-500 text-sm w-[88%] mt-1">{errors.message}</p>}

          <button type="submit" className='bg-black text-white px-7 py-3 mt-10 text-2xl cursor-pointer'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
