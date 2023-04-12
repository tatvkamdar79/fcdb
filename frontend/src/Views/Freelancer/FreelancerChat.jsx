import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { AiOutlineSend } from "react-icons/ai";
import { RiStarSFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { SocketContext, UserContext, ConversationsContext } from "../../App";
import axios from "axios";
import { getCookie } from "../../Hooks/useCookies";

const FreelancerChat = () => {
  // const { user, setUser } = useContext(UserContext);
  const { state } = useLocation();
  const ad = state.adId;

  //   console.log(ad);
  const bottomRef = useRef(null);
  const socket = useContext(SocketContext);
  const { conversations, setConversations } = useContext(ConversationsContext);
  //   console.log(socket);
  const freelancer = state.clientId;
  const [newMessages, setNewMessages] = useState([]);

  // console.log(Object.keys(state), state.ad);
  const sender = state.clientId;
  // console.log("freelancer", sender, "ad", ad);

  // This is the user object whoch has role and everything
  const { user, setUser } = useContext(UserContext);
  // This is the current users details such as _id, name, email etc (user.user)
  const [currentUser, setCurrentUser] = useState(user.user);
  console.log("USER.CONVO lelo", user.conversations);

  const [convo, setConvo] = useState([]);
  //   console.log("CONVO HAIN BHAI", convo);
  // let xyz = user.conversations[0].messages;

  useEffect(() => {
    console.log(user.conversations);
    const newConvo = user.conversations.filter((curConversation) => {
      //   console.log(curConversation.adId, ad._id, curConversation.adId == ad._id);
      //   console.log(
      //     curConversation.clientId,
      //     sender._id,
      //     curConversation.clientId == sender._id
      //   );
      //   console.log(
      //     curConversation.freelancerId,
      //     currentUser._id,
      //     curConversation.freelancerId == currentUser._id
      //   );

      if (
        curConversation.adId == ad._id &&
        currentUser._id == curConversation.freelancerId &&
        sender._id == curConversation.clientId
      ) {
        return true;
      } else return false;
    });
    console.log("Convo is", newConvo);
    if (newConvo.length > 0) {
      console.log("Ikkada");
      setConvo(newConvo[0]);
      console.log(newConvo[0]);
    }
  }, [user]);

  useEffect(() => {
    console.log("Conversations", convo);
  }, [convo]);

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
    socket.socket.emit("sendMessage", msg, receiverId, state.adId._id);
  };

  useEffect(() => {
    const try1 = (msg, senderId, adId) => {
      console.log("Freelancer is", freelancer);
      console.log(state.ad);
      if (adId == state.adId._id && senderId == freelancer._id) {
        console.log("Printing no bhai");
        console.log("Message", msg);
        console.log("Convo hai yeh", newMessages);
        const temp = [
          ...newMessages,
          { sender: senderId, message: msg, id: 9 },
        ];

        // setConvo({ ...convo, messages: newMessages });
        setNewMessages((curState) => {
          return [...curState, { sender: senderId, message: msg, id: 9 }];
        });
      }
    };

    const try2 = (msg, senderId, adId) => {
      console.log("svkjdlalhfsk;LHB,SKA", currentUser._id);
      if (adId == state.adId._id && senderId == freelancer._id) {
        console.log("Printing no bhai");
        console.log("Message", msg);
        console.log("Convo hai yeh", newMessages);

        // setConvo({ ...convo, messages: newMessages });
        setNewMessages((curState) => {
          return [
            ...curState,
            { sender: currentUser._id, message: msg, id: 9 },
          ];
        });
      }
    };

    socket.socket.on("recieveMessage", try1);

    socket.socket.on("recieveMessageSelf", try2);

    return () => {
      socket.socket.off("recieveMessage", try1);
      socket.socket.off("recieveMessageSelf", try2);
    };
  }, [user]);

  useEffect(() => {
    console.log(convo.messages);
  }, [convo]);

  useEffect(() => {
    getUserDetails();
  }, []);

  async function getUserDetails() {
    let jwt = getCookie("JWT_AUTH");
    if (jwt.length === 0) {
      return;
    }

    const headers = {
      authorization: `Bearer ${jwt}`,
    };
    const response = await axios.get(
      "http://localhost:8080/api/getUserDetails",
      {
        headers,
      }
    );
    const fetchedData = response.data.data;
    fetchedData["loggedIn"] = true;
    setUser(fetchedData);
    // console.log("fetched Data bhaoiiiiiii ", fetchedData);
    setCurrentUser(user.user);
    // setAds(currentUser.ads);
    return;
  }
  // useEffect(() => {
  //   console.log("User.Conversation", user.conversations);
  //   let updatedUser = user;
  //   if (user.conversations.length > 0) {
  //     updatedUser.conversations.push("kgfgjfgffuf");
  //   }
  //   updatedUser.conversations = ["abcdef"];
  //   setUser(updatedUser);
  // }, [convo]);
  useEffect(() => {
    // console.log("USER AFTER UPDATING", user);
  }, [user]);
  return (
    <div className="flex flex-col lg:flex-row justify-between place-items-center w-screen xl:w-5/6 mx-auto p-5">
      <div className="h-[85vh] w-full sm:w-5/6 lg:w-4/5 flex flex-col justify-end mx-auto border-2 rounded-md border-gray-700 relative">
        <div
          className="h-full overflow-y-scroll justify-end p-3 gap-y-2"
          id="messages"
        >
          {convo?.messages?.map(
            ({ isviewed, message, sender, timestamp, _id }, index) => (
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
                  {sender === currentUser._id
                    ? currentUser.name
                    : freelancer.name}
                </span>
              </div>
            )
          )}{" "}
          {newMessages.map(
            ({ isviewed, message, sender, timestamp, _id }, index) => (
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
                  {sender === currentUser._id
                    ? currentUser.name
                    : freelancer.name}
                </span>
              </div>
            )
          )}
          <div ref={bottomRef} />
        </div>
        <div className="flex p-3 place-items-center justify-end">
          <input
            type="text"
            name="messageBox"
            id="messageBox"
            className="w-5/6 p-2 mx-4 border-2 border-gray-500 rounded-md"
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

export default FreelancerChat;
