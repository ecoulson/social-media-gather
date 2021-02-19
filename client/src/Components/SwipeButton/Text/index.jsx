import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const SwipeArrows = () => {
  return (
    <>
      <FaChevronRight size="24px" color="white" />
      <FaChevronRight size="24px" color="white" />
    </>
  );
};

const TextAnimationController = ({ children }) => {
  return (
    <motion.span
      animate={{ x: [null, 30, 0] }}
      transition={{ repeat: Infinity, duration: 4 }}
      whileHover={{ scale: 1.05 }}
      style={{ display: "flex", alignItems: "center" }}
    >
      {children}
    </motion.span>
  );
};

const TextAnimationLifeCycleAnimator = ({ children }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.span>
  );
};

export default ({ text, isSwipeable }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!isSwipeable) {
      setShouldAnimate(false);
    } else {
      setShouldAnimate(true);
    }
  }, [text, isSwipeable]);

  if (!shouldAnimate) {
    return <motion.div whileHover={{ scale: 1.05 }}>{text}</motion.div>;
  }

  return (
    <TextAnimationLifeCycleAnimator>
      <TextAnimationController>
        Swipe
        <SwipeArrows />
      </TextAnimationController>
    </TextAnimationLifeCycleAnimator>
  );
};
