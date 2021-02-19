import React from "react";
import ActionsCard from "./ActionsCard";
import FormCard from "./FormCard";
import "react-toastify/dist/ReactToastify.css";
import GradientBackground from "../../Components/GradientBackground";
import SlideDownAnimationController from "../../Animations/SlideAnimation/SlideDownAnimationController";
import SlideUpAnimationController from "../../Animations/SlideAnimation/SlideUpAnimationController";

export default () => {
  return (
    <GradientBackground>
      <SlideDownAnimationController>
        <FormCard />
      </SlideDownAnimationController>
      <SlideUpAnimationController>
        <ActionsCard />
      </SlideUpAnimationController>
    </GradientBackground>
  );
};
