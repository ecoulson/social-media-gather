import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import LoginRequest from "../../../../API/LoginRequest";
import { ReactComponent as User } from "../../../../Assets/user.svg";
import { ReactComponent as Password } from "../../../../Assets/password.svg";
import InputV2 from "../../../../Components/Input";
import Cookie from "../../../../Library/Cookie";
import AuthenticatedToast from "../../Toasts/AuthenticatedToast";
import IllegalCredentialsToast from "../../Toasts/IllegalCredentialsToast";
import RequireFieldToast from "../../Toasts/RequireFieldToast";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import debounce from "../../../../Library/debounce";
import Form from "../../../../Components/Form";
import SwipeButton from "../../../../Components/SwipeButton";
import ListAnimationController from "../../../../Animations/ListAnimation/ListAnimationController";

const UserIcon = styled(User)`
  width: 22px;
  height: 22px;
  margin-top: -5px;
  color: rgb(32, 30, 30);
`;

const PasswordIcon = styled(Password)`
  width: 24px;
  height: 22px;
  margin-top: -6px;
  color: rgb(32, 30, 30);
`;

export default () => {
  const [currentToast, setCurrentToast] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState(true);
  const { register, handleSubmit, watch } = useForm();
  const { username, password } = watch(["username", "password"]);
  const history = useHistory();

  const onSubmit = async (formData) => {
    if (!isLoggingIn) {
      setIsLoggingIn(true);
      const loginResponse = await LoginRequest(
        formData.username,
        formData.password
      );
      if (loginResponse.metadata.success) {
        Cookie.setCookie("token", loginResponse.data.token);
        setCurrentToast(AuthenticatedToast(history));
      } else {
        setLoginStatus(false);
        setCurrentToast(
          IllegalCredentialsToast(() => {
            setIsLoggingIn(false);
            setLoginStatus(true);
          })
        );
      }
    }
  };

  const onError = (error) => {
    if (currentToast) {
      toast.dismiss(currentToast);
    }
    if (error.username) {
      setCurrentToast(RequireFieldToast("username"));
    } else if (error.password) {
      setCurrentToast(RequireFieldToast("password"));
    }
  };

  const submitHandler = debounce(handleSubmit(onSubmit, onError), 500);

  return (
    <Form onSubmit={submitHandler}>
      <ListAnimationController>
        <InputV2
          Icon={UserIcon}
          label="Username"
          name="username"
          type="text"
          inputRef={register({ required: true })}
        />
        <InputV2
          Icon={PasswordIcon}
          label="Password"
          name="password"
          type="password"
          inputRef={register({ required: true })}
        />
        <SwipeButton
          isLoading={isLoggingIn}
          onSwipe={submitHandler}
          didError={!loginStatus}
          isSwipeable={username && password}
          text="Sign In"
        />
      </ListAnimationController>
    </Form>
  );
};
