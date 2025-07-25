import React from "react";
import CartCard from "../Components/cart/CartCard";

const Cart = () => {
  return (
    <div className="bg-stone-100 pt-32">
      <div className="max-w-3xl mx-auto p-6 min-h-screen">
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
      </div>
    </div>
  );
};

export default Cart;
