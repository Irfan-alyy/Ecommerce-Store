import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const ProductReviews = ({ review }) => {
    const [user,setUser]=useState()
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)


    const token=localStorage.getItem("token")
    useEffect(()=>{
        axios.get(`${BASE_URL}/user/profile`,{headers:{Authorization: `Bearer ${token}`}}).then(res=>setUser(res.data)).catch(err=>setError(err)).finally(res=>setLoading(false))
    },[])



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

      <div className="flex flex-col lg:flex-row gap-5 w-10/12 py-5 items-center">
      <div className="border rounded-full flex items-center overflow-hidden w-auto h-auto">
        <img src={user.profile_picture} alt={user.first_name} className="w-20 h-20 m-auto" />

      </div>
        <div className="flex flex-col gap-4 ">
          <div className=" w-full flex flex-wrap items-center gap-5 pt-8">
            <h3 className="flex-shrink-1">{user.first_name} {user.last_name}</h3>
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
