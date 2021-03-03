import { Slide, toast } from "react-toastify";

export default (onClose) => {
  toast.error("Check your username and password", {
    toastId: "invalid-id",
    delay: 500,
    transition: Slide,
    onClose,
  });
};
