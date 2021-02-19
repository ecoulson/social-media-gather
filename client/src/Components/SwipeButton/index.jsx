import React from "react";
import { Swipeable, defineSwipe } from "react-touch";
import { AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Background from "./Background";
import Overlay from "./Overlay";
import Spinner from "./Spinner";
import DragContainer from "./DragContainer";
import AnimationContainer from "./AnimationContainer";
import Text from "./Text";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import FadeAnimation from "../../Animations/FadeAnimation";

export default ({
  isLoading,
  onSwipe,
  isSwipeable,
  text,
  didError,
  didSucceed,
}) => {
  const getSwipeColor = () => {
    if (!isSwipeable || didError) {
      return "#df4b38";
    }
    return "#60D394";
  };

  const renderContent = () => {
    if (didSucceed) {
      return (
        <FadeAnimation>
          <FiCheckCircle size={40} />
        </FadeAnimation>
      );
    }
    if (didError) {
      return (
        <FadeAnimation>
          <FiXCircle size={40} />
        </FadeAnimation>
      );
    }
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
      <AnimatePresence>
        <Overlay background={swipeBackground}>
          <FadeAnimation>{renderContent()}</FadeAnimation>
        </Overlay>
      </AnimatePresence>
    ) : (
      <AnimatePresence>
        <Overlay background={getSwipeColor()}>
          <FadeAnimation>{renderContent()}</FadeAnimation>
        </Overlay>
      </AnimatePresence>
    );
  };

  const swipe = defineSwipe({ swipeDistance: 100 });
  const x = useMotionValue(0);
  const swipeColor = getSwipeColor();
  const swipeBackground = useTransform(
    x,
    [0, 50],
    ["rgba(0,0,0,0)", swipeColor]
  );

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
