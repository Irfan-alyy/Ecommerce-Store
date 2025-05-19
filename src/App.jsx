import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store, persistor } from "./store/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { AuthProvider } from "./Feature/Context/AuthContext";
//website pages and layout
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";
import Category from "./pages/category/Category";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Error404 from "./pages/Error/error404";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/resetPassword/resetPassword";
import Main from "./pages/Dashboard/Main";
import Profile from "./pages/Profile/Profile";
import HeroSection from "./components/Home/HeroProducts";
<<<<<<< HEAD
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

=======
import ProductForm from "./components/Admin/AddProduct/variantForm";
import UpdaetProductForm from "./components/Admin/UpdateProduct/UpdateProduct";
import UnAuthorize from "./pages/Unauthorized/UnAuthorize";
import AdminLayout from "./layout/AdminLayout";
import ProtectedRoute from "./Feature/ProtectedRoutes/ProtectedRoute";
>>>>>>> 728c0510b9138929ed0a5ab12f29beed6b1f126f

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
          path: "*",
          element: <Error404 />,
        },
<<<<<<< HEAD
=======
        {
          path: "/unauthorized",
          element: <UnAuthorize />,
        },
>>>>>>> 728c0510b9138929ed0a5ab12f29beed6b1f126f

        {
          path: "/profile",
          element: <Profile />,
        },
        {
path : '/adminlogin',
element : <Adminlogin/>
        }
      ],
    },
<<<<<<< HEAD
    
    // Admin Panel is here
    {
      path: "/admin",
      element: <Panel />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: "order",
          element: <Order />,
        },
        {
          path: "product",
          element: <ViewProducts />,
        },
        {
          path: "review",
          element: <Customer />,
        },
        {
path : 'csv',
element:<Csv/>
        },

        {
path : '/admin/profile',
element :<Adminprofile/>

        },
        {
path:'/admin/user',
element:<Users/>

        },
        {
          path:'/admin/report',
          element:<Reports/>
          
                  },
                 {
path : '/admin/logo',
element: <Logo/>
                 },
                 {
                  path:'/admin/payment',
                  element: <Paymnet/>
                 }



      ],
=======
    //No layout for these pages

    {
      path: "/adminpanel",
      element: <Admin />,
>>>>>>> 728c0510b9138929ed0a5ab12f29beed6b1f126f
    },
    {
      path: "/admin",
      element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>),
      children: [ 
        {
          index: true,
          element: <Main />,
        },
        {
          path: "addproduct",
          element: <ProductForm />,
        },
        {
          path: "updateproduct/:id",
          element: <UpdaetProductForm />,
        },
      ],
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<p>Loading..</p>} persistor={persistor}>
        <AuthProvider>
          <RouterProvider router={router} />
          </AuthProvider>
        </PersistGate>
      </Provider>
      {/* {window.location.pathname !== '/adminpanel' && <Header />} */}
    </>
  );
}

export default App;
