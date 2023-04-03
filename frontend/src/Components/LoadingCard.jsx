import React from "react";

const LoadingCard = () => {
  return (
    <div class="animate-pulse border border-gray-500 h-full max-w-[300px] sm:max-w-[400px] md:w-[350px] shadow rounded-md p-4 w-full mx-auto">
      <div className="w-full h-32 bg-gray-300" />
      <div class="rounded-full bg-gray-300 h-6 w-6 m-2" />
      <div class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-6 py-1">
          <div class="h-10 bg-gray-300 rounded" />
          <div class="space-y-3">
            <div class="h-8 bg-gray-300 rounded"></div>
            <div class="grid grid-cols-3 gap-4">
              <div class="h-8 bg-gray-300 rounded col-span-2" />
              <div class="h-8 bg-gray-300 rounded col-span-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
