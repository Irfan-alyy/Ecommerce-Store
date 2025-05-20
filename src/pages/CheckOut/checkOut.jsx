import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/Redux/cartSlice";
import { FaCreditCard } from "react-icons/fa6";
import { FaCcPaypal } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { Navigate, useLocation } from "react-router";
import { FaSmileBeam } from "react-icons/fa";
import { ImSad2 } from "react-icons/im";
import gsap from "gsap";
import { useNavigate } from "react-router";
import LoadingOverlay from "react-loading";
// import { set } from "react-hook-form";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
function CheckOut() {
  const location = useLocation();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showFailureDialog, setShowFailureDialog] = useState(false);
  const [sessionUrl, setSessionUrl] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("token");
    const sessionId = queryParams.get("session_id");
    const id = orderId || sessionId;
    setSessionUrl(id);
    console.log(id);
  }, []);

  // const [searchParams] = useSearchParams();
  // const sessionId = searchParams.get("session_id")
  // const orderId = searchParams.get("order_id")

  const paymentName = {
    credit_card: "Credit Card",
    debit_card: "Debit Card",
    paypal: "Paypal",
    cash_on_delivery: "Cash on delivery",
  };
  const paymentIcon = {
    credit_card: <FaCreditCard className="inline-flex w-10 text-orange-400 " />,
    debit_card: <FaRegCreditCard className="inline-flex w-10 " />,
    paypal: <FaCcPaypal className="inline-flex w-10 text-blue-400 " />,
    cash_on_delivery: (
      <BsCashCoin className="inline-flex w-10 text-green-700  " />
    ),
  };

  const handlePayment = (e) => {
    const value = e.target.value;
 
    setSelectedPayment(value);
  };
  console.log("Selected Payment Method:", selectedPayment);

  const items = useSelector((state) => state.reducer.items);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.variant.price * item.quantity,
    0
  );

  const form = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData(form.current);

      const errors = {};
      if (
        !data.get("firstName") ||
        !/^[a-zA-Z]{1,32}$/.test(data.get("firstName")) ||
        data.get("firstName").length < 2
      ) {
        errors.firstName = "First name is required and Only Charcters Allowed";
        setLoading(false);
      }

      if (
        !data.get("lastName") ||
        !/^[a-zA-Z]+$/.test(data.get("lastName")) ||
        data.get("lastName").length < 2
      ) {
        errors.lastName =
          "Last name is required and Only Characters are Allowed";
        setLoading(false);
      }
      if (!data.get("streetAddress")) {
        errors.streetAddress = "Street address is required";
        setLoading(false);
      }
      if (!data.get("townCity")) {
        errors.townCity = "Town/City is required";
        setLoading(false);
      }
      if (
        !data.get("state") ||
        !/^[a-zA-Z]+$/.test(data.get("state")) ||
        data.get("state").length < 2
      ) {
        errors.state = "State is required";
        setLoading(false);
      }
      if (
        !data.get("stateCountry") ||
        !/^[a-zA-Z]+$/.test(data.get("stateCountry")) ||
        data.get("stateCountry").length < 2
      ) {
        errors.stateCountry = "Country is required";
        setLoading(false);
      }
      if (!data.get("postCode")) {
        errors.postCode = "Postcode/ZIP is required";
        setLoading(false);
      }
      if (!data.get("phone") || !/^\d+$/.test(data.get("phone"))) {
        errors.phone = "Phone number is required and Only Digits are Allowed";
        setLoading(false);
      }
      if (
        !data.get("emailAddress") ||
        !/\S+@\S+\.\S+/.test(data.get("emailAddress"))
      ) {
        errors.emailAddress = "Email address is required";
        setLoading(false);
      }

      if (Object.keys(errors).length > 0) {
        Object.entries(errors).forEach(([field, message]) => {
          toast.error(message);
        });
        return;
      }

      const shipping_details = {
        full_name: data.get("firstName") + data.get("lastName"),
        email: data.get("emailAddress"),
        contact_information: data.get("phone"),
        additional_note: data.get("orderNotes"),
        address: data.get("streetAddress") + data.get("townCity"),
        state: data.get("state"),
        city: data.get("townCity"),
        country: data.get("stateCountry"),
        postal_code: data.get("postCode"),
      };
      console.log("Shipping details:", shipping_details);

      const productDetailsPayload = items.map((item) => ({
        product_id: item.id,
        variant_id: item.variant.id,
        quantity: item.quantity,
      }));
      const order_items = {
        order_items: productDetailsPayload,
        shipping_details: shipping_details,
      };

      console.log("Product details payload:", order_items);

      const productResponse = await axios.post(
        `${BASE_URL}/orders`,
        JSON.stringify(order_items),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Product details submitted:", productResponse.data);
      const order_id = await productResponse.data.id;

      console.log("Order ID:", order_id);

      const paymentData = {
        payment_method: selectedPayment,
        currency: "usd",
        order_id: order_id,
      };

        
      if (!paymentData.payment_method) {
        toast.error("Please select your payment method");
      }
      console.log("Payment data:", paymentData);

      const paymentResponse = await axios.post(
        `${BASE_URL}/payments/create-checkout-session/`,
        JSON.stringify(paymentData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if(paymentResponse?.statusText== 'OK'){
      sessionStorage.setItem("payement", JSON.stringify(paymentResponse));
       if(selectedPayment === "cash_on_delivery" ){
          setLoading(false);
          setShowSuccessDialog(true);
          dispatch(clearCart());
          sessionStorage.removeItem("payement"); 
          return;
        }     
       }
      
      console.log("Payment initiated:", paymentResponse.data);

      window.location.href = paymentResponse.data.checkout_url;

      
      
      toast.success("Order placed successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error during full checkout process:", error);
      toast.error("Error during checkout process. Please try again.");
    }
  };

  const session = sessionStorage.getItem("payement");
  if (sessionUrl && session) {
    setLoading(false);
    setShowSuccessDialog(true);
    dispatch(clearCart());
    sessionStorage.removeItem("payement"); // Will remove everything, including payment
  }

  
   
  
  useEffect(() => {
    const payment = async () => {
      try {
        const paymentResponse = await axios.get(
          `${BASE_URL}/admin/payment-methods/enabled`
        );
        console.log("Payment methods response:", paymentResponse.data);
        setPaymentMethods(paymentResponse.data);

        console.log("Payment methods:", paymentMethods);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        toast.error("Error fetching payment methods. Please try again.");
      }
    };
    payment();
  }, []);

  const smile = useRef(null);
  const sad = useRef(null);

  useEffect(() => {
    if (showSuccessDialog) {
      gsap.to(".smile-rotate", {
        rotation: 360,
        repeat: -1,
        duration: 3,
        ease: "none",
      });
    }
  }, [showSuccessDialog]);

  useEffect(() => {
    if (showFailureDialog) {
      gsap.to(".sad-rotate", {
        rotation: 360,
        repeat: -1,
        duration: 3,
        ease: "none",
      });
    }
  }, [showFailureDialog]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-[rgba(0,0,0)]/[.7] flex items-center justify-center z-50">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
            <h1 className="text-2xl font-bold text-center mt-5 text-white">
              Loading...
            </h1>
          </div>
        </div>
      )}

      {showSuccessDialog && (
        <div className="fixed inset-0 bg-[rgba(0,0,0)]/[.7] flex items-center justify-center z-50">
          <div className="bg-white w-[30vw] h-[30vh] rounded-lg shadow-lg p-6 relative flex flex-col items-center justify-center">
            <button
              onClick={() => {
                setShowSuccessDialog(false);
                navigate("/");
              }}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Order Successful
            </h2>
            <p className="text-gray-700">
              Your order has been placed successfully!
            </p>
            <FaSmileBeam className="mt-5 text-4xl smile-rotate" ref={smile} />
          </div>
        </div>
      )}

      {showFailureDialog && (
        <div className="fixed inset-0 bg-[rgba(0,0,0)]/[.7] flex items-center justify-center z-50">
          <div className="bg-white w-[33vw] h-[33vh] rounded-lg shadow-lg p-6 relative flex flex-col items-center justify-center">
            <button
              onClick={() => setShowFailureDialog(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Transcation Failed
            </h2>
            <p className="text-gray-700">
              Sorry, Due to Transcation failure your order is not placed
            </p>
            <ImSad2 className="mt-5 text-4xl sad-rotate" ref={sad} />
          </div>
        </div>
      )}

      <h1 className="px-10 md:px-36 text-2xl sm:mt-24 md:text-4xl font-bold my-10 text-center ">
        CheckOut Page
      </h1>

      <div className="px-10  xl:px-36  w-12/12 flex  lg:flex-row flex-wrap-reverse ">
        {items.length > 0 && (
          <div className="builing-info-wrap w-7/12 pr-3 ali ">
            <h3 className="text-xl mb-5 font-semibold">Biling Details</h3>
            <form action="#" onSubmit={handleSubmit} ref={form}>
              <div className="name mb-5 flex flex-col lg:flex-row flex-wrap ">
                <span className="px-1 inline-block w-full  ">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium block mb-2"
                  >
                    First Name
                  </label>
                  <input
                    name="firstName"
                    required
                    maxLength={32}
                    placeholder="First name"
                    type="text"
                    className=" w-[225px] focus:border-purple-500 focus:shadow-[0px_0px_3px_0.2px_purple] sm:w-full md:m-auto lg:m-auto leading-10 pl-3 pr-5 text-md font-medium border border-[#bdbdbd] focus:outline-none mb-5"
                  />
                </span>
                <span className="px-1 inline-block w-full">
                  <label
                    htmlFor=""
                    className="text-sm font-medium block mb-2  mt-4"
                  >
                    Last Name
                  </label>
                  <input
                    required
                    name="lastName"
                    placeholder="Last name"
                    maxLength={32}
                    type="text"
                    className=" w-[225px] sm:w-full focus:border-purple-500 focus:shadow-[0px_0px_3px_0.2px_purple]  leading-10 pl-3 pr-5 text-md font-medium border border-[#bdbdbd] focus:outline-none"
                  />
                </span>
              </div>

              <div className="compName  mb-5">
                <label htmlFor="#" className="text-sm font-medium block mb-2">
                  Street Address
                </label>
                <input
                  required
                  type="text"
                    maxLength={35}
                  name="streetAddress"
                  placeholder="House number and street name"
                  className="w-[225px] sm:w-full focus:border-purple-500 focus:shadow-[0px_0px_3px_0.2px_purple] leading-10 pl-3 pr-5 text-md font-medium border border-[#bdbdbd] focus:outline-none"
                />
              </div>
              <div className="compName  mb-5">
                <label htmlFor="#" className="text-sm font-medium block mb-2">
                  Town / City
                </label>
                <input
                  required
                  placeholder="Town / City"
                  name="townCity"
                  type="text"
                    maxLength={22}
                  className="w-[225px] sm:w-full focus:border-purple-500 focus:shadow-[0px_0px_3px_0.2px_purple] leading-10 pl-3 pr-5 text-md font-medium border border-[#bdbdbd] focus:outline-none"
                />
              </div>
              <div className="compName  mb-5">
                <label htmlFor="#" className="text-sm font-medium block mb-2">
                  State
                </label>
                <input
                  required
                  name="state"
                  placeholder="State"
                    maxLength={18}
                  type="text"
                  className="w-[225px] sm:w-full focus:border-purple-500 focus:shadow-[0px_0px_3px_0.2px_purple] leading-10 pl-3 pr-5 text-md font-medium border border-[#bdbdbd] focus:outline-none"
                />
              </div>
              <div className="name mb-5 flex flex-col lg:flex-row">
                <span className="px-1 inline-block lg:w-1/2 xl:w-1/2">
                  <label htmlFor="#" className="text-sm font-medium block mb-2">
                    Country
                  </label>
                  <input
                    required
                    name="stateCountry"
                    maxLength={22}
                    type="text"
                    className="leading-10 focus:border-purple-500 focus:shadow-[0px_0px_3px_0.2px_purple] pl-3 pr-5 text-md font-medium flex shrink border border-[#bdbdbd] focus:outline-none mb-5 w-[225px] sm:w-full"
                  />
                </span>
                <span className="px-1 inline-block lg:w-1/2">
                  <label htmlFor="#" className="text-sm font-medium block mb-2">
                    Postcode / ZIP
                  </label>
                  <input
                    required
                    name="postCode"
                    maxLength={12}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{1,12}"
                   
                    className="leading-10 pl-3 focus:border-purple-500 focus:shadow-[0px_0px_3px_0.2px_purple]  pr-5 text-md font-medium flex shrink border border-[#bdbdbd] focus:outline-none w-[225px] sm:w-full"
                  />
                </span>
              </div>
              <div className="name mb-5 flex flex-col lg:flex-row">
                <span className="px-1 inline-block lg:w-1/2">
                  <label htmlFor="#" className="text-sm font-medium block mb-2">
                    Phone
                  </label>
                  <input
                    required
                    maxLength={11}
                    pattern="[0-9]{1,12}"
                    inputMode="numeric"
                    name="phone"
                     onChange={(e)=>{
                      e.target.value = e.target.value.replace(/[^0-9]/g,'')
                    }}
                    type="text"
                    placeholder="Phone number"
                    className="leading-10 pl-3 focus:border-purple-500 focus:shadow-[0px_0px_3px_0.2px_purple] pr-5 w-[225px] sm:w-full text-md font-medium border border-[#bdbdbd] focus:outline-none mb-5"
                  />
                </span>
                <span className="px-1 inline-block lg:w-1/2">
                  <label htmlFor="#" className="text-sm font-medium block mb-2">
                    Email Address
                  </label>
                  <input
                    required
                    placeholder="Email address"
                    maxLength={32}
                    name="emailAddress"
                    type="email"
                    className="leading-10 focus:border-purple-500 focus:shadow-[0px_0px_3px_0.2px_purple] pl-3 pr-5 text-md font-medium w-[225px] sm:w-full flex shrink border border-[#bdbdbd] focus:outline-none"
                  />
                </span>
              </div>
              <div className="compName  mb-5">
                <h4 className="font-medium w-[80vw]">Additional information</h4>
                <label
                  htmlFor="#"
                  className="text-[16px]  font-medium block my-2 text-[#333]"
                >
                  Order notes
                </label>
                <textarea
                  name="orderNotes"
                  type="text"
                  placeholder="Notes about your order, e.g. special notes for delivery. "
                  className="w-[250px] focus:border-purple-500 focus:shadow-[0px_0px_3px_0.2px_purple] sm:w-full leading-6 h-[150px] pl-3 mr-10 pr-5 text-mdx  font-medium border border-[#bdbdbd] focus:outline-none "
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-purple-600 mb-5 text-xl font-medium text-white p-4 w-full rounded-full mt-8 hover:bg-gray-900 transition duration-300 "
              >
                Place Order
              </button>
            </form>
          </div>
        )}

        <div className="your-order-area flex flex-col md:flex-row w-full pl-3 mb-5">
          <div className="det p-2  md:p-11 w-full h-fit bg-gray-100">
            <h3 className="text-xl mb-5 font-semibold">Your order</h3>
            <ul className="flex justify-between">
              <li className="font-semibold">Product</li>
              {/* <li className="font-semibold pr-10 ">Price</li> */}
            </ul>
            {items.length > 0 ? (
              <ul className="flex flex-wrap gap-2 justify-between my-5 py-5 border-t border-b border-[#bdbdbd]">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className=" flex flex-col md:flex  justify-between w-full"
                  >
                    <div className="flex gap-10">
                      <img
                        src={`${BASE_URL}${item.variant.images[0]}`}
                        alt=""
                        className="w-20 h-20 object-contain"
                      />
                      <div className="flex flex-col    justify-center">
                        <div className="flex flex-col w-full justify-between   md:flex-row  md:gap-10 ">
                          <h3 className="font-n font-semibold  ">
                            {item.name}
                          </h3>
                          <p className="text-sm font-normal   text-[black] mt-1 ">
                            {"$" + item.variant.price}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-[black]">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-[black]">
                          Color: {item.variant.attributes.color}
                        </p>
                        <p className="text-sm font-medium text-[black]">
                          Size: {item.variant.attributes.size}
                        </p>{" "}
                        &nbsp;
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <h3 className=" border-t border-b border-[#bdbdbd] text-center text-lg font-semibold my-10 text-red-600 py-3 ">
                No products in the cart
              </h3>
            )}

            <h3>Total Price: $ {totalPrice}</h3>
          </div>

          <div className="flex items-center flex-col w-full mt-5 mb-5">
            <div className="flex flex-col gap-2 mt-5 mb-5 bg-gray-100 p-5">
              <h3 className="text-xl  font-semibold">PAYMENTS</h3>

              {paymentMethods.map((method, index) => (
                <div className="payment-methods mb-5" key={index}>
                  <input
                    type="radio"
                    name="payment"
                    id={method.id}
                    className="mr-2"
                    value={method}
                    checked={selectedPayment === method}
                    onChange={handlePayment}
                  />
                  <label htmlFor={method.id} className="text-lg font-bold">
                    {paymentIcon[method]}
                    {paymentName[method]}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CheckOut;
