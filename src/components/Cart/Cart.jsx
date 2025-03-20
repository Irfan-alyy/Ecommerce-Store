import React from 'react';
import { ImCross } from "react-icons/im";

function Cart(props) {
    return (
        <div className='px-36 w-12/12 scroll-auto'>
            <h3 className='text-[20px] font-medium'>Your Cart Items</h3>
            <table className='w-full border border-[#EBEBEB] flex flex-wrap'>
                <thead className=' bg-[#F9F9F9]'> 
                <tr className='flex flex-wrap'>
                    <th className='py-5 px-11'>IMAGE</th>
                    <th className='py-5 px-11'>PRODUCT NAME</th>
                    <th className='py-5 px-11'>UNIT PRICE</th>
                    <th className='py-5 px-11'>QTY</th>
                    <th className='py-5 px-11'>SUBTOTAL</th>
                    <th className='py-5 px-11'>ACTION</th>
                </tr>
                </thead>
                <tbody className='flex flex-wrap'>
                    <tr>
                        <td className=' flex justify-center items-center p-[30px]'>
                            <span className='bg-[#8E8E8E] w-[100px] h-[100px] flex justify-center items-center'>
                                <img src="#" alt="Image" />
                            </span>
                        </td>
                        <td className='p-10'>
                            <a href="#">Lorem ipsum jacket</a>
                            <span className='block'>Color:White</span>
                            <span>Size:x</span>
                        </td>
                        <td className="p-10 flex justify-center">
                            <span className='font-medium text-[#8E8E8E] mr-[10px]'>€12.45</span>
                            <span className='font-medium'>€11.20</span>
                        </td>
                        <td>
                            <span>
                                <button className='h-full border border-[#EBEBEB] px-1.5 py-2'>-</button>
                                <p className='h-full border border-[#EBEBEB] px-8 py-2 inline-block'>1</p>
                                <button className='h-full border border-[#EBEBEB] px-1.5 py-2'>+</button>
                            </span>
                        </td>
                        <td className='flex justify-center font-medium'>
                            <span>€11.20</span>
                        </td>
                        <td>
                            <span className='flex justify-end items-center pr-16'><ImCross className='text-xs text-gray-700 hover:text-[#A749FF] transition duration-300'/></span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='flex justify-between items-center my-10 font-medium'>
                <button className='py-2 px-7 text-sm bg-gray-100 hover:bg-purple-800 hover:text-white transition ease-linear duration-300" rounded-full leading-10 text-[#363f4d] w-64'>CONTINUE SHOPPING</button>
                <button className='py-2 px-7 text-sm bg-gray-100 hover:bg-purple-800 hover:text-white transition ease-linear duration-300" rounded-full leading-10 text-[#363f4d] w-64'>CLEAR SHOPPING CART</button>
            </div>
        </div>
    );
}

export default Cart;