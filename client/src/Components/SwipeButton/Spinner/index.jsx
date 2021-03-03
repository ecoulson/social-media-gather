import { motion } from "framer-motion";
import React from "react";
import Loader from "react-loader-spinner";

export default () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <Loader type="TailSpin" color="white" width="40px" height="40px" />
    </motion.div>
  );
};
