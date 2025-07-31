import React, { useEffect, useState } from "react";
import { getAllOrders } from "../Api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  console.log(orders);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders();
      setOrders(data);
      console.log(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto max-w-5xl pt-30 p-4 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">My Order List</h1>
    </div>
  );
};

export default MyOrders;
