import React, { useEffect, useState } from "react";
import { getAllProducts } from "../Api";
import { Link } from "react-router-dom";
import { ProductSkeletonCard } from "./SkeletonCard";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
      console.log(data);
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
        <p className="text-gray-600 mt-2">
          Discover our exclusive collection of traditional wear.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {" "}
          <ProductSkeletonCard />
          <ProductSkeletonCard />
          <ProductSkeletonCard />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="bg-white pb-2 rounded-xl group relative cursor-pointer hover:shadow-lg transition">
                {/* SALE Badge */}
                {product.on_sale && (
                  <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 z-10">
                    SALE
                  </span>
                )}

                {/* Product Image */}
                <img
                  src={product.images[0].src}
                  alt={product.name}
                  className="w-full h-[300px] object-cover rounded-md"
                />

                {/* Product Details */}
                <div className="mt-4 px-2">
                  <p className="text-sm text-gray-400">Ethnic Wear</p>
                  <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="mt-1">
                    {product.on_sale ? (
                      <div className="flex gap-2 items-center">
                        <span className="text-sm text-gray-400 line-through">
                          ৳ {product.regular_price}
                        </span>
                        <span className="text-red-500 font-semibold">
                          ৳ {product.sale_price}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-800 font-semibold">
                        ৳ {product.regular_price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsSection;
