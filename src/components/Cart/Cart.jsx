import React from 'react';
import { ImCross } from "react-icons/im";

function Cart(props) {
    return (
        <div className=' w-12/12 px-4 sm:px-10 py-10 sm:py:20 md:py:30 md:px-30 lg:px-25 xl:px-40'>
            <h3 className='text-[20px] font-medium'>Your Cart Items</h3>

            <div className="Wrapper w-full flex flex-wrap justify-between border border-[#8E8E8E] p-4">
                <div className="image w-auto h-auto flex flex-col">
                    <div className="data w-24 h-32 flex justify-center items-center">
                        <img src="https://vgl.ucdavis.edu/sites/g/files/dgvnsk15116/files/styles/sf_landscape_4x3/public/images/marketing_highlight/Sample-Collection-Box-Cat-640px.jpg?h=52d3fcb6&itok=4r75E_w2" alt="image"/>
                    </div>
                </div>
                <div className="pName w-auto h-auto flex flex-col">
                    <div className="data w-full h-32 p-1 flex flex-col justify-center items-center">
                        <span className='font-bold my-2.5 hover:text-[#A749FF] transition duration-300'><a href="#">lorem lipsum jacket</a></span>
                        <span>Color: white</span>
                        <span>Size: x</span>
                    </div>
                </div>
                <div className="pName w-auto h-auto flex flex-col">
                    <div className="data w-full h-32 p-1 flex flex-col justify-center items-center">
                        <span>
                        <span className='text-[#8E8E8E] font-medium line-through'>€12.45</span>
                        <span className='pl-3 font-medium'>€11.20</span>
                        </span>
                    </div>
                </div>
                <div className="pName w-auto h-auto flex flex-col">
                    <div className="data w-full h-32 p-1 flex flex-col justify-center items-center">
                        <span>
                            <span className='border border-[#8E8E8E] px-1 py-2 border-collapse'>-</span>
                            <span className='border-y border-[#8E8E8E] px-7 py-2 border-collapse'>1</span>
                            <span className='border border-[#8E8E8E] px-1 py-2 border-collapse'>+</span>
                        </span>
                    </div>
                </div>
                <div className="pName lg:w-36 h-auto flex flex-col">
                    <div className="data w-full h-32 p-1 flex flex-col justify-center items-center">
                        <span className='font-medium'>€11.20</span>
                    </div>
                </div>
                <div className="pName w-36 h-auto flex flex-col">
                    <div className="data w-full h-32 p-1 flex flex-col justify-center items-center">
                        <span className=''><ImCross className='hover:text-[#A749FF] transition duration-300'/></span>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center my-10 font-medium'>
                <button className='py-2 px-7 text-sm bg-gray-100 hover:bg-purple-800 hover:text-white transition ease-linear duration-300" rounded-full leading-10 text-[#363f4d] w-64'>CONTINUE SHOPPING</button>
                <button className='py-2 px-7 text-sm bg-gray-100 hover:bg-purple-800 hover:text-white transition ease-linear duration-300" rounded-full leading-10 text-[#363f4d] w-64'>CLEAR SHOPPING CART</button>
            </div>
        </div>

    );
}

export default Cart;