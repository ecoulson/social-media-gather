import { motion } from "framer-motion";
import React from "react";

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default ({ children }) => {
  return <motion.div variants={item}>{children}</motion.div>;
};
