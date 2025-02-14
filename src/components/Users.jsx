import React from "react";
import { motion } from "framer-motion";

function Users() {
  const movingTexts = [
    "105,00+ Downloads",
    "500 Business",
    "Made in Nepal",
    "Supports online/offline",
  ];

  return (
    <div className="w-full h-[150px] relative bg-green-50 flex justify-center items-center overflow-hidden">
      <motion.div
        className="text-2xl text-gray-700 flex gap-24 absolute whitespace-nowrap"
        animate={{
          x: ["0%", "-100%"], // Move from left to right
        }}
        transition={{
          repeat: Infinity,
          duration: 90, 
          ease: "linear", 
          repeatType: "loop", 
          delay:0
        }}
      >
        {/* Concatenate the movingTexts twice to ensure continuous flow */}
        {movingTexts.concat(movingTexts).map((text, index) => (
          <span key={index}>{text}</span>
        ))}
      </motion.div>
    </div>
  );
}

export default Users;
