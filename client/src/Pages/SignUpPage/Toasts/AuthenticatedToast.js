import { Slide, toast } from "react-toastify";

export default (history) => {
  toast.success("Your account has been created! Taking you to your feed", {
    delay: 500,
    autoClose: 2500,
    toastId: "successful-login",
    transition: Slide,
    onClose: () => history.push("/feed"),
  });
};
