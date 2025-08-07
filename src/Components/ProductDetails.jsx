import React, { useContext, useEffect, useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { getSingleProductData } from "../Api";

import { ClipLoader } from "react-spinners";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { setCartPopUp } = useOutletContext();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getSingleProductData(id);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color={"#000"} loading={loading} size={150} />
      </div>
    );

  const handleAddToCart = () => {
    const productWithQuantity = {
      ...product,
      quantity: parseInt(quantity),
    };
    addToCart(productWithQuantity);
    setCartPopUp(true);
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
            className="bg-black text-white px-6 py-2 rounded hover:bg-black/86 cursor-pointer"
          >
            Add to Cart
          </button>
          <button
            onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                navigate("/login");
              } else {
                handleAddToCart();
                navigate("/checkout");
              }
            }}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors ease-in cursor-pointer"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
