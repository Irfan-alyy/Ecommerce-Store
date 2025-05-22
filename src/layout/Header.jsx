import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { CiMenuBurger } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { useRef } from "react";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import useWebsiteData from "../customHooks/useWebsiteData";
const Header = () => {
    const {logo, name,loading,error}=useWebsiteData();
  const [isSearchBoxVisible, setSearchBoxVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTop,setIsTop]=useState(true)

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
const handleSearch=(e) => {
  e.preventDefault();
  if (query.trim() !== "") {
    navigate(`/category?search=${encodeURIComponent(query)}`);
    setQuery("");
    setSearchBoxVisible(false);
  }
};

  const searchRef = useRef();
  const searchBtnRef = useRef();

  const searchInputRef=useRef();

  const menuBtn = useRef();
  const menuBurgerBtn = useRef();
  useEffect(() => {
    let prevScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - prevScrollY) < 10) return;
      if (currentScrollY  <= 0) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        setShowHeader(false);
        setIsTop(false)
      } else {
        setShowHeader(true);
        setIsTop(false)
      }
      if(currentScrollY<=10) setIsTop(true)
        if(menuVisible) setMenuVisible(false)
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isSearchBoxVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (!isSearchBoxVisible) return;
    const handleOutsideClick = (e) => {
      if (
        (searchRef.current && searchRef.current.contains(e.target)) ||
        (searchBtnRef.current && searchBtnRef.current.contains(e.target))
      ) {
        return;
      }

      setSearchBoxVisible(!isSearchBoxVisible);
    };
    if (isSearchBoxVisible) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isSearchBoxVisible]);

  const handleSearchClick = () => {
    setSearchBoxVisible(prev=>prev? false:true);
    setQuery("")
  };
  const handleMenuBtn = () => {
    setMenuVisible(!menuVisible);
    // menuVisible? null: menuBtn.current.classList.add("hidden");menuBtn.current.classList.add("flex")
  };

  const cartItemsLength=useSelector((state) => state.reducer.items.length);

  // if(loading) return <div className="w-full h-30 flex justify-center items-center">
  //   <h1>Loading...</h1>
  // </div>
  // if(error) return <div className="w-full h-screen flex justify-center items-center">
  // <h1 className="text-2xl text-red-500">Error: {error}</h1>
  // </div>

  return (
    
    <div className={`Header bg-[rgb(218,237,255)] fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showHeader?"translate-y-0": "-translate-y-full"}`}>
      <div className="px-5  sm:px-15  md:px-30 lg:px-40 flex justify-between  h-25 items-center">
        <div className="hidden items-center gap-5 md:gap-10 md:flex">
          <p className="text-lg">Call Us 3965410</p>
        </div>
        <NavLink to="/" onClick={() => setMenuVisible(false)} >
          <img src={logo} alt="Logo"  className="w-15 h-15 rounded"/>
        </NavLink>

        {/* This is humburger button visible only in small screenn */}
        {/* <div className="mobileIcons flex items-center gap-5">
          <CiSearch
            className="flex sm:hidden cursor-pointer w-7 h-7"
            ref={searchBtnRef}
            onClick={handleSearchClick}
          />
          <NavLink
            to="/cart"
            className="sm:hidden"
            onClick={() => setMenuVisible(false)}
          >
            <Badge badgeContent={2}>
              <CiShoppingCart className="w-7 h-7" />
            </Badge>
          </NavLink>

          <CiMenuBurger
            ref={menuBurgerBtn}
            className="sm:hidden"
            onClick={handleMenuBtn}
          />
        </div> */}

        <div className="navbarLeft flex gap-5 items-center">
          <CiSearch
            className="cursor-pointer w-7 h-7"
            ref={searchBtnRef}
            onClick={handleSearchClick}
          />
          <NavLink to="/login" className="hidden sm:flex py-1">
            <FaRegCircleUser className="w-5 h-5" />
          </NavLink>
          <NavLink to="/cart">
            <Badge badgeContent={cartItemsLength} color="primary">
              <CiShoppingCart className="w-7 h-7" />
            </Badge>
          </NavLink>
          <CiMenuBurger
            ref={menuBurgerBtn}
            className="sm:hidden"
            onClick={handleMenuBtn}
          />
        </div>
      </div>
      <hr className="hidden sm:block mx-40 text-[rgb(180,178,178)]" />
      {/* Navigation menu visible on large screens */}
      <nav>
      {isTop &&
      <ul className="hidden  sm:flex justify-center py-5 gap-10">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/category">Catagories</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          {/* <NavLink to="/admin">Admin</NavLink>  */}
        </li>

      </ul>
    }
    </nav>
      <div
        ref={searchRef}
        className={`flex items-center h-17 bg-[rgb(246,246,248)] p-4 absolute top-25 right-1   sm:right-35 md:right-50 z-50 transition-all duration-300 ease-in transform origin-top perspective-[1000px] ${
          isSearchBoxVisible
            ? "opacity-100 scale-100 translate-y-0 rotate-x-0"
            : "opacity-0 scale-90 -translate-y-2 rotate-x-90 pointer-events-none"
        }`}
      >
        <form className="border border-[rgba(188,189,189,0.72)] h-12 p-0 flex items-center border-collapse" onSubmit={handleSearch}>
          <input ref={searchInputRef} type="text" required value={query} placeholder="Search" className="pl-4 outline-0" onChange={(e)=>setQuery(e.target.value)} />
          <button type="submit" className="px-6 h-full bg-violet-500">
            <CiSearch className="text-white" />
          </button>
        </form>
      </div>
{/* this menu will only show on small screen after clicking menu button */}
      {menuVisible && (
        <div
          ref={menuBtn}
          className={`sm:hidden flex flex-col   bg-[rgb(218,237,255)] border-[rgba(188,189,189,0.72)] border-b-2 justify-end transition-transform transform duration-5000 ease-in`}
        >
          <ul
            className="flex flex-col gap-5 py-4 pl-10 w-5/6"
            onClick={(e) =>
              e.target.tagName === "LI" || e.target.tagName === "A"
                ? setMenuVisible(!menuVisible)
                : null
            }
          >
            <NavLink to="/"><li className=" py-3 active:bg-[rgb(139,157,174)] rounded">
              Home
            </li></NavLink>
            <NavLink to="/category"><li className=" py-3 active:bg-[rgb(139,157,174)] rounded">
              Catagories
            </li></NavLink>
            <NavLink to="/login"> <li className=" py-3 active:bg-[rgb(139,157,174)] rounded">
              Account
            </li></NavLink>
            <NavLink to="/about"><li className=" py-3 active:bg-[rgb(139,157,174)] rounded">
             About
            </li></NavLink>
            <NavLink to="/contact"><li className=" py-3 active:bg-[rgb(139,157,174)] rounded">
              Contact
            </li></NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
