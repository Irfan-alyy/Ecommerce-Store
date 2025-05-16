import axios from 'axios';
import {createContext, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router';

import {jwtDecode} from "jwt-decode"

const AuthContext=createContext();

export const AuthProvider=({children})=>{

    const [userRole,setUserRole]=useState("");
    const [isExpired,setIsExpired]=useState(true)
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [loading,setLoading]=useState(true);
    // const [user,setUser]=useState(null);

    // loacalStorage.setItem('role', "admin");
    useEffect(()=>{ 
        const token=localStorage.getItem('token');
        const decoded= jwtDecode(token)
        const expired= Math.floor(Date.now()/1000)>decoded.exp;
        setIsExpired(expired);
        const role= decoded.role;
        setUserRole(role)
        

        if(token&& !expired){
            setIsAuthenticated(true);
            setUserRole(role);
            setLoading(false);

        }
        else{
            setIsAuthenticated(false);
            setLoading(false);
        }

    }
    ,[]);


    // const userRole=localStorage.getItem('role');
    // useEffect(()=>{
    //     axios.get(`${process.env.VITE_API_BASE_URL}/auth`,{
    //         headers:{
    //             "Authorization": `Bearer ${token}`
    //         }}).then(res=>{
    //             setUser(res.data);
    //             setLoading(false);
    //         }).catch(err=>{
    //             console.log(err);
    //             setLoading(false);
    //         }   )
    // },[]);

    const logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        setUserRole(null);
    }
    const login = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setIsAuthenticated(true);
        setUserRole(role);
      };

    return(
        <AuthContext.Provider value={{userRole, isAuthenticated, loading, logout}}>
            {loading ? <div className='text-center text-2xl '>Loading...</div> : children}
        </AuthContext.Provider>
    )


}

export const useAuth=()=>useContext(AuthContext);