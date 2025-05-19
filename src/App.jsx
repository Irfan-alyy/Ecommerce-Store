import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store, persistor } from "./store/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
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
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<p>Loading..</p>} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
      {/* {window.location.pathname !== '/adminpanel' && <Header />} */}
    </>
  );
}

export default App;
