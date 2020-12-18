import { GridItem } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import AddCreatorButton from "./AddCreatorButton";

const AddCreatorSection = styled(GridItem)`
grid-area: add-creator;
box-sizing: border-box;
`;

export default () => {
    return (
        <AddCreatorSection>
            <AddCreatorButton />
        </AddCreatorSection>
    )
}