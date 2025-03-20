import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/layout/Header'
import { createBrowserRouter, Router, RouterProvider } from 'react-router'
import Layout from './components/layout/Layout'
import Home from './components/Home/Home'
import Catagory from './components/catagory/Catogories'
import Cart from './components/Cart/CArt'
import Product from './components/Product/Product'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import Error404 from './components/error/error404'
import Login from './components/Login/Login'



function App() {
  const [count, setCount] = useState(0)
  const router= createBrowserRouter([
    {
      path: "",
      element: <Layout/>,
      children:[
        {
          path: "/",
          element:<Home/>
        },
        {
          path: "/login",
          element: <Login/>

        },
        {
          path: "/catagory",
          element: <Catagory/>
        },
        {
          path: "/product/:id",
          element:<Product/>
        },
        {
          path: "/cart",
          element: <Cart/>
        },
        {
          path: "/about",
          element: <About/>
        },
        {
          path: "/contact",
          element: <Contact/>
        },
        {
          path: "*",
          element: <Error404/>
        }
      ]
    }
  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
