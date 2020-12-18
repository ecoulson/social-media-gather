import { Icon } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { HiLogout } from "react-icons/hi";

const CollapseIcon = styled(Icon)`
width: 25px;
height: 25px;
`;

export default () => {
    return (
        <CollapseIcon as={HiLogout} />
    )
}