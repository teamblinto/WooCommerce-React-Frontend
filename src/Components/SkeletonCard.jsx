import React from "react";

export default function SkeletonCard() {
  return (
    <div className="max-w-4xl pt-30 mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10">
      {/* Left square */}
      <div className="bg-gray-300 rounded-md w-full h-100"></div>

      {/* Right text lines */}
      <div className="flex-1 space-y-4 py-1">
        <div className="h-12 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-32 bg-gray-300 rounded w-5/6"></div>
        <div className="h-12 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function ProductSkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="bg-gray-300 rounded-md w-full h-72"></div>
      <div className="flex-1 space-y-3 py-1">
        <div className="h-12 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );
}
