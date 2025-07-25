export default function CartCard() {
  return (
    <>
      <div className="flex justify-between gap-2 items-center p-4 border-b border-gray-300">
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1753189198501-307a6accabdf?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Product 1"
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>

        <div className="flex-grow justify-between flex flex-col gap-4">
          <div className="flex gap-2 justify-between">
            <h3 className="text-xl font-medium">Product 1</h3>
            <div className="flex flex-col gap-2">
              <p className="text-gray-600">$30 x 2</p>
              <p className="text-gray-800 font-bold">Total: $60</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              Update
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
