// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const CartPage = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   // Handle quantity changes for individual items
//   const handleQuantityChange = (id, action) => {
//     setCartItems((prevItems) => {
//       const updatedItems = prevItems.map((item) => {
//         if (item.id === id) {
//           let newQty = item.quantity;
//           if (action === "increment") newQty += 1;
//           else if (action === "decrement" && newQty > 1) newQty -= 1;
//           return { ...item, quantity: newQty };
//         }
//         return item;
//       });
//       // Update localStorage
//       localStorage.setItem("cart", JSON.stringify(updatedItems));
//       return updatedItems;
//     });
//   };

//   // Remove item from cart
//   function handleRemoveItem(itemId) {
//     setCartItems((prevItems) => {
//       const updatedItems = prevItems.filter((item) => item.id !== itemId);

//       // Update localStorage with the updated cart
//       localStorage.setItem("cart", JSON.stringify(updatedItems));
//       return updatedItems;
//     });
//   }

//   // Calculate total price of all cart items
//   const totalPrice = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   // const handleProceedCheckout = () => {
//   //   navigate("/checkout");
//   // };

//   return (
//     <div className="container mx-auto max-w-5xl pt-30 p-4">
//       <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         cartItems.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center mb-4 border-b pb-2 last:border-b-0"
//           >
//             <img
//               src={item.images[0].src || "https://via.placeholder.com/50"}
//               alt={item.name}
//               className="w-16 h-16 object-cover rounded-md"
//             />
//             <div className="ml-4 flex flex-col flex-grow">
//               <span className="font-medium">{item.name}</span>
//               <span className="text-sm text-gray-500">
//                 {item.price}৳  x  {item.quantity}
//               </span>
//             </div>
//             <div className="flex items-center space-x-2 ml-auto">
//               <button
//                 className="text-lg text-gray-600 hover:text-gray-800 px-2"
//                 onClick={() => handleQuantityChange(item.id, "decrement")}
//               >
//                 -
//               </button>
//               <span className="text-lg font-medium">{item.quantity}</span>
//               <button
//                 className="text-lg text-gray-600 hover:text-gray-800 px-2"
//                 onClick={() => handleQuantityChange(item.id, "increment")}
//               >
//                 +
//               </button>

//               <button
//                 onClick={() => handleRemoveItem(item.id)}
//                 className="text-sm font-semibold cursor-pointer hover:text-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))
//       )}

//       <div className="flex justify-between items-center mb-4">
//         <span className="font-semibold">Subtotal:</span>
//         <span className="font-medium">{totalPrice.toFixed(2)}৳</span>
//       </div>

//       <div className="flex space-x-4">
// {/*
//         <button
//           className="w-full bg-red-600 w-xs text-white p-2 rounded-md"
//           onClick={() => {
//             if (cartItems.length > 0) {
//               navigate("/checkout");
//             } else {
//               alert("Your cart is empty! Please add items to proceed.");
//             }
//           }}
//         >
//           Checkout
//         </button> */}
//               <button
//           className="w-full bg-red-600 text-white p-2 rounded-md"
//           onClick={() => {
//             const token = localStorage.getItem("token");

//             if (!token) {
//               toast.warn("Please Sign-Up to proceed to checkout", {
//   position: "top-left",
// });

//               navigate("/login");
//               return;
//             }

//             if (cartItems.length > 0) {
//               navigate("/checkout");
//             } else {
//               toast.warn("Your cart is empty! Please add items to proceed.");
//             }
//           }}
//         >
//           Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCoupons } from "../../Api"; // Adjust path
import CouponList from "../CouponList";
import { CartContext } from "../../context/CartContext";

