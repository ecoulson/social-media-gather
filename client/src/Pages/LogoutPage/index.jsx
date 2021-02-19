import { Center, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "../../Components/Card";
import GradientBackground from "../../Components/GradientBackground";
import Cookie from "../../Library/Cookie";
import { ReactComponent as Logo } from "../../Assets/logo3.svg";
import ListAnimationController from "../../Animations/ListAnimation/ListAnimationController";

const MainCard = ({ children }) => {
  return (
    <Card margin="50px auto" width="300px" height="200px">
      {children}
    </Card>
  );
};

export default () => {
  const history = useHistory();

  useEffect(() => {
    if (Cookie.hasCookie("token")) {
      Cookie.eraseCookie("token");
    }
    history.push("/login");
  });

  return (
    <GradientBackground>
      <MainCard>
        <ListAnimationController>
          <Center marginTop="33px">
            <Logo />
          </Center>
          <Center>
            <Heading marginTop="33px">Logging Out...</Heading>
          </Center>
        </ListAnimationController>
      </MainCard>
    </GradientBackground>
  );
};
