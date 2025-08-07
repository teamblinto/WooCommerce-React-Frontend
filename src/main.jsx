import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MainLayout from "./MainLayout/Mainlayout";
import Home from "./Pages/Home";
import Checkout from "./Pages/Checkout";
import "./Api.js";
import ProductsSection from "./Components/Products.jsx";
import ProductPage from "./Pages/ProductPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Import toastify CSS
import CartPage from "./Components/cart/CartPage.jsx";
import Auth from "./Pages/Auth.jsx";
import MyOrders from "./Components/MyOrders.jsx";
import OrderConfirmation from "./Pages/OrderConfirmation.jsx";
import { CartProvider } from "./context/CartContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-products", element: <ProductsSection /> },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      { path: "/checkout", element: <Checkout /> },
      {
        path: "/viewcart",
        element: <CartPage />,
      },
      { path: "/login", element: <Auth /> },
      { path: "/orders", element: <MyOrders /> },
      { path: "/order-confirmation", element: <OrderConfirmation /> },
    ],
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </CartProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
