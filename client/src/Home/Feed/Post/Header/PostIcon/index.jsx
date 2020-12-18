import React from "react";
import { GridItem } from "@chakra-ui/react";
import MediaIcon from "../../../../../MediaIcon";
import styled from "@emotion/styled";

const IconSize = 50;

const IconLayout = styled(GridItem)`
grid-area: media-icon;
display: flex;
justify-content: center;
`

export default ({ type }) => {
    return (
        <IconLayout>
            <MediaIcon height={IconSize} width={IconSize} type={type} />
        </IconLayout>
    )
}