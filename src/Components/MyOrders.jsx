import { useEffect, useState } from "react";
import { getAllOrders } from "../Api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  console.log("token:", token);
  console.log("user Id:", userId);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders();
      console.log("orders:", data); // Log fetched data
      setOrders(data); // Update state with fetched data
    };

    fetchOrders();
  }, []); // Empty dependency array to run only on component mount

  useEffect(() => {
    console.log("Updated orders:", orders); // Log the updated orders state
  }, [orders]); // This will run when 'orders' state is updated

  return (
    <div className="container mx-auto max-w-5xl pt-30 p-4 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">My Order List</h1>
      {/* Render orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Order ID: {order.id}
              </h3>
              <p className="text-sm text-gray-600">Status: {order.status}</p>
              <p className="text-lg font-semibold text-gray-800">
                Total: ${order.total}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
