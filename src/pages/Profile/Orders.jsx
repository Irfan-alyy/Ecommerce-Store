import axios from "axios";
import { useEffect, useState } from 'react'
import { NavLink } from "react-router";
import Pagination from "../../components/profile/pagination";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [data, setData] = useState([])
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPage] = useState(5)

    useEffect(() => {
        axios.get(`${BASE_URL}/orders`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then((res) => {
                console.log("orders get successfully..");
                setOrders(res.data)
            })
            .catch(error => {
                console.log('Error occurred:', error);
            }
            );
    }, [])

    useEffect(() => {
        if (orders.length >= 0) {

            let filtered_data = orders.map((order) => {
                return {
                    date: order.order_date,
                    orders: order.order_items.length,
                    address: order.shipping_details,
                    final_amount: order.final_amount,
                    order_status: order.order_status,
                    id: order.id,
                }
            })
            setData(filtered_data)
        }
    }, [orders]);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = data.slice(firstPostIndex, lastPostIndex);

    return (
        <div className="my-15 w-full p-5">
            <h2 className="text-[#a749ff]">Your Orders</h2>
            {
                currentPost.map((curEl, i) => (
                    <NavLink to={`/orderdetails/${curEl.id}`} key={i}>
                        <div className="flex justify-between my-4 rounded-2xl shadow-md px-2 bg-gray-50 py-3 sm:flex-wrap text-left hover:shadow-xl hover:transition duration-100">
                            <div className="px-2 bg-gray-50 py-3 sm:w-[50%] lg:w-[25%]">
                                Order ID: {curEl.id}
                            </div>
                            <div className="px-2 bg-gray-50 py-3 sm:w-[50%] lg:w-[25%]">
                                Order Status: {curEl.order_status}
                            </div>
                            <div className="px-2 bg-gray-50 py-3 sm:w-[50%] lg:w-[25%]">
                                Order Date: {new Date(curEl.date).toLocaleDateString()}
                            </div>
                            <div className="px-2 bg-gray-50 py-3 sm:w-[50%] lg:w-[25%]">
                                Final Amount: {curEl.final_amount}
                            </div>
                        </div>
                    </NavLink>
                ))
            }
            <Pagination totalPost={data.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
    )
}