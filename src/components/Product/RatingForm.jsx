import axios from "axios";
import { use, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { toast,ToastContainer } from "react-toastify";

const RatingForm = ({productId}) => {
  const [rating, setRating] = useState(5);
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const formRef = useRef();



  const token= localStorage.getItem("token")
  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      product_id:productId,
      email: emailRef.current.value,
      description: messageRef.current.value,
      rating: rating,
    };

    
    axios.post(`${BASE_URL}/reviews`, review,{headers:{Authorization:`Bearer ${token}`}})
    .then(res=>{toast.info(`Review submit: ${res?.statusText}`);
    formRef.current.reset()
  })
    .catch(err=>{
      toast.error(`${err.response?.data?.detail || err.message}`)
      // console.log(err.response?.data?.detail)
    }
  )
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Add a Review</h3>
          <div className="flex items-center gap-5">
            <h3>Your Rating:</h3>
            <span className="flex gap-1">
              {[...Array(5)].map((_, ind) => (
                <FaStar
                key={ind}
                  className={`${ind < rating ? "text-yellow-400" : ""}`}
                  onClick={() => setRating(ind + 1)}
                />
              ))}
            </span>
          </div>
          <span className="flex gap-3 flex-col md:flex-row">
            <input
              ref={nameRef}
              type="text"
              required
              name="name"
              id="name"
              placeholder="Name"
              className="px-5 py-2 border-2 rounded border-gray-300 max-w-70"
            />
            <input
              ref={emailRef}
              type="email"
              required
              name="email"
              id="emial"
              placeholder="Email"
              className="px-5 py-2 border-2 rounded border-gray-300 max-w-70"
            />
          </span>
          <textarea
            ref={messageRef}
            required
            name="message"
            id="msg"
            className="px-5 py-2 border-2 rounded border-gray-300 h-40 sm:h-20 md:h-30 w-70 md:w-125"
            placeholder="Message"
          />
          <button
            type="submit"
            className="shop-btn px-12 py-3 bg-[rgb(167,73,255)] text-white text-md  font-semibold  cursor-pointer w-fit my-3"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default RatingForm;
