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
        path: "/",
        element: <ProductsSection />,
      },
      {
        path: "/",
        element: <Checkout />,
      },
      {
        path: "/",
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
