import React from "react";

function Checkout() {
  return (
    <div className="bg-stone-100 pt-32">
      <div className="max-w-3xl mx-auto p-6 min-h-screen flex flex-col gap-8">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Complete Your Billing Information
        </h1>
        <form className="space-y-6">
          <div className="flex gap-6">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name *
              </label>
              <input
                id="firstName"
                type="text"
                className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name *
              </label>
              <input
                id="lastName"
                type="text"
                className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country / Region *
            </label>
            <select
              id="country"
              className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="Bangladesh">Bangladesh</option>
              {/* Add more countries as needed */}
            </select>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Street Address *
            </label>
            <input
              id="address"
              type="text"
              className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="House number and street name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="apartment"
              className="block text-sm font-medium text-gray-700"
            >
              Apartment, suite, unit, etc. (optional)
            </label>
            <input
              id="apartment"
              type="text"
              className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Town / City *
            </label>
            <input
              id="city"
              type="text"
              className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700"
            >
              District *
            </label>
            <select
              id="district"
              className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option>Select an option...</option>
              {/* Add more districts as needed */}
            </select>
          </div>

          <div>
            <label
              htmlFor="postcode"
              className="block text-sm font-medium text-gray-700"
            >
              Postcode / ZIP (optional)
            </label>
            <input
              id="postcode"
              type="text"
              className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone *
            </label>
            <input
              id="phone"
              type="tel"
              className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="createAccount"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="createAccount" className="text-sm text-gray-700">
              Create an account?
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="shipToDifferent"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="shipToDifferent" className="text-sm text-gray-700">
              Ship to a different address?
            </label>
          </div>

          <div>
            <label
              htmlFor="orderNotes"
              className="block text-sm font-medium text-gray-700"
            >
              Order notes (optional)
            </label>
            <textarea
              id="orderNotes"
              className="mt-1 p-3 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Notes about your order, e.g. special notes for delivery."
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full mt-6 py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
