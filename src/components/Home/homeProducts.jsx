
import { FaEye } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import slideOne from "../../assets/slide1.png"

const FeaturedProducts = ({quickView}) => {
    return (<>
     <div className="flex items-center flex-wrap gap-10 justify-center">
  {
    [...Array(8)].map((elem,ind)=>(
      <div key={ind} className="poduct-card mb-[35px]  flex flex-col w-[-260px] relative cart-flex transform transition-all ease-in">
      <span className="z-10 text-pink-400 text-s font-semibold absolute top-5 right-5">
        -10%
      </span>
      <span className="z-10 absolute top-12 right-6 text-xs text-violet-500 font-semibold">
        New
      </span>

      <div
        className=" bg-[rgb(246,246,246)] relative flex flex-col items-center justify-center overflow-hidden group product-one w-[260px] h-[345px]"
        onClick={() => navigate(`category/product/${1}`)}
      >
        <img src={slideOne} alt="" className=" hover-image1 absolute inset-0 object-cover transition transform duration-500 ease-in-out m-auto  " />
        <img src={slideOne} alt="" className="hover-image2 absolute inset-0 object-cover transition transform duration-500 ease-in-out m-auto " />
        <CiShoppingCart
          title="Add Cart"
          className=" cart cursor-pointer icon  group-hover:brightness-100 group-hover:opacity-100 transition-opacity transition-brightness duration-300 z-10 absolute top-1/2 right-22 bg-[rgb(31,115,23)] text-white hover:text-black hover:bg-white rounded-4xl text-3xl "
          onClick={(e) => {
            e.stopPropagation();
            ("add to cart dispacther");
          }}
        />
        <FaEye
          title="Quick View"
          className="eye cursor-pointer icon  group-hover:brightness-100  group-hover:opacity-100 transition-opacity transition-brightness duration-500  absolute top-1/2 left-22  bg-[rgb(31,115,23)] text-white hover:text-black hover:bg-white rounded-4xl   text-3xl z-10 "
          onClick={(e) => {
            e.stopPropagation();
            quickView(elem);
          }}
        />
      </div>
      <div className="flex justify-between mt-[20px] gap-1">
        <div>
          <h1 className="hover:text-gray-600 cursor-pointer ">
            Lorem Ispum Speaker
          </h1>
          <p>
            <span>$10</span> -
            <strike className="text-[rgb(127,127,127)]">$15</strike>
          </p>
        </div>
        <CiShoppingCart
          title="Add Cart"
          className="cursor-pointer brightness-100 hover:brightness-70  hover:opacity-100 transition-opacity transition-brightness duration-300 z-10  bg-amber-50 rounded-4xl text-3xl"
        />
      </div>
    </div>
    ))
  }
</div>
    </>  );
}
 
export default FeaturedProducts;