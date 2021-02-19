import { motion } from "framer-motion";
import React from "react";

export default ({ children }) => {
  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      exit={{ y: -20 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};
