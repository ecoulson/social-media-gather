import React from "react";
import { GridItem } from "@chakra-ui/react";
import MediaIcon from "../../../../../MediaIcon";
import styled from "@emotion/styled";

const IconLayout = styled(GridItem)`
grid-area: media-icon;
display: flex;
justify-content: center;
`

export default ({ type }) => {
    return (
        <IconLayout>
            <MediaIcon height={60} width={60} type={type} />
        </IconLayout>
    )
}