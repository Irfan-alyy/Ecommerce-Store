import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const ProductReviews = ({ review }) => {
    const [reviewUser,setReviewUser]=useState()
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)


    useEffect(()=>{
        axios.get(`${BASE_URL}/user/profile/${review.user_id}`).then(res=>setReviewUser(res.data)).catch(err=>setError(err)).finally(res=>setLoading(false))
    },[])



    // if (loading) {
    //     return <p className="text-center text-2xl">Loading...</p>;
    //   }
    //   if (error || !reviewUser) {
    //     return (
    //       <p className="text-center text-2xl">Error Fetching Product reviews!</p>
    //     );
    //   }
  return (
    <>

      <div className="flex flex-col lg:flex-row gap-5 w-10/12 py-5 items-center">
      <div className="border rounded-full flex items-center overflow-hidden w-auto h-auto">
        {review?.profile_picture?
        <img src={`${BASE_URL+"/"+review.profile_picture}`} alt={review.name} className="w-20 h-20 m-auto" />:
        <div className="w-20 h-20 rounded-full flex items-center justify-center">
          <h1 className="text-4xl">{review?.full_name[0]}</h1>

        </div>
        
      }

      </div>
        <div className="flex flex-col gap-4 ">
          <div className=" w-full flex flex-wrap items-center gap-5 pt-8">
            <h3 className="flex-shrink-1">{review.name}</h3>
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
