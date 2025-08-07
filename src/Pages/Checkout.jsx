import { useEffect, useState } from "react";
import { createOrder } from "../Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shipToDifferent: false,
    billing: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "BD",
      email: "",
      phone: "",
    },
    shipping: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "BD",
    },
  });

  useEffect(() => {
    const savedBillingInfo = localStorage.getItem("billingInfo");
    if (savedBillingInfo) {
      setFormData((prev) => ({
        ...prev,
        billing: JSON.parse(savedBillingInfo),
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if (id === "shipToDifferent") {
      setFormData((prev) => ({ ...prev, shipToDifferent: checked }));
    } else if (id.startsWith("shipping_")) {
      const field = id.replace("shipping_", "");
      setFormData((prev) => ({
        ...prev,
        shipping: {
          ...prev.shipping,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        billing: {
          ...prev.billing,
          [id]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        payment_method: "bacs",
        payment_method_title: "Direct Bank Transfer",
        set_paid: true,
        billing: formData.billing,
        shipping: formData.shipToDifferent
          ? formData.shipping
          : formData.billing,
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: "10.00",
          },
        ],
      };

      const createdOrder = await createOrder(orderData);
      toast.success("Order placed successfully!", {
        position: "top-left",
      });
      localStorage.setItem("billingInfo", JSON.stringify(formData.billing));
      localStorage.removeItem("cart"); // Clear cart after order
      navigate("/order-confirmation", { state: { order: createdOrder } }); // Redirect to orders page
    } catch (error) {
      console.error("Order failed:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="bg-stone-100 pt-32">
      <div className="max-w-3xl mx-auto p-6 min-h-screen">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Complete Your Billing Information
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Billing Fields */}
          {[
            "first_name",
            "last_name",
            "address_1",
            "address_2",
            "city",
            "state",
            "postcode",
            "email",
            "phone",
          ].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 capitalize"
              >
                {field.replace("_", " ")} *
              </label>
              <input
                id={field}
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                    ? "tel"
                    : "text"
                }
                className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
                value={formData.billing[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          {/* Country */}
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country *
            </label>
            <select
              id="country"
              className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
              value={formData.billing.country}
              onChange={handleChange}
              required
            >
              <option value="BD">Bangladesh</option>
              <option value="US">United States</option>
            </select>
          </div>

          {/* Ship to different address checkbox */}
          <div className="flex items-center gap-3">
            <input
              id="shipToDifferent"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              checked={formData.shipToDifferent}
              onChange={handleChange}
            />
            <label htmlFor="shipToDifferent" className="text-sm text-gray-700">
              Ship to a different address?
            </label>
          </div>

          {/* Shipping Fields if different */}
          {formData.shipToDifferent && (
            <>
              <h2 className="text-lg font-semibold">Shipping Address</h2>
              {[
                "first_name",
                "last_name",
                "address_1",
                "address_2",
                "city",
                "state",
                "postcode",
              ].map((field) => (
                <div key={`shipping_${field}`}>
                  <label
                    htmlFor={`shipping_${field}`}
                    className="block text-sm font-medium text-gray-700 capitalize"
                  >
                    {field.replace("_", " ")} *
                  </label>
                  <input
                    id={`shipping_${field}`}
                    type="text"
                    className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
                    value={formData.shipping[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </>
          )}

          <button
            type="submit"
            className="w-full mt-6 py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer transition-colors ease-in"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
