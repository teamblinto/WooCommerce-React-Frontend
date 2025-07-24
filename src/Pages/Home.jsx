import hero1 from "../assets/img/hero1.jpg";
import hero2 from "../assets/img/hero2.webp";
import hero3 from "../assets/img/hero3.webp";
import hero4 from "../assets/img/hero4.webp";
import hero5 from "../assets/img/hero5.webp";
import product from "../assets/img/saree1.jpg";
import { useState, useEffect } from "react";

const images = [hero1, hero2, hero3, hero4, hero5];

function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {/* // producti section */}
      <div className="container mx-auto p-5">
        <h1 className="text-4xl font-bold text-slate-950">Product List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 lg:gap-10 p-6">
          <div className="bg-white flex flex-col gap-2">
            <div>
              <img src={product} alt="" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Category</p>
              <h2 className="text-lg font-semibold text-slate-900 mt-1">
                Title
              </h2>
              <p className="text-md text-gray-600 mt-1">$99.99</p>
            </div>
          </div>
          <div className="bg-white flex flex-col gap-2">
            <div>
              <img src={product} alt="" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Category</p>
              <h2 className="text-lg font-semibold text-slate-900 mt-1">
                Title
              </h2>
              <p className="text-md text-gray-600 mt-1">$99.99</p>
            </div>
          </div>
          <div className="bg-white flex flex-col gap-2">
            <div>
              <img src={product} alt="" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Category</p>
              <h2 className="text-lg font-semibold text-slate-900 mt-1">
                Title
              </h2>
              <p className="text-md text-gray-600 mt-1">$99.99</p>
            </div>
          </div>
          <div className="bg-white flex flex-col gap-2">
            <div>
              <img src={product} alt="" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">Category</p>
              <h2 className="text-lg font-semibold text-slate-900 mt-1">
                Title
              </h2>
              <p className="text-md text-gray-600 mt-1">$99.99</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
