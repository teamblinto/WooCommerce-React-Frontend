import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MainLayout from "./MainLayout/Mainlayout";
import Home from "./Pages/Home";
import Checkout from "./Pages/Checkout";
import Cart from "./Pages/Cart";
import "./Api.js";
import ProductsSection from "./Components/Products.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";

// cosnt [cart, setCart] = useState([])

const addProductsToCart =(product)=>{
  product.quantity = 1
  console.log(product)

}



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-products",
        element: <ProductsSection/>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails  onAddToCart={addProductsToCart}  />,
      },
      {
        path: "/",
        element: <Checkout />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
