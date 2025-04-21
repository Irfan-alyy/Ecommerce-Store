import axios from "axios";
import { useEffect, useState } from "react";

const useProduct = ({id}) => {
    const [product,setProduct]=useState()
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {setProduct(res.data)})
        .catch(err=>{setError(err.message);setLoading(false)})
        .finally(res=>setLoading(false));
    },[])
    return{product,error,loading}
}
 
export default useProduct;