import axios from "axios";
import { useEffect, useMemo, useState } from "react";
const BASE_URL=import.meta.env.VITE_API_BASE_URL


const useFeaturedProducts = () => {
    const [FeaturedProducts,setProduct]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)

    useEffect(()=>{
        axios.get(`${BASE_URL}/products/featuredproducts`)
        .then(res=>setProduct(res.data))
        .catch(err=>setError(err.message))
        .finally(res=>setLoading(false))
    },[])
    const memoizedProducts = useMemo(() => FeaturedProducts, [FeaturedProducts]);
    return{FeaturedProducts:memoizedProducts,loading,error};
}
 
export default useFeaturedProducts;