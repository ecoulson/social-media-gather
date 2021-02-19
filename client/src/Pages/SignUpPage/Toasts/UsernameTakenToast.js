import { Slide, toast } from "react-toastify";

export default (onClose) => {
  toast.error("This username has already been taken!", {
    toastId: "username-taken",
    delay: 2000,
    transition: Slide,
    onClose,
  });
};
