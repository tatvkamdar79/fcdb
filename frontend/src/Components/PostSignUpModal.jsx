import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import CircularProgress from "./circularProgress";
import { motion, useMotionValue } from "framer-motion";

const PostSignUpModal = ({ errMsg = "Something about the login error" }) => {
  const progress = useMotionValue(90);
  const [onError, setOnError] = useState(false);
  const [ack, setAck] = useState(false);
  const acknowledged = () => {
    setAck(true);
  };

  return (
    <div className="flex place-items-center h-screen w-screen">
      <div
        className={`${
          ack ? "hidden" : ""
        } flex justify-center place-items-center mx-auto w-4/6 max-w-[500px] h-1/2 max-h-[400px] border-4 border-black ${
          onError === ""
            ? "bg-white"
            : onError === true
            ? "bg-amber-500"
            : "bg-sky-400"
        } rounded-2xl relative`}
      >
        {onError === "" ? (
          ""
        ) : onError ? (
          <div className="absolute top-[15%]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <BiError size={130} className="" />
            </motion.div>
          </div>
        ) : (
          <div className="absolute top-[15%]">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 100 }}
              style={{ x: progress }}
              transition={{ duration: 1.5 }}
            />
            <CircularProgress progress={progress} />
          </div>
        )}
        <AiFillCloseCircle
          size={30}
          className="absolute top-2 left-2"
          onClick={acknowledged}
        />
        <p className="font-playfair font-semibold text-2xl text-center mt-44">
          {errMsg}
        </p>
      </div>
    </div>
  );
};

export default PostSignUpModal;
