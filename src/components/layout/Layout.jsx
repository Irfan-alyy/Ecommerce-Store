import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "../../Feature/scrollToTop";

const Layout = () => {
    return (<>
    <ScrollToTop/>
    <Header/>
    <div className="w-full h-25 md:h-40 bg-[rgb(218,237,255)]"></div>
    <Outlet/>
    <Footer/>
    </>  );
}
 
export default Layout;