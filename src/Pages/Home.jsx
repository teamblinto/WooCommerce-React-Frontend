import hero1 from "../assets/img/hero1.jpg";
import hero2 from "../assets/img/hero2.webp";
import hero3 from "../assets/img/hero3.webp";
import hero4 from "../assets/img/hero4.webp";
import hero5 from "../assets/img/hero5.webp";
import { useState, useEffect } from "react";
import ProductsSection from "../Components/Products";

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
      <ProductsSection />
    </>
  );
}

export default Home;
