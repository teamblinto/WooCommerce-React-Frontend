import React from "react";
import { Link, useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="max-w-4xl  mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Order Not Found
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          We could not find your order details.
        </p>
        <Link
          to="/all-products"
          className="bg-black text-white px-6 py-3 rounded hover:bg-black/80 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

return (
  <div className="max-w-2xl pt-20 mx-auto px-4 py-10">
    <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col gap-8">

      {/* Success Message */}
      <div>
        <h1 className="text-3xl font-bold text-green-600 mb-4 text-center">
          Order Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
      </div>

      <div className="flex justify-between">
    

      {/* Order Details */}
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Order Number:</h3>
            <p>{order.id}</p>
          </div>
          <div>
            <h3 className="font-semibold">Date:</h3>
            <p>{new Date(order.date_created).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Total:</h3>
            <p>৳ {order.total}</p>
          </div>
        </div>
      </div>

            {/* Shipping Address */}
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
        <div className="space-y-1">
          <p>{order.shipping.first_name} {order.shipping.last_name}</p>
          <p>{order.shipping.address_1}</p>
          {order.shipping.address_2 && <p>{order.shipping.address_2}</p>}
          <p>
            {order.shipping.city}, {order.shipping.state} {order.shipping.postcode}
          </p>
          <p>{order.shipping.country}</p>
        </div>
      </div>


  </div>


      {/* Continue Shopping Button */}
      <div className="text-center mt-10">
        <Link
          to="/all-products"
          className="bg-black text-white px-6 py-3 rounded hover:bg-black/80 transition"
        >
          Continue Shopping
        </Link>
      </div>

    </div>
  </div>
);

};

export default OrderConfirmation;
