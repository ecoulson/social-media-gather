import { motion } from "framer-motion";
import React from "react";
import ItemAnimationController from "./ItemAnimationController";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

export default ({ children, autoWrapChildren = true }) => {
  return (
    <motion.div
      style={{ width: "100%", height: "100%" }}
      variants={container}
      initial="hidden"
      exit="hidden"
      animate="show"
    >
      {autoWrapChildren
        ? React.Children.map(children, (child) => (
            <ItemAnimationController>{child}</ItemAnimationController>
          ))
        : children}
    </motion.div>
  );
};
