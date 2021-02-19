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
      x={x}
    >
      {children}
    </motion.div>
  );
};
