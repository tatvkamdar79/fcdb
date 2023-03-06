import React from "react";
import logo from "../Assets/logo.png";
import useMediaQuery from "../Hooks/useMediaQuery";

const Navbar = () => {
  const menu = [
    {
      id: 1,
      menuItem: "Fiverr Business",
      Link: "/fiverrBusiness",
    },
    {
      id: 2,
      menuItem: "Explore",
      Link: "/",
    },
    {
      id: 4,
      menuItem: "INR",
      Link: "/",
    },
    {
      id: 5,
      menuItem: "Become a Seller",
      Link: "/",
    },
    {
      id: 6,
      menuItem: "Sign in",
      Link: "/",
    },
    {
      id: 7,
      menuItem: "Sign up",
      Link: "/",
      style: "border border-black p-1 rounded-md",
    },
  ];
  const isAbove600 = useMediaQuery("(min-width: 600px)");
  console.log(isAbove600);
  return (
    <nav className="flex justify-between w-5/6 mx-auto">
      <img src={logo} alt="fiverr" width={120} />
      <div className="flex gap-x-3 items-center">
        {menu.map(({ id, menuItem, Link, style }) => (
          <a
            key={id}
            href={Link}
            className={`hover:scale-105 transition-all duration-500 cursor-pointer ${style}`}
          >
            {menuItem}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
