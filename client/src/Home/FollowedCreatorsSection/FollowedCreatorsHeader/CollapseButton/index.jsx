import { Button, Icon } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { HiLogout } from "react-icons/hi"

const StyledButton = styled(Button)`
position: absolute;
right: 0;
width: 35px;
height: 35px;
`;

const CollapseIcon = styled(Icon)`
width: 25px;
height: 25px;
`;

export default function CollapseButton() {
    return (
        <StyledButton>
            <CollapseIcon as={HiLogout} />
        </StyledButton>
    )
}