import React from "react";
import { GiPencilBrush } from "react-icons/gi";
import { RiBookletFill } from "react-icons/ri";
import { BiMoviePlay } from "react-icons/bi";
import { RiDatabase2Fill } from "react-icons/ri";
import { GiMusicalNotes } from "react-icons/gi";
import { FaLaptopCode } from "react-icons/fa";
import { GiShakingHands } from "react-icons/gi";
import { BsCupHotFill } from "react-icons/bs";
import { BsFillCameraFill } from "react-icons/bs";
import { HiComputerDesktop } from "react-icons/hi2";

const CategoryIcons = () => {
  const Categories = [
    {
      id: 1,
      category: "Graphics and Design",
      element: <GiPencilBrush size={35} />,
      link: "#",
    },
    {
      id: 2,
      category: "Digital Marketing",
      element: <HiComputerDesktop size={39} />,
      link: "#",
    },
    {
      id: 3,
      category: "Writing & Translation",
      element: <RiBookletFill size={35} />,
      link: "#",
    },
    {
      id: 4,
      category: "Video & Animation",
      element: <BiMoviePlay size={35} />,
      link: "#",
    },
    {
      id: 5,
      category: "Music & Audio",
      element: <GiMusicalNotes size={35} />,
      link: "#",
    },
    {
      id: 6,
      category: "Programming & Tech",
      element: <FaLaptopCode size={35} />,
      link: "#",
    },
    {
      id: 7,
      category: "Business",
      element: <GiShakingHands size={35} />,
      link: "#",
    },
    {
      id: 8,
      category: "Lifestyle",
      element: <BsCupHotFill size={35} />,
      link: "#",
    },
    {
      id: 9,
      category: "Data",
      element: <RiDatabase2Fill size={35} />,
      link: "#",
    },
    {
      id: 10,
      category: "Photography",
      element: <BsFillCameraFill size={35} />,
      link: "#",
    },
  ];
  return (
    <div className="my-20 w-5/6 flex flex-col mx-auto">
      <h4 className="text-4xl font-playfair font-semibold my-10 underline">
        Explore the Marketplace
      </h4>
      <div className="mb-20 py-5 grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 gap-y-7 pb-10 w-full mx-auto place-items-center justify-center">
        {Categories.map(({ id, category, element, link }) => (
          <a
            key={id}
            href={link}
            className="flex flex-col justify-center place-items-center text-emerald-500 group group-hover:text-green-500"
          >
            <div className="px-4 py-3 border-b-2 border-gray-400 group-hover:px-7 group-hover:border-blue transition-all duration-500">
              {element}
            </div>
            <p className="text-gray-600 font-semibold mt-3 text-center h-10">
              {category}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategoryIcons;
