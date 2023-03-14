import React from "react";
import ReactDOM from "react-dom";
import { motion, useTransform } from "framer-motion";

const CircularProgress = ({ progress }) => {
  const circleLength = useTransform(progress, [0, 100], [0, 1]);
  const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1]);
  const circleColor = useTransform(
    progress,
    [0, 95, 100],
    ["#FFCC66", "#FFCC66", "#38EB4D"]
  );

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="145"
      height="135"
      viewBox="0 0 258 258"
    >
      {/* Check mark  */}
      <motion.path
        transform="translate(60 85)"
        d="M3 50L45 92L134 3"
        fill="transparent"
        stroke="#38EB4D"
        strokeWidth={20}
        style={{ pathLength: checkmarkPathLength }}
      />
      {/* Circle */}
      <motion.path
        d="M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z"
        fill="transparent"
        strokeWidth={13}
        stroke={circleColor}
        style={{
          pathLength: circleLength,
        }}
      />
    </motion.svg>
  );
};

export default CircularProgress;
