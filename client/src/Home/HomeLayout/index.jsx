import React from "react";
import { Grid } from "@chakra-ui/react";
import styled from "@emotion/styled";

const GridLayout = styled(Grid)`
max-height: 100%;
grid-template-columns: 25% 50% 25%;
grid-template-areas:
    "followed feed post"
`

export default function HomeLayout(props) {
    return (
        <GridLayout>
            {props.children}
        </GridLayout>
    )
}
