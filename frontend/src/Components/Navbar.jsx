import React, { useEffect, useState } from "react";
import useMediaQuery from "../Hooks/useMediaQuery";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
// import Hamburger from "./HamburgerIcon";
// import { Icon } from "./Menu/Icon";

const Navbar = () => {
  const smallScreen = useMediaQuery("(max-width: 600px");
  const [toggleMenuIcon, setToggleMenuIcon] = useState(true);
  // console.log(smallScreen);
  const [header, setHeader] = useState("");
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

  const listenScrollEvent = (event) => {
    if (window.scrollY < 5) {
      return setHeader("");
    } else {
      console.log("Scrolled");
      return setHeader("header2");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  return (
    <div className="w-screen h-[90px] py-5 border-b-2 border-gray-700">
      {/* <Icon /> */}
      <div className="flex justify-between w-5/6 mx-auto relative">
        <div className="text-3xl font-playfair font-bold">
          FCDB<span className="text-4xl text-green-400">.</span>
        </div>
        {smallScreen ? (
          // toggleMenuIcon ? (
            <div
              className={`group-[1] h-screen w-[200px] z-50 bg-cyan-500 ${
                toggleMenuIcon ? "ml-0" : "ml-[300px]"
              } overflow-hidden transition duration-1000 ease-in-out`}
            >
              <AiOutlineClose
                size={30}
                onClick={() => setToggleMenuIcon(!toggleMenuIcon)}
                className="relative left-4 group-[1]"
              />
              <div className="mt-10 group-[1]">
                <ul>
                  <li>tatv</li>
                  <li>tatv</li>
                  <li>tatv</li>
                  <li>tatv</li>
                  <li>tatv</li>
                </ul>
              </div>
            </div>
          // ) : (
            // <GiHamburgerMenu
            //   size={25}
            //   onClick={() => setToggleMenuIcon(!toggleMenuIcon)}
            //   className="absolute right-0 top-[30%]"
            // />
          // )
        ) : (
          <div>
            <ul className="flex place-items-center justify-center m-2 gap-x-8 text-lg font-playfair">
              {navItems.map(({ id, title, link, style }) => (
                <li key={id} className={style}>
                  <a href={link}>{title}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
