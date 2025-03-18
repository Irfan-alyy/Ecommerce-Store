import React from "react";
import { FaRegCopyright } from "react-icons/fa";
import logo from "../../assets/logo.png"
const Footer = () => {
  return (
    <div className="Footer bg-[rgb(246,246,248)]">
      <div className="px-10  sm:px-20 md:px-30 lg:px-40 py-30 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 sm:gap-5 md:gap-10 lg:gap-15">
        <div className=" flex flex-col my-auto gap-1 min-w-50">
           <img src={logo} alt="Logo" className="w-30 pb-3" />
          <p className="flex items-center gap-1"><FaRegCopyright/> 2025 Flone.</p>
          <p>All Rights Reserved</p>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">About Us</h2>
            <ul className="flex flex-col gap-2">
                <li>About Us</li>
                <li>Store Loaction</li>
                <li>Contact</li>
                <li>Order Tracking</li>

            </ul>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Useful Links</h2>
            <ul className="flex flex-col gap-2">
                <li>Returns</li>
                <li>Support Policy</li>
                <li>Size Guidet</li>
                <li>FAQS</li>

            </ul>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Follow Us</h2>
            <ul className="flex flex-col gap-2">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Youtube</li>

            </ul>
        </div>
        <div className="flex flex-col gap-2 flex-wrap">
            <h2 className="text-xl font-semibold">Subscribe</h2>
            <p className="text-sm">Get E-mail updates about our latest shop and special offers.</p>
            <br />
            <input className="border-b-2 border-b-gray-200 outline-0" type="email" name="email" id="email"  placeholder="Enter your email address.."/>
            
            <button className=" border-b-2 w-fit border-b-gray-400">SUBSCRIBE</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
