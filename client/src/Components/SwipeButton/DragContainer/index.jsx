import { motion } from "framer-motion";
import React from "react";

export default ({ children, x, draggable }) => {
  return (
    <motion.div
      drag="x"
      draggable={draggable}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      style={{ x }}
    >
      {children}
    </motion.div>
  );
};
