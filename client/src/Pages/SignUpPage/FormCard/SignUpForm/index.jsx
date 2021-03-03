import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import SignUpRequest from "../../../../API/SignUpRequest";
import LoginRequest from "../../../../API/LoginRequest";
import { ReactComponent as User } from "../../../../Assets/user.svg";
import { ReactComponent as Password } from "../../../../Assets/password.svg";
import { ReactComponent as Email } from "../../../../Assets/email.svg";
import InputV2 from "../../../../Components/Input";
import Cookie from "../../../../Library/Cookie";
import AuthenticatedToast from "../../Toasts/AuthenticatedToast";
import UsernameTakenToast from "../../Toasts/UsernameTakenToast";
import RequireFieldToast from "../../Toasts/RequireFieldToast";
import MinimumLengthToast from "../../Toasts/MinimumLengthToast";
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

const EmailIcon = styled(Email)`
  width: 24px;
  height: 22px;
  margin-top: -6px;
  color: rgb(32, 30, 30);
`;

export default () => {
  const [currentToast, setCurrentToast] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(true);
  const { register, handleSubmit, watch, errors } = useForm();
  const { username, password, email } = watch([
    "username",
    "password",
    "email",
  ]);
  const history = useHistory();

  const onSubmit = async (formData) => {
    console.log(formData);
    if (!isRegistering) {
      setIsRegistering(true);
      const registerResponse = await SignUpRequest(
        formData.username,
        formData.email,
        formData.password
      );
      if (registerResponse.metadata.success) {
        const loginResponse = await LoginRequest(
          formData.username,
          formData.password
        );
        Cookie.setCookie("token", loginResponse.data.token);
        setCurrentToast(AuthenticatedToast(history));
      } else {
        setRegistrationStatus(false);
        setCurrentToast(
          UsernameTakenToast(() => {
            setIsRegistering(false);
            setRegistrationStatus(true);
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
      if (error.username.type === "required") {
        setCurrentToast(RequireFieldToast("username"));
      } else {
        setCurrentToast(MinimumLengthToast("username", 6));
      }
    } else if (error.email) {
      setCurrentToast(RequireFieldToast("email"));
    } else if (error.password) {
      if (error.password.type === "required") {
        setCurrentToast(RequireFieldToast("password"));
      } else {
        setCurrentToast(MinimumLengthToast("password", 8));
      }
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
          inputRef={register({ required: true, minLength: 6 })}
        />
        <InputV2
          Icon={EmailIcon}
          label="Email"
          name="email"
          type="email"
          inputRef={register({ required: true })}
        />
        <InputV2
          Icon={PasswordIcon}
          label="Password"
          name="password"
          type="password"
          inputRef={register({ required: true, minLength: 8 })}
        />
        <SwipeButton
          isLoading={isRegistering}
          onSwipe={submitHandler}
          didError={!registrationStatus}
          isSwipeable={
            email && username && password && Object.keys(errors).length === 0
          }
          text="Create Account"
        />
      </ListAnimationController>
    </Form>
  );
};
