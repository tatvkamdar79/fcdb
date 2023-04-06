import React from "react";

const LoadingCard = () => {
  return (
    <div className="animate-pulse border border-gray-500 h-full max-w-[300px] sm:max-w-[400px] md:w-[350px] shadow rounded-md p-4 w-full mx-auto">
      <div className="w-full h-32 bg-gray-300" />
      <div className="rounded-full bg-gray-300 h-6 w-6 m-2" />
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-10 bg-gray-300 rounded" />
          <div className="space-y-3">
            <div className="h-8 bg-gray-300 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-8 bg-gray-300 rounded col-span-2" />
              <div className="h-8 bg-gray-300 rounded col-span-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
