import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL=import.meta.env.VITE_API_BASE_URL
const useAllProducts = () => {
    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)
    const [categories,setCategories]=useState([])
    
    useEffect(()=>{

        const fetchProducts=()=>{
            axios.get(`${BASE_URL}/products/allproducts`)
            .then(res=>{
                setProducts(res.data)
                setLoading(false)
            })
            .catch(err=>{
                setError(err.message)
                setLoading(false)
            })
            .finally(()=>{
                setLoading(false)
            })
        }
        const fetchCategories=()=>{
            axios.get(`${BASE_URL}/category/categories`)
            .then(res=>{
                setCategories(res.data)
                setLoading(false)
                
            })
            .catch(err=>{
                setError(err.message)
                setLoading(false)
            })
            .finally(()=>{
                setLoading(false)
            })
        }
        fetchCategories()
        fetchProducts()

    },[])


    return {products,loading,error, categories};
}
 
export default useAllProducts;