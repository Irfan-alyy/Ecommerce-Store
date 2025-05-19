import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL=import.meta.env.VITE_API_BASE_URL
const useWebsiteData = () => {
    const [websiteData,setWebsiteData]=useState()
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        //Fetch website data
        axios
        .get(`${BASE_URL}/admin/pages/website_logo`)
        .then((res) => {setWebsiteData({...res.data,logo_path: `${BASE_URL}/${res.data.logo_path}`})})
        .catch(err=>{setError(err.message);setLoading(false)})
        .finally(res=>setLoading(false));
    },[])

    return {logo:websiteData?.logo_path, name:websiteData?.name ,error,loading}
}

export default useWebsiteData