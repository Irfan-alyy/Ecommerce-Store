import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL=import.meta.env.VITE_API_BASE_URL

const useProduct = ({id}) => {
    const [product,setProduct]=useState()
    const [category,setCategory]=useState()
    const [productReviews,setProductReviews]=useState()
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true)

    useEffect(()=>{

      //Fetch product by product id
        axios
        .get(`${BASE_URL}/products/${id}`)
        .then((res) => {setProduct(res.data)})
        .catch(err=>{setError(err.message);setLoading(false)})
        .finally(res=>setLoading(false));

        //Fetch product reviews based on product id
        axios
        .get(`${BASE_URL}/reviews/product_id/${id}`)
        .then((res) => {setProductReviews(res.data)})
        .catch(err=>console.error)
        .finally(res=>setLoading(false)); 
    },[])
    useEffect(()=>{
      if(product){
        //Fetch category details based on category id from product details
      axios
      .get(`${BASE_URL}/category/${product.category_id}`)
      .then((res) => {setCategory(res.data[0])})
      .catch(err=>{setError(err.message);setLoading(false)})
      .finally(res=>setLoading(false));
      }
    },[product])
  
    // const productcp = {
    //     product_name: "Women's Sweater",
    //     brand: "H&M",
    //     category_id: 7,
    //     description: "Cozy and warm sweater for women, available in various colors and sizes.",
    //     id: 17,
    //     sku: "2970be3b-38b0-47b9-85f1-c1de254c9b50",
    //     admin_id: 2,
    //     created_at: "2025-04-23T20:05:55.694508+05:00",
    //     updated_at: null,
    //     variants: [
    //       {
    //         price: "49.99",
    //         stock: 40,
    //         discount: 15,
    //         shipping_time: 4,
    //         attributes: {
    //           color: "white",
    //           size: "M",
    //           gender: "female"
    //         },
    //         id: 34,
    //         images: [
    //           "/media/uploads/903d0ee7-4f50-4ff3-999c-e298324ba523_women_sweaer__white1.jpeg",
    //           "/media/uploads/f5d38dfb-ba34-4373-b34d-3eb00354c46a_women_sweater_white_2.jpeg"
    //         ]
    //       },
    //       {
    //         price: "52.99",
    //         stock: 35,
    //         discount: 10,
    //         shipping_time: 3,
    //         attributes: {
    //           color: "gray",
    //           size: "L",
    //           gender: "female"
    //         },
    //         id: 35,
    //         images: [
    //           "/media/uploads/d5d2d925-a706-4837-a287-a326cc1e387d_women_sweater_gray.jpeg"
    //         ]
    //       }
    //     ]
    //   };
    //   useEffect(()=>{
    //     setProduct(productcp)
    //     setLoading(false)
    //   },[])
      
    return{product,category,error,loading, productReviews}
}
 
export default useProduct;