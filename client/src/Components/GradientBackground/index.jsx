import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

const Background = styled(Box)`
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  /* background: linear-gradient(180deg, rgb(233, 215, 255) 0%, #ffdfc9 100%); */
  background: linear-gradient(167.95deg, rgb(233, 215, 255) 0%, rgb(202, 240, 206) 100%);
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
`;

export default function LoginBackground({ children }) {
  return <Background>{children}</Background>;
}
