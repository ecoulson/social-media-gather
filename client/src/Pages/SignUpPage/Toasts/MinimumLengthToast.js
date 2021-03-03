import { Slide, toast } from "react-toastify";

export default (field, minimumLength) => {
  toast.error(`Your ${field} must be at least ${minimumLength} characters`, {
    toastId: `${field}-required`,
    transition: Slide,
  });
};
