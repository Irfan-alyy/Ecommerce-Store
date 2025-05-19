import { Navigate } from "react-router";
import { useAuth } from "../Context/AuthContext";



const ProtectedRoute = ({children, requiredRole}) => {
    const {isAuthenticated, userRole , loading}=useAuth();

    // if(loading){
    //     return <p>Loading...</p>;
    // }
    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }
    if(requiredRole && userRole!== requiredRole){
        return <Navigate to="/unauthorized" replace />;
    }


    return children;
}
 
export default ProtectedRoute;
