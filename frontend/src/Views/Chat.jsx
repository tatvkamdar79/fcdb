import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { AiOutlineSend } from "react-icons/ai";
import { RiStarSFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { SocketContext, UserContext } from "../App";
import axios from "axios";
import { getCookie } from "../Hooks/useCookies";

const Chat = () => {
  const { state } = useLocation();
  const bottomRef = useRef(null);
  const socket = useContext(SocketContext);
  console.log(socket);

  // console.log(Object.keys(state), state.ad);
  const ad = state.ad;
  const freelancer = state.freelancer;
  console.log("freelancer", freelancer, "ad", ad);

  const { user, setUser } = useContext(UserContext);
  const currentUser = user.user;
  const [convo, setConvo] = useState([]);
  // console.log(currentUser);
  let stars = [];
  // for (let i = 0; i < freelancer.rating; i++) {
  //   stars.push(i);
  // }
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, []);

  function dateFormat(d) {
    let x = new Date();
    return x.getHours() + ":" + x.getMinutes();
  }
  const sendMessage = (msg) => {
    // console.log(freelancer);
    let receiverId = freelancer._id;
    let adId = ad._id;
    socket.socket.emit("sendMessage", msg, receiverId, adId);
  };

  useEffect(() => {
    socket.socket.on("recieveMessage", (msg, senderId, adId) => {
      console.log("Message", msg);
      setConvo((convo) => [
        ...convo,
        { id: 9, sender: senderId, message: msg },
      ]);
    });
  }, []);
  const confirmPurchase = async () => {
    if (window.confirm("Do you want to purchase this ad")) {
      console.log("Confirmed");
      const response = await axios.post(
        "http://localhost:8080/api/ads/buyAd",
        {
          adId: ad._id,
          freelancerId: freelancer._id,
          clientId: currentUser._id,
        },
        { headers: { Authorization: `Bearer ${getCookie("JWT_AUTH")}` } }
      );
      if (response.status === 200) {
        let successMessage = response.data.message;
        alert(successMessage);
        console.log(response);
      }
    }
  };
  return (
    <div className="flex flex-col lg:flex-row justify-between place-items-center w-screen xl:w-5/6 mx-auto p-5">
      <div className="h-[85vh] w-full sm:w-5/6 lg:w-4/5 flex flex-col justify-end mx-auto border-2 rounded-md border-gray-700 relative">
        <div
          className="h-full overflow-y-scroll justify-end p-3 gap-y-2"
          id="messages"
        >
          {convo.map(({ id, sender, message }, index) => (
            <div
              key={index}
              className={`flex w-fit h-fit min-h-[40px] max-w-[200px] lg:max-w-[700px] p-2 m-5 border border-gray-600 rounded-md ${
                sender === currentUser._id
                  ? "ml-auto bg-green-400"
                  : "mr-auto bg-gray-200"
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
          <div ref={bottomRef} />
        </div>
        <div className="flex p-3 place-items-center justify-end">
          <div className="w-1/2 flex justify-center place-items-center">
            <button
              className="w-full p-2 border-2 border-gray-500 rounded-lg bg-green-500 hover:scale-105 transition-all duration-300 ease-in-out text-gray-800 font-medium outline-none focus:outline-blue"
              onClick={confirmPurchase}
            >
              Purchase Ad
            </button>
          </div>
          <input
            type="text"
            name="messageBox"
            id="messageBox"
            className="w-full p-2 mx-4 border-2 border-gray-500 rounded-md"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() != "") {
                let msg = e.target.value;
                sendMessage(msg);
                e.target.value = "";
              }
            }}
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
