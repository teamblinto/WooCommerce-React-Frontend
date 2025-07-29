import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Handle quantity changes for individual items
  const handleQuantityChange = (id, action) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id) {
          let newQty = item.quantity;
          if (action === "increment") newQty += 1;
          else if (action === "decrement" && newQty > 1) newQty -= 1;
          return { ...item, quantity: newQty };
        }
        return item;
      });
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // Remove item from cart
  function handleRemoveItem(itemId) {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);

      // Update localStorage with the updated cart
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }

  // Calculate total price of all cart items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  // const handleProceedCheckout = () => {
  //   navigate("/checkout");
  // };

  return (
    <div className="container mx-auto max-w-5xl pt-30 p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center mb-4 border-b pb-2 last:border-b-0"
          >
            <img
              src={item.images[0].src || "https://via.placeholder.com/50"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="ml-4 flex flex-col flex-grow">
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-gray-500">
                {item.price}৳  x  {item.quantity}
              </span>
            </div>
            <div className="flex items-center space-x-2 ml-auto">
              <button
                className="text-lg text-gray-600 hover:text-gray-800 px-2"
                onClick={() => handleQuantityChange(item.id, "decrement")}
              >
                -
              </button>
              <span className="text-lg font-medium">{item.quantity}</span>
              <button
                className="text-lg text-gray-600 hover:text-gray-800 px-2"
                onClick={() => handleQuantityChange(item.id, "increment")}
              >
                +
              </button>

              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-sm font-semibold cursor-pointer hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold">Subtotal:</span>
        <span className="font-medium">{totalPrice.toFixed(2)}৳</span>
      </div>

      <div className="flex space-x-4">
{/*  
        <button
          className="w-full bg-red-600 w-xs text-white p-2 rounded-md"
          onClick={() => {
            if (cartItems.length > 0) {
              navigate("/checkout");
            } else {
              alert("Your cart is empty! Please add items to proceed.");
            }
          }}
        >
          Checkout
        </button> */}
              <button
          className="w-full bg-red-600 text-white p-2 rounded-md"
          onClick={() => {
            const token = localStorage.getItem("token");

            if (!token) {
              alert("Please Sign-Up to proceed to checkout.");
              navigate("/login");
              return;
            }

            if (cartItems.length > 0) {
              navigate("/checkout");
            } else {
              alert("Your cart is empty! Please add items to proceed.");
            }
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
