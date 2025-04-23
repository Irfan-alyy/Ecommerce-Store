
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store, persistor } from "./Feature/Redux/store";
import Layout from "./components/layout/Layout";
import Home from "./components/Home/Home";
import Category from "./pages/category/Category"
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Error404 from "./components/error/error404";
import Login from "./components/Login/Login";
import Dashboard from './components/Dashboard/Main'
import ResetPassword from "./components/resetPassword/resetPassword";
import { PersistGate } from "redux-persist/integration/react";
import './App.css'


import Main from './components/Dashboard/Main'
import Admin from './components/Admin/Admin'
import Profile from './components/Profile/Profile'


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
          element: <ResetPassword/>
        },
        {
          path:"/admin",
          element:<Main/>
        },
        {
          path: "*",
          element: <Error404 />,
        },
        {
          path:'/adminpanel',
          element:<Main/>
        },
        {
      path :'/Admin',
      element : <Admin/>
      
        },
        {
      path :'/profile',
      element:<Profile/>
          
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
