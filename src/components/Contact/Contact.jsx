import React from 'react'
import { MdPhone } from "react-icons/md";
import { FaEarthAfrica } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { CgTwitter } from "react-icons/cg";
import { FaTwitter } from "react-icons/fa";
import { NavLink } from 'react-router';

const Contact = () => {
  return (
    <div className='w-full h-[200vh] pb-10  overflow-x-auto' style={{backgroundColor:"rgb(255,255,255)"}}>
            <header className='w-full h-[80px] text-3xl sm:text-3xl md:justify-center flex justify-center items-center' style={{backgroundColor:"rgb(247,247,247)"}}>
            <NavLink to="/Ecommerce-Store">
        <h1 className='text-2xl  font-thin '>HOME <span className='font-semibold'>/ Contact</span></h1>
        </NavLink>
     
      </header>


<section className='mt-20 mb-80   w-[100%] h-[500px] flex justify-center items-center md:mb-20 lg:mb-20'>
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151
.83543450937!2d144.9559263155048!3d-37.8172097420141!2m3!1f0!2f0!3f0!3m2
!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0
!2sMelbourne%2C%20Australia!5e0!3m2!1sen!2sus!4v1615297715745!5m2!1sen!2sus"
  frameborder="0" className='h-[600px] w-[90%] '>
</iframe>
</section>

<div className=" flex h-[600px] mt-10 justify-center items-center flex-col gap-2 sm:flex sm:flex-col md:mt-5 md:px-6 md:flex md:flex-row  md:h-[600px]  ">
<div className='h-full w-[88%] pb-6 flex justify-center items-center flex-col md:w-[40%]  ' style={{backgroundColor:"rgb(243,243,243)"}} >

<div className='main flex justify-center cursor-pointer items-center flex-row mt-20 mr-10 group'>
<i className='border text-3xl h-[40px] w-[40px] flex justify-center items-center border-black   group-hover:bg-black group-hover:text-white ' style={{borderRadius: "50%"}}><MdPhone className='' style={{borderRadius:"50% ",  }}  /></i>
<p className='pare ml-10 '>+012 345 678 102 <br></br>+012 345 678 102</p>
</div>
<div className='main flex justify-center cursor-pointer  items-center flex-row mt-10 mr-10 group'>
<i className='border text-3xl h-[40px] w-[40px] ml-6 flex justify-center items-center border-black    group-hover:bg-black group-hover:text-white' style={{borderRadius: "50%"}}><FaEarthAfrica className='' style={{borderRadius:"50% ",  }}  /></i>
<p className='pare ml-8'>yourname@email.com <br></br>yourwebsitename.com</p>
</div>
<div className='main flex justify-center cursor-pointer  items-center flex-row mt-10 mr-10 group'>
<i className='border text-3xl ml-8  h-[40px] w-[40px] flex justify-center items-center border-black    group-hover:bg-black group-hover:text-white' style={{borderRadius: "50%"}}><IoLocationOutline className='' style={{borderRadius:"50% ",  }}  /></i>
<p className='pare ml-10 '>Address goes here,<br></br>street, Crossroad 123.</p>
</div>
<div className='flex justify-center items-center flex-col '>
<h1 className='text-3xl mt-10 font-semibold text-gray-700 text-center ' style={{}}>Follow Us</h1>

</div>

<div className='icons flex justify-center gap-5 mt-5 items-center flex-row text-2xl cursor-pointer'>
<i><FaFacebookF/></i>
<i><CgTwitter /></i>
<i><FaTwitter /></i>
</div>
</div>
{/* inputs */}


<div className='w-[88%] h-[600px]  flex justify-center items-center flex-col py-10 lg:w-[55%] lg:h-[600px]     ' style={{backgroundColor:"rgb(243,243,243)"}}>
<h1 className='text-3xl font-semibold text-gray-600 text-center'>Get In Touch</h1>

{/* <div> */}

<input type="text " placeholder='Name*' className='w-[88%] bg-transparent  border-gray-300 border mt-10 mr-10 ml-10 p-3  '/>
<input type="email"  placeholder='Email*'  className='w-[88%] bg-transparent  border-gray-300 border mt-10 mr-10 ml-10 p-3  '/>
{/* </div> */}
<input type="text" placeholder='Subject*' className='w-[88%] bg-transparent  border-gray-300 border mt-10 mr-10 ml-10 p-3  '  />

<textarea type="text" placeholder='Your Message*' className=' w-[88%] bg-transparent  border-gray-300 border mt-10 mr-10 ml-10 pb-20 pt-2 pl-3 ' />

<button className='bg-black text-white px-7 py-3 mt-10 text-2xl cursor-pointer '>Submit</button>
</div>
</div>



    </div>
  )
}

export default Contact
