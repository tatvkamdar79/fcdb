import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import axios from "axios";
import loading from "../Assets/carouselLoading.jpg";

const Carousel = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function fetchCards() {
      const res = await axios.get("http://localhost:8080/ads");
      setCards(res.data);
    }
    fetchCards();
  }, []);

  const scrollLeft = () => {
    document.getElementById("content").scrollLeft -= 600;
  };
  const scrollRight = () => {
    document.getElementById("content").scrollLeft += 600;
  };

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute z-50 left-0 bottom-[43%] p-2 m-2 rounded-full bg-white border-2 border-blue hover:scale-125 transition duration-300"
      >
        <FiChevronLeft className="text-black" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute z-50 right-0 bottom-[43%] p-2 m-2 rounded-full bg-white border-2 border-blue hover:scale-125 transition duration-300"
      >
        <FiChevronRight className="text-black" />
      </button>
      <div className="flex">
        <div
          id="content"
          className=" p-4 flex gap-x-2 items-center justify-start overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
        >
          {cards.map(({ id, ServiceName, Description, ImageLink, link }) => (
            <Card
              key={id}
              id={id}
              ServiceName={ServiceName}
              Description={Description}
              ImageLink={ImageLink}
              RedirectLink={link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
