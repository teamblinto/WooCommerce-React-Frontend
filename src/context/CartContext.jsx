import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingProduct = updatedCart.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        updatedCart.push(product);
      }

      toast.success(`${product.quantity} item(s) added to cart`, {
        position: "top-right",
        autoClose: 2000,
      });
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      toast.error("Item removed from cart", {
        position: "top-right",
        autoClose: 2000,
      });
      return updatedCart;
    });
  };

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
