// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getSingleProductData } from "../Api"; // You need to create this API function

// const ProductDetails = ({onAddToCart}) => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   console.log("this is id ",id)

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const data = await getSingleProductData(id);
//       setProduct(data);
//     };
//     fetchProduct();
//   }, [id]);

//   if (!product) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="max-w-4xl pt-30 mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10">
//       {/* Product Image */}
//       <div className="bg-white border rounded-lg p-4">
//         <img
//           src={product.images[0].src}
//           alt={product.name}
//           className="w-full h-auto object-cover"
//         />
//       </div>

//       {/* Product Info */}
//       <div>
//         <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
//         <p className="text-sm text-gray-500 mb-4">Code: {product.sku}</p>

//         {/* Price */}
//         {product.on_sale ? (
//           <div className="flex items-center gap-3">
//             <span className="line-through text-gray-400">৳ {product.regular_price}</span>
//             <span className="text-red-500 text-xl font-bold">৳ {product.sale_price}</span>
//           </div>
//         ) : (
//           <span className="text-xl font-bold text-gray-800">৳ {product.regular_price}</span>
//         )}

//         {/* Short Description */}
//         <div className="mt-6 text-gray-700" dangerouslySetInnerHTML={{ __html: product.description }} />

//         {/* Size Chart Example (Optional: Static or Dynamic based on metadata) */}
//         <div className="mt-8">
//           <h3 className="text-lg font-semibold mb-2">Size Chart</h3>
//           <img src="/path-to-your-size-chart.png" alt="Size Chart" />
//         </div>

//         {/* Quantity + Cart (if using eCommerce) */}
//         <div className="mt-6 flex items-center gap-4">
//           <input
//             type="number"
//             min="1"
//             defaultValue="1"
//             className="border border-gray-300 px-4 py-2 w-20 rounded"
//           />
//           <button onClick={()=>{onAddToCart(productx  )}} className="bg-black text-white px-6 py-2 rounded">Add to Cart</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProductData } from "../Api";

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getSingleProductData(id);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  const handleAddToCart = () => {
    const productWithQuantity = {
      ...product,
      quantity: parseInt(quantity),
    };
    onAddToCart(productWithQuantity);
  };

  return (
    <div className="max-w-4xl pt-30 mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="bg-white border rounded-lg p-4">
        <img
          src={product.images[0].src}
          alt={product.name}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
        <p className="text-sm text-gray-500 mb-4">Code: {product.sku}</p>

        {/* Price */}
        {product.on_sale ? (
          <div className="flex items-center gap-3">
            <span className="line-through text-gray-400">
              ৳ {product.regular_price}
            </span>
            <span className="text-red-500 text-xl font-bold">
              ৳ {product.sale_price}
            </span>
          </div>
        ) : (
          <span className="text-xl font-bold text-gray-800">
            ৳ {product.regular_price}
          </span>
        )}

        {/* Description */}
        <div
          className="mt-6 text-gray-700"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />

        {/* Size Chart */}
        <div className="mt-8">
          {/* <h3 className="text-lg font-semibold mb-2">Size Chart</h3> */}
          {/* <img src="/path-to-your-size-chart.png" alt="Size Chart" /> */}
        </div>

        {/* Quantity + Add to Cart */}
        <div className="mt-6 flex items-center gap-4">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-20 rounded"
          />
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
