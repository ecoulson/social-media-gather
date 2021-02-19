import { Box, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { useRef, useState } from "react";

const InputContainer = styled(Box)`
  width: 275px;
  border-bottom: 1px solid rgb(95, 90, 90);
  margin: 0 auto;
  position: relative;
  transition: 0.5s ease;
  margin-bottom: 33px;
  &:hover {
    border-bottom: 1px solid black;
  }
`;

const InputLabel = styled.label`
  position: absolute;
  color: rgb(95, 90, 90);
  transform: translate(30px, -5px);
  transition: 0.5s ease;
  z-index: -1;
`;

const Input = styled.input`
  margin-left: 10px;
  margin-top: -5px;
  margin-bottom: 5px;
  background-color: transparent;
  width: 100%;
  outline: none;
  transition: 0.5s ease;
`;

export default function InputV2({ label, name, type, inputRef, Icon }) {
  const labelRef = useRef(null);
  const iconRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const setFocusStyle = () => {
    if (labelRef.current && iconRef.current) {
      labelRef.current.style.color = "black";
      iconRef.current.children[0].style.transition = "stroke 0.5s ease";
      iconRef.current.children[0].style.stroke = "black";
    }
  };

  const setBlurStyle = () => {
    if (labelRef.current && iconRef.current) {
      labelRef.current.style.color = "rgb(77, 77, 77)";
      iconRef.current.children[0].style.transition = "stroke 0.s ease";
      iconRef.current.children[0].style.stroke = "rgb(77, 77, 77)";
    }
  };

  const onFocus = () => {
    if (labelRef.current) {
      labelRef.current.style.transform = "translate(0, -30px)";
      setFocused(true);
      setFocusStyle();
    }
  };

  const onBlur = (event) => {
    if (labelRef.current && event.target.value.length === 0) {
      labelRef.current.style.transform = "translate(30px, -5px)";
      setFocused(false);
      setBlurStyle();
    }
  };

  const onHover = () => {
    if (labelRef.current && iconRef.current && !focused) {
      setFocusStyle();
    }
  };

  const onLeave = () => {
    if (labelRef.current && iconRef.current && !focused) {
      setBlurStyle();
    }
  };

  return (
    <InputContainer onMouseEnter={onHover} onMouseLeave={onLeave}>
      <InputLabel ref={labelRef}>{label}</InputLabel>
      <Flex>
        <Icon style={{ stroke: "rgb(77, 77, 77)" }} ref={iconRef} />
        <Input
          type={type}
          onFocus={onFocus}
          onBlur={onBlur}
          name={name}
          ref={inputRef}
        />
      </Flex>
    </InputContainer>
  );
}
