import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Pagination from "../../components/profile/pagination";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OrderDetails = () => {
    const [orderDet, setOrderDet] = useState([])
    const [orderData, setOrderData] = useState([])
    const params = useParams();
    const popupRef = useRef(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPage] = useState(3)

    useEffect(() => {
        axios.get(`${BASE_URL}/orders/${params.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then((res) => {
                console.log('orders by id: ', res.data);
                setOrderData(res.data)
                setOrderDet(res.data.order_items)
            })
            .catch(error => {
                console.log('Error occurred:', error);
            })
    }, [])

    console.log('orderData', orderData);

    const openPopup = () => {
        if (popupRef.current) {
            console.log('entered in openpopup');

            popupRef.current.classList.remove('hidden');
        }
    };

    const closePopup = () => {
        if (popupRef.current) {
            console.log('entered in closepopup');

            popupRef.current.classList.add('hidden');
        }
    };

    const handleClick = (id) => {
        console.log('The value of useRef is: ', popupRef.current)
    }

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = orderDet.slice(firstPostIndex, lastPostIndex);
    return (
        <div className="my-28 px-36">
            <h2 className="text-[#a749ff]">Your Ordered Products</h2>
            <ul>{
                currentPost.map((curEl, index) => (

                    <li key={index}>
                        <div className="relative flex flex-wrap w-full justify-evenly items-center bg-[#F9F9F9] border border-[#DEE2E6] my-6 p-3 shadow-md hover:shadow-xl hover:transition duration-200">
                            <span className=""><img src={`${BASE_URL}${curEl.variant_image}`} alt="" className="w-32 h-36 " /></span>
                            {/* <span className=""><img src={prod_default} alt="" className="w-32" /></span> */}

                            <span className="flex flex-col">
                                <span>Name: {curEl?.product_name ?? 'Product Name'} </span>
                                <span>Color: {curEl?.variant_attributes?.color ?? 'Product Color'} </span>
                                <span>size: {curEl?.variant_attributes?.size ?? 'Product size'} </span>
                                <span>Qty: {curEl?.quantity ?? 'Product Quantity'} </span>
                            </span>

                            <span className="flex flex-col">
                                <span className="">
                                    Adress: {curEl?.address?.address ?? 'no address'},
                                    {curEl?.address?.city ?? 'no address'},
                                    {curEl?.address?.postal_code ?? 'no address'},
                                    {curEl?.address?.country ?? 'no address'},
                                </span>
                            </span>

                            <span className="flex flex-col">
                                <span>
                                    <button onClick={() => {
                                        handleClick(curEl.id); openPopup();
                                    }} className="py-4 bg-gray-100 hover:bg-purple-800 hover:text-white cursor-pointer transition ease-linear duration-300 rounded-full leading-10 text-[#363f4d] w-52">
                                        Track your Order
                                    </button>
                                </span>
                                <span className="text-center py-4">price: {curEl?.total_price ?? 'Product Price'}</span>
                            </span>

                            <div ref={popupRef} className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" >

                                <div className="container max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl relative">
                                    <h2 className="text-xl font-semibold mb-4">Order Data</h2>
                                    <div className="flex justify-between my-4">
                                        <span>Username: </span>
                                        <span>{orderData.shipping_details.full_name}</span>
                                    </div>
                                    <div className="flex justify-between my-4">
                                        <span>Address: </span>
                                        <span>{orderData.shipping_details.address},{orderData.shipping_details.city},{orderData.shipping_details.country}</span>
                                    </div>
                                    <div className="flex justify-between my-4">
                                        <span>User ID: </span>
                                        <span>{orderData.user_id}</span>
                                    </div>
                                    <div className="flex justify-between my-4">
                                        <span>Status </span>
                                        <span>{orderData.order_status}</span>
                                    </div>
                                    <div className="flex justify-between my-4">
                                        <span>Order Date: </span>
                                        <span>{new Date(orderData.order_date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between my-4">
                                        <span>Shipping Date: </span>
                                        <span>{new Date(orderData.shipping_date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between my-4">
                                        <span>Order Items </span>
                                        <span>{orderData.order_items.length}</span>
                                    </div>
                                    
                                    <div className="flex justify-between my-4">
                                        <span>Amount </span>
                                        <span>{orderData.final_amount}</span>
                                    </div>
                                    <span className="flex justify-end ">
                                        <button onClick={closePopup} className="mt-4 px-4 py-2 bg-red-500 text-white rounded" >
                                            Close
                                        </button>
                                    </span>
                                </div>

                            </div>

                        </div>
                    </li>
                ))
            }</ul>

            <Pagination totalPost={orderDet.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
    );
}

export default OrderDetails;