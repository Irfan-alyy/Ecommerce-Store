import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const ProductReviews = ({ review }) => {
    const [user,setUser]=useState()
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState()


    // useEffect(()=>{
    //     axios.get(`${BASE_URL}/users/${review.user_id}`).then(res=>setUser(res.data)).catch(err=>setError(err)).finally(res=>setLoading(false))
    // })

    if (loading) {
        return <p className="text-center text-2xl">Loading...</p>;
      }
      if (error) {
        return (
          <p className="text-center text-2xl">Error Fetching Product reviews!</p>
        );
      }
  return (
    <>

      <div className="flex flex-col lg:flex-row gap-5 w-10/12 py-5">
        <img src={""} alt="user" className="w-20 h-20 border rounded-full" />
        <div className="flex flex-col gap-4 ">
          <div className=" w-full flex flex-wrap items-center gap-5 pt-8">
            <h3 className="flex-shrink-1">User Name</h3>
            <span className="flex gap-1">
              {[...Array(5)].map((_, ind) => (
                <FaStar
                  key={ind}
                  className={`${
                    ind < Math.ceil(review.rating) ? "text-yellow-400" : ""
                  }`}
                />
              ))}
            </span>
          </div>
          <p className="max-w-lg">
            {review.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
