import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

const Card = styled(Box)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  box-sizing: border-box;
  position: relative;
  border-radius: 20px;
  background: radial-gradient(
    94.09% 94.09% at 4.34% 4.43%,
    rgba(255, 255, 255, 0.42) 0%,
    rgba(255, 255, 255, 0.06) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  font-family: "Montserrat", sans-serif;
  box-shadow: 0px 10px 40px 2px rgba(18, 17, 17, 0.2);
`;

export default ({ margin, width, height, children }) => {
  return (
    <Card width={width} margin={margin} height={height}>
      {children}
    </Card>
  );
};
