import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { AiOutlineSend } from "react-icons/ai";
import { RiStarSFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Chat = () => {
  const { state } = useLocation();
  const ad = state;
  const { freelancer } = state;

  const { user, setUser } = useContext(UserContext);
  console.log(user);
  //   const freelancer = state.freelancer;
  let stars = [];
  for (let i = 0; i < freelancer.rating; i++) {
    stars.push(i);
  }
  useEffect(() => {
    // API to get conversation between the client and freelancer
    // To send params -> [ad.id, freelancer.id, client.id]
  }, []);
  const convo = [
    { id: 1, sender: true, message: "I Like pani puri will you be able to " },
    { id: 2, sender: false, message: "I Like pani puri will you be able to " },
    { id: 3, sender: true, message: "I Like pani puri will you be able to " },
    { id: 4, sender: false, message: "I Like pani puri will you be able to " },
    { id: 5, sender: true, message: "I Like pani puri will you be able to " },
    { id: 6, sender: false, message: "I Like pani puri will you be able to " },
    { id: 7, sender: true, message: "I Like pani puri will you be able to " },
    { id: 8, sender: false, message: "I Like pani puri will you be able to " },
    { id: 9, sender: true, message: "I Like pani puri will you be able to " },
    { id: 10, sender: false, message: "I Like pani puri will you be able to " },
    { id: 11, sender: true, message: "I Like pani puri will you be able to " },
    { id: 12, sender: false, message: "I Like pani puri will you be able to " },
    { id: 13, sender: true, message: "I Like pani puri will you be able to " },
    { id: 14, sender: false, message: "I Like pani puri will you be able to " },
    { id: 15, sender: true, message: "I Like pani puri will you be able to " },
    { id: 16, sender: false, message: "I Like pani puri will you be able to " },
    { id: 17, sender: true, message: "I Like pani puri will you be able to " },
    { id: 18, sender: false, message: "I Like pani puri will you be able to " },
    { id: 19, sender: false, message: "I Like pani puri will you be able to " },
    { id: 20, sender: false, message: "I Like pani puri will you be able to " },
    { id: 28, sender: false, message: "I Like pani puri will you be able to " },
    { id: 38, sender: false, message: "I Like pani puri will you be able to " },
    { id: 48, sender: false, message: "I Like pani puri will you be able to " },
    {
      id: 58,
      sender: false,
      message:
        "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    },
  ];
  function dateFormat(d) {
    let x = new Date();
    return x.getHours() + ":" + x.getMinutes();
  }
  return (
    <div className="flex flex-col lg:flex-row justify-between place-items-center w-screen xl:w-5/6 mx-auto">
      <div className="h-[80vh] w-full sm:w-5/6 lg:w-4/5 flex flex-col justify-end mx-auto border-2 rounded-md border-gray-700 relative">
        <div className="h-full overflow-y-scroll justify-end p-3 gap-y-2">
          {convo.map(({ id, sender, message, style }) => (
            <div
              key={id}
              className={`flex w-fit h-fit min-h-[40px] max-w-[200px] lg:max-w-[700px] p-2 m-5 border border-gray-600 rounded-md ${
                sender ? "ml-auto bg-sky-300" : "mr-auto bg-gray-100"
              } relative`}
            >
              {message}
              <span className="absolute text-[9px] flex h-fit bottom-0 right-1 font-serif font-semibold">
                {dateFormat(new Date())}
              </span>
              <span
                className={`absolute text-xs flex h-fit -bottom-4 ${
                  sender ? "right-1" : "left-1"
                } font-serif`}
              >
                {"tatv"}
              </span>
            </div>
          ))}
        </div>
        <div className="flex p-3 place-items-center justify-end">
          <input
            type="text"
            name="messageBox"
            id="messageBox"
            className="w-5/6 p-2 mx-4 border-2 border-gray-500 rounded-md"
          />
          <AiOutlineSend size={30} className="text-emerald-700" />
        </div>
      </div>
      <div className="flex max-w-[400px] lg:w-1/5 justify-center place-self-center lg:place-self-start">
        <div className="p-4 pt-0">
          <p className="font-serif font-semibold text-xl underline">
            For Ad : {ad.title}
          </p>
          <p className="my-2 font-semibold font-serif underline text-lg text-gray-800">
            About the Seller
          </p>
          {/* Profile Img and profile Page of Freelancer */}
          <Link
            to={"/freelancer/" + freelancer.id}
            className="flex w-full justify-evenly place-items-center mx-auto"
          >
            <img
              src="https://source.unsplash.com/random/80x80"
              alt="Freelancer"
              className="rounded-full my-2"
            />
            <div className="flex flex-col place-items-start justify-center px-4">
              <p>{freelancer.name}</p>
              <p className="flex place-items-center">
                {stars.map((id) => (
                  <RiStarSFill key={id} />
                ))}
                <span className="px-1">{freelancer.rating}</span>
              </p>
            </div>
          </Link>
          <p className="text-gray-600 mt-1">{freelancer.about}</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
