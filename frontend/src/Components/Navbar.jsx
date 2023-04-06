import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "../Hooks/useMediaQuery";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from "../App";
import { setCookie } from "../Hooks/useCookies";
// import Hamburger from "./HamburgerIcon";
// import { Icon } from "./Menu/Icon";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const smallScreen = useMediaQuery("(max-width: 490px");
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // console.log(smallScreen);
  const [navItems, setNavItems] = useState([
    { id: 1, title: "Home", link: "/home", style: "" },
    { id: 2, title: "Categories", link: "/categories", style: "" },
    { id: 3, title: "Sign in", link: "/signin", style: "" },
    {
      id: 4,
      title: "Join",
      link: "/signup",
      style:
        "border-2 border-gray-500 rounded-md px-4 py-1 hover:bg-green-400 hover:scale-105 transition duration-300 ease-in",
    },
  ]);

  const categories = [
    {
      id: 1,
      category: "Graphics & Design",
      link: "/categories/graphics-and-design",
    },
    {
      id: 2,
      category: "Video & Animation",
      link: "/categories/video-and-animation",
    },
    {
      id: 3,
      category: "Writing & Translation",
      link: "/categories/writing-and-translation",
    },
    {
      id: 4,
      category: "AI Services",
      link: "/categories/ai-services",
    },
    {
      id: 5,
      category: "Digital Marketing",
      link: "/categories/digital-marketing",
    },
    {
      id: 6,
      category: "Music & Audio",
      link: "/categories/music-and-audio",
    },
    {
      id: 7,
      category: "Programming & Tech",
      link: "/categories/programming-and-tech",
    },
    {
      id: 8,
      category: "Business",
      link: "/categories/business",
    },
  ];

  const listenScrollEvent = (event) => {
    if (window.scrollY > 5) {
      // console.log(window.scrollY);
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const logout = () => {
    setUser({ loggedIn: false });
    setCookie("JWT_AUTH", "lkljlk", -1);
    console.log("Logged Out");
    setNavItems([
      { id: 1, title: "Home", link: "/home", style: "" },
      // { id: 2, title: "Categories", link: "/categories", style: "" },
      { id: 3, title: "Sign in", link: "/signin", style: "" },
      {
        id: 4,
        title: "Join",
        link: "/signup",
        style:
          "border-2 border-gray-500 rounded-md px-4 py-1 hover:bg-green-400 hover:scale-105 transition duration-300 ease-in",
      },
    ]);
    navigate("/");
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  useEffect(() => {
    if (user.loggedIn === true) {
      setNavItems([{ id: 1, title: "Home", link: "/home", style: "" }]);
    }
  }, [user.loggedIn]);

  // useEffect(() => {
  // }, [user.user.loggedIn]);

  return (
    <div className="sticky top-0 z-50">
      <nav
        className={`w-full h-[90px] py-5 px-5 border-b-2 border-gray-400 ${
          scrolled ? "bg-neutral-400 text-white" : "bg-white"
        } transition-all duration-700`}
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
                        <Link
                          href={link}
                          className={"flex w-20 justify-start mx-auto"}
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            // )
            <div>
              <ul
                className={`flex place-items-center justify-center m-2 gap-x-8 text-lg font-playfair`}
              >
                {navItems.map(({ id, title, link, style }) => (
                  <li key={id} className={style}>
                    <Link to={link}>{title}</Link>
                  </li>
                ))}
                {user.loggedIn && (
                  <button to={"/"} onClick={logout}>
                    <li className="text-gray-600 m-1">Logout</li>
                  </button>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
      {scrolled && !window.location.href.includes("createAd") && (
        <div
          className={`hidden xl:block z-50 text-gray-600 ${
            scrolled && "bg-neutral-500 text-white font-serif font-bold"
          }`}
        >
          <ul className="flex justify-between px-10">
            {categories.map(({ id, category, link }) => (
              <Link key={id} to={link}>
                <li className="mb-1">{category}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
