import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

const Title = styled(Text)`
margin: 5px 0;
font-weight: 500;
font-size: 30px;
`;

export default ({ title }) => {
    return <Title>{title}</Title>
}