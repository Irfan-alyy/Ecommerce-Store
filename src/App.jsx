import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store, persistor } from "./store/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer} from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./Feature/Context/AuthContext";

// website pages and layout
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import Category from "./pages/Category/Category";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Error404 from "./pages/Error/error404";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/resetPassword/resetPassword";
import Main from "./pages/Dashboard/Main";
import Profile from "./pages/Profile/Profile";
import HeroSection from "./components/Home/HeroProducts";

import Panel from "./layout/Adminlayout/Panel";
import Order from "./components/Dashboard/Sidebar/Order";
import ViewProducts from "./components/Dashboard/Sidebar/ViewProducts";
import Customer from "./components/Dashboard/Sidebar/Customer";
import Csv from './components/Dashboard/Sidebar/Csv';
import Adminprofile from './components/Dashboard/Admin/Adminprofile';
import Adminlogin from './components/Dashboard/Admin/Adminlogin';
import Users from "./components/Dashboard/Sidebar/Users";
import Reports from "./components/Dashboard/Sidebar/Reports";
import Logo from "./components/Dashboard/Sidebar/Logo";
import Paymnet from "./components/Dashboard/Sidebar/Paymnet";

import ProductForm from "./components/Admin/AddProduct/variantForm";
import UpdateProduct from "./components/Admin/UpdateProduct/UpdateProduct"; 
import UnAuthorize from "./pages/Unauthorized/UnAuthorize";
import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./Feature/ProtectedRoutes/ProtectedRoute";
import CheckOut from "./pages/CheckOut/checkOut";

//To be used in the future, for magnifying product images
// import ProductImageMagnifier from "./ui/components/magnifyImage";




function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/hero",
          element: <HeroSection />,
        },
        {
          path: "/Ecommerce-Store",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/category",
          element: <Category />,
        },
        {
          path: "category/product/:id",
          element: <Product />,
        },

        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
        },
        {
          path: "/checkout",
          element: <CheckOut />,
        },
      
        {
          path: "*",
          element: <Error404 />,
        },
        {
          path: "/unauthorized",
          element: <UnAuthorize />,
        },

        {
          path: "/profile",
          element: <Profile />,
        },
        // {
        //   path:"/magnify",
        //   element: <ProductImageMagnifier/>
        // }
      ],
    },

    {
      path: "/admin",
      element: (
        <ProtectedRoute requiredRole="admin">
       <Panel/>
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Main /> },
        { path: "order", element: <Order /> },
        { path: "product", element: <ViewProducts /> },
        { path: "review", element: <Customer /> },
        { path: "csv", element: <Csv /> },
        { path: "profile", element: <Adminprofile /> },
        { path: "user", element: <Users /> },
        { path: "report", element: <Reports /> },
        { path: "logo", element: <Logo /> },
        { path: "payment", element: <Paymnet /> },
        { path: "addproduct", element: <ProductForm /> },
        { path: "updateproduct/:id", element: <UpdateProduct /> },
      ],
    },
  ]);

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000}  />
      <Provider store={store}>
        <PersistGate loading={<p>Loading..</p>} persistor={persistor}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
 