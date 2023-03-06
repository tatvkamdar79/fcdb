import React from "react";

const ServiceCard = ({ id, ServiceName, Link, Description, StartingPrice }) => {
  return (
    <div
      key={id ? id : Math.random()}
      className="bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300"
    >
      <div className="p-4">
        <div className="uppercase tracking-wide text-sm font-semibold">
          {ServiceName}
        </div>
        <a
          href={Link}
          className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
        >
          {Description}
        </a>
        <p className="mt-2 text-gray-500">Starting at {StartingPrice}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
