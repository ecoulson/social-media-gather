import { Badge, Box, Flex, Icon } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

const Overlay = styled(Box)`
  width: 100%;
  max-width: 100%;
  height: 500px;
  background-image: url("${(props) => props.thumbnail}");
  position: relative;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Shadow = styled(Flex)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;

const Live = styled(Badge)`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export default ({ onClick, thumbnailUrl, isLive }) => {
  const [isVisible, toggleVisible] = useState(true);
  const closeOverlay = () => {
    onClick();
    toggleVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Overlay thumbnail={thumbnailUrl} onClick={closeOverlay}>
      {isLive ? <Live>Live</Live> : null}
      <Shadow>
        <IconContext.Provider value={{ color: "white" }}>
          <Icon width={75} height={75} as={AiFillPlayCircle} />
        </IconContext.Provider>
      </Shadow>
    </Overlay>
  );
};
