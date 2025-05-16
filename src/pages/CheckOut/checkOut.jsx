import React from "react";

function CheckOut() {
  return (
    <>
      <h1 className="px-36 text-4xl font-bold my-10">CheckOut Page</h1>
      <div className="px-36 w-12/12 flex">
        <div className="builing-info-wrap w-7/12 pr-3">
          <h3 className="text-xl mb-5 font-semibold">Biling Details</h3>
          <form action="#">
            <div className="name mb-5 flex">
              <span className="px-1 inline-block w-1/2">
                <label for="name" className="text-sm font-medium block mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="leading-10 pl-3 pr-5 text-sm font-medium border border-[#bdbdbd] focus:outline-none"
                />
              </span>
              <span className="px-1 inline-block w-1/2">
                <label for="name" className="text-sm font-medium block mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full leading-10 pl-3 pr-5 text-sm font-medium border border-[#bdbdbd] focus:outline-none"
                />
              </span>
            </div>
            <div className="compName text-xl mb-5">
              <label for="#" className="text-sm font-medium block mb-2">
                Company Name
              </label>
              <input
                type="text"
                className="w-full leading-10 pl-3 pr-5 text-sm font-medium border border-[#bdbdbd] focus:outline-none"
              />
            </div>
            <div className="countName text-xl mb-5">
              <label for="#" className="text-sm font-medium block mb-2">
                Country
              </label>
              <select className="w-full h-10 bg-transparent pl-3 pr-5 text-sm font-medium border border-[#bdbdbd] focus:outline-none">
                <option value="#" className="border-purple-700">
                  Select a country
                </option>
                <option value="#">Azarbaijan</option>
                <option value="#">Bahamas</option>
                <option value="#">Bahrain</option>
                <option value="#">Bangladesh</option>
                <option value="#">Barbados</option>
              </select>
            </div>
            <div className="compName text-xl mb-5">
              <label for="#" className="text-sm font-medium block mb-2">
                Street Address
              </label>
              <input
                type="text" placeholder="House number and street name"
                className="w-full mb-2.5 leading-10 pl-3 pr-5 text-sm font-medium border border-[#bdbdbd] focus:outline-none"
              />
              <input
                type="text" placeholder="Apartment,suit,unit etc."
                className="w-full mb-2.5 leading-10 pl-3 pr-5 text-sm font-medium border border-[#bdbdbd] focus:outline-none"
              />
            </div>
            <div className="compName text-xl mb-5">
              <label for="#" className="text-sm font-medium block mb-2">
                Town / City
              </label>
              <input
                type="text"
                className="w-full leading-10 pl-3 pr-5 text-sm font-medium border border-[#bdbdbd] focus:outline-none"
              />
            </div>
            <div className="name mb-5 flex">
              <span className="px-1 inline-block w-1/2">
                <label for="name" className="text-sm font-medium block mb-2">
                  State / Country
                </label>
                <input
                  type="text"
                  className="leading-10 pl-3 pr-5 text-sm font-medium border border-[#bdbdbd] focus:outline-none"
                />
              </span>
              <span className="px-1 inline-block w-1/2">
                <label for="name" className="text-sm font-medium block mb-2">
                  Postcode / ZIP
                </label>
                <input
                  type="text"
                  className="w-full leading-10 pl-3 pr-5 text-sm font-medium border border-[#bdbdbd] focus:outline-none"
                />
              </span>
            </div>
            <div className="name mb-5 flex">
              <span className="px-1 inline-block w-1/2">
                <label for="name" className="text-sm font-medium block mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  className="leading-10 pl-3 pr-5 text-sm font-medium border border-[#bdbdbd] focus:outline-none"
                />
              </span>
              <span className="px-1 inline-block w-1/2">
                <label for="name" className="text-sm font-medium block mb-2">
                  Email Address
                </label>
                <input
                  type="text"
                  className="w-full leading-10 pl-3 pr-5 text-sm font-medium border border-[#bdbdbd] focus:outline-none"
                />
              </span>
            </div>
            <div className="compName text-xl mb-5">
                <h4 className="font-medium">Additional information</h4>
              <label for="#" className="text-[16px] font-medium block my-2 text-[#333]">
                Order notes
              </label>
              <textarea
                type="text" placeholder="Notes about your order, e.g. special notes for delivery. "
                className="w-full leading-20 pl-3 pr-5 text-sm font-medium border border-[#bdbdbd] focus:outline-none"
              />
            </div>
          </form>
        </div>
        <div className="your-order-area w-5/12 pl-3">
          <h3 className="text-xl mb-5 font-semibold">Your order</h3>
          <div className="det p-11 bg-gray-100">
            <ul className="flex justify-between">
              <li className="font-semibold">Product</li>
              <li className="font-semibold">Total</li>
            </ul>
            <ul className="flex justify-between my-5 py-5 border-t border-[#bdbdbd]">
              <li>lorem lipsom Jacket x 1</li>
              <li>€11.20</li>
            </ul>
            <ul className="flex justify-between">
              <li>Shipping</li>
              <li>Free shipping</li>
            </ul>
            <ul className="flex justify-between my-5 py-5 border-y border-[#bdbdbd] font-semibold">
              <li>Total</li>
              <li className="text-purple-600">€11.20</li>
            </ul>
          </div>
          <button className="bg-purple-600 font-medium text-white p-4 w-full rounded-full mt-8 hover:bg-gray-900 transition duration-300 ">
            place order
          </button>
        </div>
      </div>
    </>
  );
}
export default CheckOut;
