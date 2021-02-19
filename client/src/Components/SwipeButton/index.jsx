import React from "react";
import { Swipeable, defineSwipe } from "react-touch";
import { AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Background from "./Background";
import Overlay from "./Overlay";
import Spinner from "./Spinner";
import DragContainer from "./DragContainer";
import AnimationContainer from "./AnimationContainer";
import Text from "./Text";

export default ({ isLoading, onSwipe, isSwipeable, text, didError }) => {
  const getSwipeColor = () => {
    if (!isSwipeable || didError) {
      return "#A63C06";
    }
    return "#60D394";
  };

  const renderContent = () => {
    return isLoading ? (
      <Spinner />
    ) : (
      <AnimationContainer x={x}>
        <Text isSwipeable={isSwipeable} text={text} />
      </AnimationContainer>
    );
  };

  const renderOverlay = () => {
    return !isLoading ? (
      <Overlay background={swipeBackground}>
        <AnimatePresence>{renderContent()}</AnimatePresence>
      </Overlay>
    ) : (
      <Overlay background={getSwipeColor()}>
        <AnimatePresence>{renderContent()}</AnimatePresence>
      </Overlay>
    );
  };

  const swipe = defineSwipe({ swipeDistance: 100 });
  const x = useMotionValue(0);
  const swipeColor = getSwipeColor();
  const swipeBackground = useTransform(x, [0, 50], ["rgba(0,0,0,0)", swipeColor]);

  if (isLoading) {
    x.set(100);
  } else {
    x.set(0);
  }

  return (
    <Swipeable config={swipe} onSwipeRight={onSwipe}>
      <div>
        <DragContainer draggable={isSwipeable} x={x}>
          <Background>{renderOverlay()}</Background>
        </DragContainer>
      </div>
    </Swipeable>
  );
};
