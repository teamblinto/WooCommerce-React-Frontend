// import React, { useEffect, useState } from "react";
// import { getAllCoupons } from "./../Api";

// const CouponList = () => {
//   const [coupons, setCoupons] = useState([]);

//   useEffect(() => {
//     const fetchCoupons = async () => {
//       const data = await getAllCoupons();
//       setCoupons(data || []);
//     };
//     fetchCoupons();
//   }, []);

//   return (
//     <div className="mt-6">
//       <h2 className="text-lg font-bold mb-2">Available Coupons</h2>
//       {coupons.length === 0 ? (
//         <p>No coupons available.</p>
//       ) : (
//         <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
//           <div className="flex space-x-4">
//             {coupons.map((coupon) => (
//               <div
//                 key={coupon.id}
//                 className="min-w-[250px] p-3 border rounded bg-gray-50 shadow-sm flex-shrink-0"
//               >
//                 <p className="font-semibold">Code: {coupon.code}</p>
//                 <p className="text-sm text-gray-600">
//                   {coupon.description || "No description"}
//                 </p>
//                 <p className="text-sm">
//                   Discount:{" "}
//                   {coupon.discount_type === "percent"
//                     ? `${coupon.amount}%`
//                     : `${coupon.amount}৳`}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CouponList;
import React, { useEffect, useState } from "react";
import { getAllCoupons } from "./../Api";

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null); // To show copied feedback

  useEffect(() => {
    const fetchCoupons = async () => {
      const data = await getAllCoupons();
      setCoupons(data || []);
    };
    fetchCoupons();
  }, []);

  // Copy coupon code to clipboard and show feedback
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000); // reset after 2 sec
    });
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-extrabold mb-4 text-gray-800">Available Coupons</h2>
      {coupons.length === 0 ? (
        <p className="text-gray-500">No coupons available.</p>
      ) : (
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
          <div className="flex space-x-6 px-2">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="min-w-[280px] p-5 bg-gray rounded-xl shadow-lg text-black relative flex flex-col justify-between"
              >
                <div>
                  <p className="text-sm uppercase tracking-widest font-semibold mb-2 opacity-90">
                    Discount Coupon
                  </p>
                  <h3 className="text-2xl font-bold mb-2 select-all">{coupon.code}</h3>
                  <p className="text-sm mb-3 opacity-90 min-h-[3rem]">
                    {coupon.description || "No description"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">
                    Discount:{" "}
                    {coupon.discount_type === "percent"
                      ? `${coupon.amount}%`
                      : `${coupon.amount}৳`}
                  </span>

                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-40 text-black px-3 py-1 rounded-md text-sm font-medium transition"
                    aria-label={`Copy coupon code ${coupon.code}`}
                  >
                    {copiedCode === coupon.code ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponList;
