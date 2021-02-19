import React from "react";
import { motion } from "framer-motion";

export default ({ children, background }) => {
  return (
    <motion.div
      style={{
        transition: "all 0.5s ease",
        background,
        width: "100%",
        height: "100%",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        padding: "1px",
        marginLeft: "-1px",
        marginTop: "-1px",
        marginRight: "-1px",
        marginBottom: "-1px",
        boxSizing: "content-box",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </motion.div>
  );
};
