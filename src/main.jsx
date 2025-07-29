import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MainLayout from "./MainLayout/Mainlayout";
import Home from "./Pages/Home";
import Checkout from "./Pages/Checkout";
import "./Api.js";
import ProductsSection from "./Components/Products.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import toastify CSS
import CartPage from "./Components/cart/CartPage.jsx";
import Auth from "./Pages/Auth.jsx";
import MyOrders from "./Components/MyOrders.jsx";

function App() {
  const [cart, setCart] = React.useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const addProductsToCart = (product) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      updatedCart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

    toast.success(`${product.quantity} item(s) added to cart`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/all-products", element: <ProductsSection /> },
        {
          path: "/product/:id",
          element: <ProductDetails onAddToCart={addProductsToCart} />,
        },
        { path: "/checkout", element: <Checkout /> },
        { path: "/viewcart", element: <CartPage /> },
        { path: "/login", element: <Auth /> },
        { path: "/orders", element: <MyOrders /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
