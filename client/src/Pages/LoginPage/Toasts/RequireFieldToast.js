import { Slide, toast } from "react-toastify";

export default (field) => {
  toast.error(`Please input a ${field}`, {
    toastId: `${field}-required`,
    transition: Slide,
  });
};
