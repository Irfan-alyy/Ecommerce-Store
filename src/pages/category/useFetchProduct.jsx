import { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL=import.meta.env.VITE_API_BASE_URL
const useFetchProducts = () => {
    const [products,setProducts]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)
    const [categories,setCategories]=useState([])
    
    useEffect(()=>{

        const fetchProducts=()=>{
            axios.get('https://fakestoreapi.com/products')
            .then(res=>{
                setProducts(res.data)
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
            axios.get('https://fakestoreapi.com/products/categories')
            .then(res=>{
                setCategories(["all",...res.data])
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




    return {products,categories,loading, error};
}
 
export default useFetchProducts;