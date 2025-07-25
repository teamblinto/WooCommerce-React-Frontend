import React from "react";
import CartCard from "../Components/cart/CartCard";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const handleProceedCheckout = () => {
    navigate("/checkout"); // Navigate to the checkout page
  };

  return (
    <div className="bg-stone-100 pt-32 grid grid-cols-[1.5fr_1fr] gap-4">
      <div className="p-6 min-h-screen flex flex-col gap-8">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Your Shopping Cart
        </h1>

        <div className="flex flex-col gap-3 items-start">
          {/* cart list */}
          <div className="w-full flex flex-col gap-2">
            {/* card */}
            <CartCard />
            <CartCard />
            <CartCard />
          </div>
          <div className="w-full p-4 text-right flex justify-between">
            <h2 className="text-2xl font-semibold">Total:</h2>
            <h2 className="text-2xl font-semibold">
              ৳ {30 * 2 + 20 * 1 + 50 * 3}
            </h2>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={handleProceedCheckout}
            className="px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-md cursor-pointer"
          >
            Update Order
          </button>
        </div>
      </div>

      <div className="p-6 min-h-screen flex flex-col gap-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Enter Your Coupon Code
        </h1>

        <form className="">
          <div className="flex justify-center items-center space-x-4">
            <input
              type="text"
              id="couponCode"
              className="p-3 border border-gray-300 rounded-md w-full max-w-xs text-black focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter your coupon code"
              required
            />
            <button
              type="submit"
              className="bg-stone-800 text-white px-6 py-3 rounded-md hover:bg-stone-900 transition cursor-pointer"
            >
              Apply Coupon
            </button>
          </div>
        </form>

        <div className="flex justify-center items-center">
          <button
            onClick={handleProceedCheckout}
            className="px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-md cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
