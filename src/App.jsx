import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/layout/Header";
import { createBrowserRouter, Router, RouterProvider } from "react-router";
import Layout from "./components/layout/Layout";
import Home from "./components/Home/Home";
import Catagory from "./components/catagory/Catogories";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Error404 from "./components/error/error404";
import Login from "./components/Login/Login";
import { Provider } from "react-redux";
import { store, persistor } from "./Feature/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Dashboard from './components/Dashboard/Dashbord'

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
          path: "/catagory",
          element: <Catagory />,
        },
        {
          path: "/product/:id",
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
          path:"/admin",
          element:<Dashboard/>
        },
        {
          path: "*",
          element: <Error404 />,
        },
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
    </>
  );
}

export default App;
