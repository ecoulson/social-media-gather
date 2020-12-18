import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import CollapseIcon from "./CollapseIcon";

const CollapseButton = styled(Button)`
position: absolute;
right: 0;
width: 35px;
height: 35px;
`;

export default () => {
    return (
        <CollapseButton>
            <CollapseIcon />
        </CollapseButton>
    )
}