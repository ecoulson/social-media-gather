import { motion } from "framer-motion";
import React from "react";

export default ({ children, x }) => {
  return (
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      x={x}
    >
      {children}
    </motion.div>
  );
};
