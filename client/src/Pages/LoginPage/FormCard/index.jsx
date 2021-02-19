import styled from "@emotion/styled";
import React from "react";
import { ReactComponent as Logo } from "../../../Assets/logo.svg";
import Card from "../../../Components/Card";
import { Center } from "@chakra-ui/react";
import ListAnimationController from "../../../Animations/ListAnimation/ListAnimationController";
import LoginForm from "./LoginForm";

const FormCard = ({ children }) => (
  <Card margin="50px auto" width="300px" height="475px">
    {children}
  </Card>
);

const AppTitle = styled.h1`
  text-align: center;
  margin-bottom: 68px;
  font-size: 60px;
  font-family: "Monoton", cursive;
`;

export default () => {
  return (
    <FormCard>
      <ListAnimationController>
        <Center>
          <Logo style={{ marginTop: 33 }} />
        </Center>
        <AppTitle>Switch</AppTitle>
        <LoginForm />
      </ListAnimationController>
    </FormCard>
  );
};