const CartPage = () => {
  const { cart, updateCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllCoupons();
      setCoupons(data || []);
    };
    fetchCoupons();

    // Load saved coupon
    const savedCoupon = localStorage.getItem("coupon");
    if (savedCoupon) {
      const parsed = JSON.parse(savedCoupon);
      setCouponCode(parsed.code);
      setDiscount(parsed.discount);
      setAppliedCoupon(parsed.couponData);
    }
  }, [cart]);

  // useEffect(() => {

  //   const savedCart = localStorage.getItem("cart");
  //   if (savedCart) {
  //     setCartItems(JSON.parse(savedCart));
  //   }

  //   // Fetch coupons
  //   const fetchCoupons = async () => {
  //     const data = await getAllCoupons();
  //     setCoupons(data || []);
  //   };

  //   fetchCoupons();
  // }, []);

  // Handle quantity changes
  const handleQuantityChange = (id, action) => {
    const updatedItems = cart.map((item) => {
      if (item.id === id) {
        let newQty = item.quantity;
        if (action === "increment") newQty += 1;
        else if (action === "decrement" && newQty > 1) newQty -= 1;
        return { ...item, quantity: newQty };
      }
      return item;
    });
    updateCart(updatedItems);
  };

  // Remove item
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // // Apply coupon
  // const applyCoupon = () => {
  //   const match = coupons.find(
  //     (c) => c.code.toLowerCase() === couponCode.trim().toLowerCase()
  //   );

  //   if (!match) {
  //     toast.error("Invalid coupon code");
  //     return;
  //   }

  //   let discountAmount = 0;
  //   if (match.discount_type === "percent") {
  //     discountAmount = (totalPrice * parseFloat(match.amount)) / 100;
  //   } else if (match.discount_type === "fixed_cart") {
  //     discountAmount = parseFloat(match.amount);
  //   }

  //   setDiscount(discountAmount);
  //   setAppliedCoupon(match);
  //   toast.success(`Coupon "${match.code}" applied!`);
  // };

  const applyCoupon = () => {
    const match = coupons.find(
      (c) => c.code.toLowerCase() === couponCode.trim().toLowerCase()
    );

    if (!match) {
      toast.error("Invalid coupon code");
      return;
    }

    let discountAmount = 0;
    if (match.discount_type === "percent") {
      discountAmount = (totalPrice * parseFloat(match.amount)) / 100;
    } else if (match.discount_type === "fixed_cart") {
      discountAmount = parseFloat(match.amount);
    }

    setDiscount(discountAmount);
    setAppliedCoupon(match);

    // 🔒 Store to localStorage
    localStorage.setItem(
      "coupon",
      JSON.stringify({
        code: match.code,
        discount: discountAmount,
        couponData: match,
      })
    );

    toast.success(`Coupon "${match.code}" applied!`);
  };

  return (
    <div className="container mx-auto max-w-5xl pt-30 p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center mb-4 border-b pb-2 last:border-b-0"
          >
            <img
              src={item.images[0]?.src || "https://via.placeholder.com/50"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="ml-4 flex flex-col flex-grow">
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-gray-500">
                {item.price}৳ x {item.quantity}
              </span>
            </div>
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
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm font-semibold cursor-pointer hover:text-red-600"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))
      )}

      <div className="my-4">
        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-green-100 text-green-700 px-4 py-2 rounded-md">
            <span>Coupon applied</span>
            <button
              onClick={() => {
                setAppliedCoupon(null);
                setCouponCode("");
                setDiscount(0);
                localStorage.removeItem("coupon");
              }}
              className="text-red-500 ml-4 font-semibold hover:underline"
            >
              ✕
            </button>
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="border px-3 py-2 mr-2"
            />
            <button
              onClick={applyCoupon}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors ease-in cursor-pointer"
            >
              Apply Coupon
            </button>
          </>
        )}
      </div>

      {/* Total Display */}
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold">Subtotal:</span>
        {discount > 0 ? (
          <div>
            <span className="line-through text-gray-500 mr-2">
              {totalPrice.toFixed(2)}৳
            </span>
            <span className="text-green-600 font-bold ">
              {(totalPrice - discount).toFixed(2)}৳
            </span>
          </div>
        ) : (
          <span className="font-medium">{totalPrice.toFixed(2)}৳</span>
        )}
      </div>

      {/* Checkout */}
      <div className="flex space-x-4">
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
              toast.warn("Your cart is empty! Please add items to proceed.");
            }
          }}
        >
          Checkout
        </button>
      </div>

      <div className="mt-16">
        <CouponList />
      </div>
    </div>
  );
};

export default CartPage;
