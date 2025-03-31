import { color } from "framer-motion";
import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch , useSelector} from "react-redux";
import { clearCart, decrement, handleDecrement, handleIncrement } from "../../Feature/Redux/cartSlice";
import { NavLink } from "react-router";

function Cart(props) {
    const dispatch=useDispatch()
  const items = [
    {
        image: "https://vgl.ucdavis.edu/sites/g/files/dgvnsk15116/files/styles/sf_landscape_4x3/public/images/marketing_highlight/Sample-Collection-Box-Cat-640px.jpg?h=52d3fcb6&itok=4r75E_w2",
        title:"lorem lipsum jacket",
        color: " white",
        size: "x",
        price: 12.5,
        offPrice: 11.5,
        quantity:1

    },
    {
        image: "https://vgl.ucdavis.edu/sites/g/files/dgvnsk15116/files/styles/sf_landscape_4x3/public/images/marketing_highlight/Sample-Collection-Box-Cat-640px.jpg?h=52d3fcb6&itok=4r75E_w2",
        title:"lorem lipsum jacket",
        color: " white",
        size: "x",
        price: 12.5,
        offPrice: 11.5,
        quantity:1

    },
    {
        image: "https://vgl.ucdavis.edu/sites/g/files/dgvnsk15116/files/styles/sf_landscape_4x3/public/images/marketing_highlight/Sample-Collection-Box-Cat-640px.jpg?h=52d3fcb6&itok=4r75E_w2",
        title:"lorem lipsum jacket",
        color: " white",
        size: "x",
        price: 12.5,
        offPrice: 11.5,
        quantity:1

    }
];
const handleRemove = (item) => {
    dispatch(decrement(item));
  };
  const handlePlus = (index) => {
    dispatch(handleIncrement(index));
  };
  const handleMinus = (index) => {
    dispatch(handleDecrement(index));
  };
  const handleClearCart=()=>{
    if(window.confirm("Are you sure to Clear Your Cart")) dispatch(clearCart())
    return

  }
  return (
    <div className=" w-12/12 px-4 sm:px-10 py-10 sm:py:20 md:py:30 md:px-30 lg:px-25 xl:px-40">
      <h3 className="text-[20px] font-medium">Your Cart Items</h3>

      {items.map((elem, ind) => (
        <div className="Wrapper w-full grid grid-cols-2 sm:flex sm:flex-wrap justify-between border-collapse border mb-1 border-[#8E8E8E]  p-4">
          <div className="image w-auto h-auto flex flex-col">
            <div className="data w-24 h-32 flex justify-center items-center">
              <img
                src={elem.image}
                alt={elem.title}
              />
            </div>
          </div>
          <div className="pName w-auto h-auto flex flex-col">
            <div className="data w-full h-32 p-1 flex flex-col justify-center items-center">
              <span className="font-bold my-2.5 hover:text-[#A749FF] transition duration-300">
                <a href="#">{elem.title}</a>
              </span>
              <span>Color: {elem.color}</span>
              <span>Size: {elem.size}</span>
            </div>
          </div>
          <div className="pName w-auto h-auto flex flex-col">
            <div className="data w-full h-32 p-1 flex flex-col justify-center items-center">
              <span>
                <span className="text-[#8E8E8E] font-medium line-through">
                  $ {elem.price}
                </span>
                <span className="pl-3 font-medium">$ {elem.offPrice}</span>
              </span>
            </div>
          </div>
          <div className="pName w-auto h-auto flex flex-col">
            <div className="data w-full h-32 p-1 flex flex-col justify-center items-center">
              <span>
                <span className="border border-[#8E8E8E] px-1 py-2 border-collapse cursor-pointer" onClick={()=>handleMinus(ind)}>
                  -
                </span>
                <span className="border-y border-[#8E8E8E] px-7 py-2 border-collapse">
                  {elem.quantity}
                </span>
                <span className="border border-[#8E8E8E] px-1 py-2 border-collapse cursor-pointer" onClick={()=>handlePlus(ind)}>
                  +
                </span>
              </span>
            </div>
          </div>
          <div className="pName lg:w-36 h-auto flex flex-col">
            <div className="data w-full h-32 p-1 flex flex-col justify-center items-center">
              <span className="font-medium">$ {elem.offPrice}</span>
            </div>
          </div>
          <div className="pName w-36 h-auto flex flex-col">
            <div className="data w-full h-32 p-1 flex flex-col justify-center items-center">
              <span className="" onClick={()=>handleRemove(elem[ind])}>
                <ImCross className="hover:text-[#A749FF] transition duration-300 cursor-pointer" />
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center flex-col-reverse sm:flex-row gap-2 my-10 font-medium">
       <NavLink to="/">
       <button className='py-2 px-7 text-sm bg-gray-100 hover:bg-purple-800 hover:text-white cursor-pointer transition ease-linear duration-300" rounded-full leading-10 text-[#363f4d] w-64'>
          CONTINUE SHOPPING
        </button>
       </NavLink>
        <button 
        className='py-2 px-7 text-sm bg-gray-100 hover:bg-purple-800 hover:text-white transition cursor-pointer ease-linear duration-300" rounded-full leading-10 text-[#363f4d] w-64'
        onClick={handleClearCart}
        >
          CLEAR SHOPPING CART
        </button>
      </div>
    </div>
  );
}

export default Cart;
