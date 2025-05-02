import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { LuUsersRound } from "react-icons/lu";
import { RiBillLine } from "react-icons/ri";
import { CiMedicalClipboard } from "react-icons/ci";
import { MdOutlineAnalytics } from "react-icons/md";
import { HiOutlineBars3 } from "react-icons/hi2";
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { path } from 'framer-motion/client';



const Data = [
  { icon: <IoHomeOutline />, heading: "D.board" ,  },
  { icon: <RiBillLine />, heading: "Order", path : "/order" },
  { icon: <CiMedicalClipboard />, heading: "Products",path : "/product" },
  { icon: <LuUsersRound />, heading: "Reviews", path : "/customer" },
  { icon: <MdOutlineAnalytics />, heading: "AddFiles", path:"/analyse" },
  { icon: <MdOutlineAnalytics />, heading: "Revenue", path:"/revenue" },
  
  
];
const sidebarVarients={
true: {
  left : '0'
},
false: {
  left : '-60%'
}
}

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
const[expanded , setExpanded] = useState(true);
  return (

<>
<div className='bars   block md:hidden '

 style={expanded ? {left: '54%'} : {left: '20%'}}
onClick={()=> setExpanded(!expanded)}

>
<HiOutlineBars3 className='menu block bg-white text-black text-2xl  p-4  rounded-md    md:block lg:hidden ' />
</div>
    <motion.div className='sidebar p-6 bg-white h-[64%] rounded-xl shadow-md'
    variants={sidebarVarients}
animate={window.innerWidth <= 768?`${expanded}` : '' }

    >


      {/* Logo Section */}  
      <div className='logo flex items-center mt-6 ml-2 cursor-pointer'>
      <NavLink to="/Adminprofile" className="flex items-center space-x-2">
  <i className="text-4xl text-red-500"><FaUserCircle /></i>
  <span className="font-bold text-3xl tracking-wide text-gray-800">
    Ad<span className="text-red-500">mi</span>n
  </span>
</NavLink>
      </div>
      <div className="menu mt-16 flex flex-col gap-4">
  {Data.map((item, index) => (
    <NavLink
      key={index}
      to={item.path} // Make sure your `Data` array includes the `path` key for each item
      className={`menuitem px-4 py-3 rounded-lg w-full flex items-center gap-4 text-lg font-medium cursor-pointer transition-all duration-300 hover:bg-red-100 
      ${selected === index ? 'active bg-red-200 text-red-600' : 'text-gray-700'}`}
      onClick={() => setSelected(index)}
    >
      <i className="text-2xl">{item.icon}</i>
      <span>{item.heading}</span>
    </NavLink>
  ))}
</div>

      {/* Menu */}
      
    </motion.div>
</>
  );
};

export default Sidebar;
