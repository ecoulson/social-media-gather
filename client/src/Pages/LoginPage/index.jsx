import React from "react";
import LoginBackground from "./LoginBackground";
import ActionsCard from "./ActionsCard";
import FormCard from "./FormCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  return (
    <LoginBackground>
      <ToastContainer limit={1} position="top-center" />
      <FormCard />
      <ActionsCard />
    </LoginBackground>
  );
}
