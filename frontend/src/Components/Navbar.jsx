import React from "react";
import useMediaQuery from "../Hooks/useMediaQuery";
// import Hamburger from "./HamburgerIcon";
import { Icon } from "./Menu/Icon";

const Navbar = () => {
  const isLessThan600 = useMediaQuery("(max-width: 600px");
  console.log(isLessThan600);
  const navItems = [
    { id: 1, title: "Explore", link: "/explore", style: "" },
    { id: 2, title: "About", link: "/about", style: "" },
    { id: 3, title: "Sign in", link: "/signin", style: "" },
    {
      id: 4,
      title: "Join",
      link: "/join",
      style:
        "border-2 border-gray-500 rounded-md px-4 py-1 hover:bg-green-400 hover:scale-105 transition duration-300 ease-in",
    },
  ];
  return (
    <>
      <Icon />
      <Icon />
      <Icon />
      <Icon />
      <Icon />
      <Icon />
      <Icon />
      {/* <nav className="w-screen border-b-2 border-gray-700">
        <div className="flex place-items-center justify-between w-5/6 mx-auto">
          <div className="text-3xl font-playfair font-bold">
            FCDB<span className="text-4xl text-green-400">.</span>
          </div>
          <div>
            <ul className="flex place-items-center justify-center m-2 gap-x-8 text-lg font-playfair">
              {navItems.map(({ id, title, link, style }) => (
                <a href={link} className={style}>
                  <li key={id}>{title}</li>
                </a>
              ))}
            </ul>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default Navbar;
