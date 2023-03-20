import React, { useEffect, useState } from "react";
import useMediaQuery from "../Hooks/useMediaQuery";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
// import Hamburger from "./HamburgerIcon";
// import { Icon } from "./Menu/Icon";

const Navbar = () => {
  const smallScreen = useMediaQuery("(max-width: 490px");
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // console.log(smallScreen);
  const navItems = [
    { id: 1, title: "Explore", link: "/explore", style: "" },
    { id: 2, title: "About", link: "/about", style: "" },
    { id: 3, title: "Sign in", link: "/signin", style: "" },
    {
      id: 4,
      title: "Join",
      link: "/signup",
      style:
        "border-2 border-gray-500 rounded-md px-4 py-1 hover:bg-green-400 hover:scale-105 transition duration-300 ease-in",
    },
  ];

  const listenScrollEvent = (event) => {
    if (window.scrollY > 5) {
      console.log(window.scrollY);
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  return (
    <nav
      className={`sticky top-0 z-50 w-screen h-[90px] py-5 px-5 border-b-2 border-gray-700 bg-gradient-to-b to-white ${
        scrolled && "from-gray-300"
      }`}
    >
      {/* <Icon /> */}
      <div className="flex justify-between w-full pl-4 relative">
        <div className="text-3xl font-playfair font-bold">
          FCDB<span className="text-4xl text-green-400">.</span>
        </div>
        {smallScreen ? (
          // isMenuToggled ? (
          <div className={`overflow-clip`}>
            <GiHamburgerMenu
              size={25}
              onClick={() => setIsMenuToggled(!isMenuToggled)}
              className={`absolute right-4 top-3 ${
                isMenuToggled ? "opacity-0" : ""
              } transition-all duration-1000`}
            />
            {/* // ) : ( */}
            <div
              className={`border-l-2 border-gray-300 ${
                isMenuToggled ? "h-screen ml-0" : "h-[69px] ml-96"
              } transition-all duration-[1300ms] bg-gradient-to-br from-white via-cyan-50 to-cyan-300`}
            >
              <AiOutlineClose
                size={30}
                onClick={() => setIsMenuToggled(!isMenuToggled)}
              />
              <div className="mt-10">
                <ul className="flex flex-col justify-start gap-y-20">
                  {navItems.map(({ id, title, link, style }) => (
                    <li
                      key={id}
                      className="px-16 font-semibold font-playfair text-xl text-center"
                    >
                      <a
                        href={link}
                        className={"flex w-20 justify-start mx-auto"}
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          // )
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
    </nav>
  );
};

export default Navbar;
