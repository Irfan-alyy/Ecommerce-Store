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
import Admin from "./pages/Admin/Admin";
import Profile from "./pages/Profile/Profile";
// import ProductImageMagnifier from "./ui/components/magnifyImage";

function App() {
  const router = createBrowserRouter([
    // Layout pages
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/Ecommerce-Store", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/category", element: <Category /> },
        { path: "category/product/:id", element: <Product /> },
        { path: "/cart", element: <Cart /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "/profile", element: <Profile /> },
        { path: "/show", element: <Show /> },
        { path: "/update", element: <Update /> },
        { path: "*", element: <Error404 /> },
      ],
    },
  
    // Admin Pages (no Layout, no Header)
    { path: "/main", element: <Main /> },
    { path: "/admin", element: <Admin /> },
    { path: "/adminprofile", element: <AdminProfile /> },
    { path: "/update", element: <Update/> },

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
