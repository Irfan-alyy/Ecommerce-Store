import axios from "axios";
import { useEffect, useState } from "react";
const BASE_URL=import.meta.env.VITE_API_BASE_URL


const useFeaturedProducts = () => {
    const [products,setProduct]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)

    useEffect(()=>{
        axios.get(`${BASE_URL}/products/featuredproducts`)
        .then(res=>setProduct(res.data))
        .catch(err=>setError(err))
        .finally(re=>setLoading(false))
    },[])

    return{products,loading,error};
}
 
export default useFeaturedProducts;