import React from "react";
import { FaRegCopyright } from "react-icons/fa";
import logo from "../assets/logo.png"
import { NavLink,  } from "react-router";
import ScrollToTop from "../Feature/scrollToTop";

const Footer = () => {
  return (
    <div className="Footer bg-[rgb(246,246,248)]">
      <div className="px-5  sm:px-15 md:px-30 lg:px-40 py-30 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 sm:gap-5 md:gap-10 lg:gap-15">
        <div className=" flex flex-col my-auto gap-1 min-w-50">
          <NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior:"smooth"})} >
            <img src={logo} alt="Logo" className="w-10" />
          </NavLink>
          <NavLink to='/' onClick={() => window.scrollTo({ top: 0,  behavior:"smooth"})}>
           <img src={logo} alt="Logo" className="w-30 pb-3" />
           </NavLink>
          <p className="flex items-center gap-1"><FaRegCopyright/> 2025 Flone.</p>
          <p>All Rights Reserved</p>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">About Us</h2>
            <ul className="flex flex-col gap-2">
              <NavLink to='/About' onClick={() => window.scrollTo({ top: 0,  behavior:"smooth"})} className="hover:text-purple-700 cursor-pointer">
                <li>About us</li>
              </NavLink>
              <NavLink to='/About' onClick={() => window.scrollTo({ top: 0,  behavior:"smooth"})} className="hover:text-purple-700 cursor-pointer">
                <l>Store Location</l>
              </NavLink>
                <NavLink to='/Contact' onClick={() => window.scrollTo({ top: 0,  behavior:"smooth"})} className="hover:text-purple-700 cursor-pointer">
                <li>Contact</li>
                </NavLink>
                <li className="hover:text-purple-700 cursor-pointer">Order Tracking</li>

            </ul>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Useful Links</h2>
            <ul className="flex flex-col gap-2">
                <li className="hover:text-purple-700 cursor-pointer">Returns</li>
                <NavLink to='/About' className="hover:text-purple-700 cursor-pointer">
                <li>Support Policy</li>
              </NavLink>
                <NavLink to='/About' onClick={() => window.scrollTo({ top: 0,  behavior:"smooth"})} className="hover:text-purple-700 cursor-pointer">
                <li>Size Guidet</li>
              </NavLink>
                <NavLink to='/About' onClick={() => window.scrollTo({ top: 0,  behavior:"smooth"})} className="hover:text-purple-700 cursor-pointer">
                <li>FAQS</li>
              </NavLink>

            </ul>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">Follow Us</h2>
            <ul className="flex flex-col gap-2">
                <li className={"hover:text-purple-700 cursor-pointer"}>Facebook</li>
                <li className={"hover:text-purple-700 cursor-pointer"}>Twitter</li>
                <li className={"hover:text-purple-700 cursor-pointer"}>Instagram</li>
                <li className={"hover:text-purple-700 cursor-pointer"}>Youtube</li>

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
