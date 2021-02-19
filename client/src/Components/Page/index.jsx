import React from "react";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "spring",
  ease: "easeInOut",
  duration: 0.25,
};

const pageStyle = {
  position: "absolute",
};

export default ({ children }) => {
  return (
    <motion.div
      style={pageStyle}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <ToastContainer limit={1} position="top-center" />
      {children}
    </motion.div>
  );
};
