import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ onCloseCartPopup }) => {
  const navigate = useNavigate();

  // Load cart from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    // Ensure quantity is present and numeric for each item
    if (savedCart) {
      return JSON.parse(savedCart).map((item) => ({
        ...item,
        quantity: item.quantity ? Number(item.quantity) : 1,
        price: Number(item.price) || 0,
      }));
    }
    return [];
  });

  // remove item from cart
  function handleRemoveItem(itemId) {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);

      // Update localStorage with the updated cart
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  }

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

  // Calculate total price of all cart items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // const handleProceedCheckout = () => {
  //   navigate("/checkout");
  // };

  return (
    <div className="fixed right-0 top-0 bottom-0 w-88 h-screen bg-white shadow-lg p-4  overflow-auto z-20">
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-xl text-gray-700 hover:text-gray-900"
          onClick={() => onCloseCartPopup(false)}
        >
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-xl font-semibold">{totalPrice.toFixed(2)}৳</h2>
      </div>

      {/* List all cart items */}
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
                {item.price.toFixed(2)}৳ x {item.quantity}
              </span>
            </div>
            <div className="flex flex-col justify-center items-end gap-2">
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
              </div>
              <div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-sm font-semibold cursor-pointer hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold">Subtotal:</span>
        <span className="font-medium">{totalPrice.toFixed(2)}৳</span>
      </div>

      <div className="flex space-x-4">
        <button
          className="w-full bg-gray-200 text-gray-700 p-2 rounded-md"
          onClick={() => navigate("/viewcart")}
        >
          View Cart
        </button>
        {/* <button
          className="w-full bg-red-600 text-white p-2 rounded-md"
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
              alert("Please login to proceed to checkout.");
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

export default Cart;
