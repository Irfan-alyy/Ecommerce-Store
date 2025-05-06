
import { Outlet } from "react-router";

const AdminLayout = () => {
    return (<>
    <div>
      
      <h2 className="text-center text-2xl text-[rgb]">Admin Panel</h2>
      <Outlet />
    </div>
    </>  );
}
 
export default AdminLayout;