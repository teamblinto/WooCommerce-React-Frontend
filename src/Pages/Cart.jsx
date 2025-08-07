import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

const Cart = ({ onCloseCartPopup }) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCart } = useContext(CartContext);

  // Handle quantity changes for individual items
  const handleQuantityChange = (id, action) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        let newQty = item.quantity;
        if (action === "increment") newQty += 1;
        else if (action === "decrement" && newQty > 1) newQty -= 1;
        return { ...item, quantity: newQty };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  // Calculate total price of all cart items
  const totalPrice = cart.reduce(
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
          className="text-xl text-gray-700 hover:text-gray-900 cursor-pointer"
          onClick={() => onCloseCartPopup(false)}
        >
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-xl font-semibold">{totalPrice.toFixed(2)}৳</h2>
      </div>

      {/* List all cart items */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center mb-4 border-b pb-2 last:border-b-0"
          >
            <img
              src={item.images?.[0]?.src || "https://via.placeholder.com/50"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="ml-4 flex flex-col flex-grow">
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-gray-500">
                {item.price}৳ x {item.quantity}
              </span>
            </div>
            <div className="flex flex-col justify-center items-end gap-2">
              <div className="flex items-center space-x-2 ml-auto">
                <button
                  className="text-lg text-gray-600 hover:text-gray-800 px-2 cursor-pointer"
                  onClick={() => handleQuantityChange(item.id, "decrement")}
                >
                  -
                </button>
                <span className="text-lg font-medium">{item.quantity}</span>
                <button
                  className="text-lg text-gray-600 hover:text-gray-800 px-2 cursor-pointer"
                  onClick={() => handleQuantityChange(item.id, "increment")}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm font-semibold cursor-pointer hover:text-red-600"
                >
                  <i className="fas fa-trash"></i>
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
          className="w-full bg-gray-200 text-gray-700 p-2 rounded-md cursor-pointer hover:bg-gray-300  transition-colors ease-in"
          onClick={() => navigate("/viewcart")}
        >
          View Cart
        </button>

        <button
          className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors ease-in cursor-pointer"
          onClick={() => {
            const token = localStorage.getItem("token");

            if (!token) {
              toast.warn("Please Sign-Up to proceed to checkout", {
                position: "top-left",
              });
              navigate("/login");
              return;
            }

            if (cart.length > 0) {
              navigate("/checkout");
            } else {
              toast.warning("Your cart is empty! Please add items to proceed.");
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
