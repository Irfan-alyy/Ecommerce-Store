import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CiMenuBurger } from 'react-icons/ci';
import { MdOutlineHome, MdOutlineReport } from 'react-icons/md';
import { LuUsersRound } from 'react-icons/lu';
import { RiBillLine } from 'react-icons/ri';
import { FaFileCsv, FaInbox, FaRegUser } from 'react-icons/fa6';
import { MdPayments } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Admin from '../../assets/admin2.png';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logo, setLogo] = useState({
    logo_path: Admin,
    name: 'Flone',
  });
  const [pagesOpen, setPagesOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/admin/pages/website_logo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLogo(response.data);
    } catch (error) {
      console.error("Error while fetching the logo", error);
    }
  };

  return (
    <div className="h-auto w-full flex flex-col bg-gray-200 overflow-x-hidden px-[5%]">
      <header className="fixed h-[100px] left-0 w-full bg-white text-gray-600 shadow-md z-50">
        {/* Top Bar */}
        <div className="h-[50px] w-full bg-white border-b-2 border-b-gray-300 flex justify-between items-center px-4">
          <NavLink to="/admin/logo">
            <div className="flex flex-row items-center justify-center">
              <img
                src={
                  logo.logo_path?.includes('http')
                    ? logo.logo_path
                    : `${BASE_URL}/${logo.logo_path}`
                }
                alt="Logo"
                className="w-[50px] h-[50px] rounded-full"
                onError={(e) => {
                  e.target.src = Admin;
                }}
              />
              <h1 className="text-2xl md:text-3xl text-gray-500 ml-2">{logo.name}</h1>
            </div>
          </NavLink>

          <NavLink to="/admin/profile">
            <div className="flex justify-center items-center gap-2 mr-4">
              <img
                src="https://cdn.pixabay.com/photo/2013/07/13/11/34/owl-158414_640.png"
                className="h-[30px] w-[30px] rounded-full border-gray-50"
                alt="Admin"
              />
              <div className="flex mr-1 md:flex-col gap-0">
                <h1 className="font-bold">AyazKhan</h1>
                <p className="hidden md:block">Administrator</p>
              </div>
            </div>
          </NavLink>
        </div>

        {/* Desktop Nav */}
        <div className="flex justify-start ml-10 items-center px-4 py-3 md:px-10">
          <nav className="hidden md:flex md:flex-row md:gap-8 items-center relative lg:gap-12">
            <NavLink to="/admin" className="group">
              <div className="flex items-center gap-2 text-xl text-gray-500 group-hover:text-blue-300 border-b-2 border-transparent group-hover:border-blue-300 pb-1">
                <MdOutlineHome /> Home
              </div>
            </NavLink>

            <NavLink to="/admin/csv" className="group">
              <div className="flex items-center gap-2 text-xl text-gray-500 group-hover:text-blue-300 border-b-2 border-transparent group-hover:border-blue-300 pb-1">
                <FaFileCsv /> Add-Bulk
              </div>
            </NavLink>

            <NavLink to="/admin/payment" className="group">
              <div className="flex items-center gap-2 text-xl text-gray-500 group-hover:text-blue-300 border-b-2 border-transparent group-hover:border-blue-300 pb-1">
                <MdPayments /> Payment
              </div>
            </NavLink>

            {/* Page Dropdown Toggle */}
            <div className="relative">
              <div
                onClick={() => setPagesOpen(!pagesOpen)}
                className="cursor-pointer flex items-center gap-2 text-xl text-gray-500 hover:text-blue-300 border-b-2 border-transparent hover:border-blue-300 pb-1"
              >
                <MdPayments /> Pages
              </div>

              {pagesOpen && (
                <div className="absolute top-full left-20  mt-0 bg-white w-[200px] flex flex-col justify-center items-start shadow-lg border border-gray-200 rounded-md z-10">
                  
                  <NavLink to="/admin/order" className="w-full px-4 py-2 flex items-center gap-2 text-gray-500 hover:text-blue-300  ">
                    <RiBillLine /> Orders
                  </NavLink>
                  <NavLink to="/admin/product" className="w-full px-4 py-2 flex items-center gap-2 text-gray-500 hover:text-blue-300  ">
                    <FaInbox /> Products
                  </NavLink>
                  <NavLink to="/admin/review" className="w-full px-4 py-2 flex items-center gap-2 text-gray-500 hover:text-blue-300  ">
                    <LuUsersRound /> Reviews
                  </NavLink>
                  <NavLink to="/admin/user" className="w-full px-4 py-2 flex items-center gap-2 text-gray-500 hover:text-blue-300 ">
                    <FaRegUser /> Users
                  </NavLink>
                  <NavLink to="/admin/report" className="w-full px-4 py-2 flex items-center gap-2 text-gray-500 hover:text-blue-300  ">
                    <MdOutlineReport /> Reports
                  </NavLink>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Icon */}
          <button className="md:hidden text-black ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
            <CiMenuBurger size={24} />
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="flex flex-col justify-center items-center text-center border-t-2 border-t-gray-400 pt-4 gap-4 px-4 pb-4 md:hidden bg-white shadow-2xl">
            <NavLink to="/admin" className="group">
              <div className="flex items-center gap-2 text-[20px] text-gray-600 group-hover:text-blue-300 border-b-2 border-transparent group-hover:border-blue-300 pb-1">
                <MdOutlineHome /> Home
              </div>
            </NavLink>
            <NavLink to="/admin/order" className="group">
              <div className="flex items-center gap-2 text-[20px] text-gray-600 group-hover:text-blue-300 border-b-2 border-transparent group-hover:border-blue-300 pb-1">
                <RiBillLine /> Orders
              </div>
            </NavLink>
            <NavLink to="/admin/product" className="group">
              <div className="flex items-center gap-2 text-[20px] text-gray-600 group-hover:text-blue-300 border-b-2 border-transparent group-hover:border-blue-300 pb-1">
                <FaInbox /> Products
              </div>
            </NavLink>
            <NavLink to="/admin/review" className="group">
              <div className="flex items-center gap-2 text-[20px] text-gray-600 group-hover:text-blue-300 border-b-2 border-transparent group-hover:border-blue-300 pb-1">
                <LuUsersRound /> Reviews
              </div>
            </NavLink>
            <NavLink to="/admin/csv" className="group">
              <div className="flex items-center gap-2 text-[20px] text-gray-600 group-hover:text-blue-300 border-b-2 border-transparent group-hover:border-blue-300 pb-1">
                <FaFileCsv /> Add-Bulk
              </div>
            </NavLink>
            <NavLink to="/admin/user" className="group">
              <div className="flex items-center gap-2 text-[20px] text-gray-600 group-hover:text-blue-300 border-b-2 border-transparent group-hover:border-blue-300 pb-1">
                <FaRegUser /> Users
              </div>
            </NavLink>
            <NavLink to="/admin/report" className="group">
              <div className="flex items-center gap-2 text-[20px] text-gray-600 group-hover:text-blue-300 border-b-2 border-transparent group-hover:border-blue-300 pb-1">
                <MdOutlineReport /> Reports
              </div>
            </NavLink>
            <NavLink to="/admin/payment" className="group">
              <div className="flex items-center gap-2 text-xl text-gray-500 group-hover:text-blue-300 border-b-2 border-transparent group-hover:border-blue-300 pb-1">
                <MdPayments /> Payment
              </div>
            </NavLink>
          </nav>
        )}
      </header>

      <ToastContainer />
    </div>
  );
};

export default Header;
