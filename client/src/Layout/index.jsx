import React from "react";
import Navbar from "./Navbar";
import "./index.css";
import { Grid, GridItem } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Body from "./Body";

const GridLayout = styled(Grid)`
grid-template-rows: 75px auto;
max-height: 100vh;
grid-template-areas: 
    "navbar"
    "body";
`;

export default function Layout(props) {
    return (
        <GridLayout>
            <GridItem gridArea="navbar">
                <Navbar />
            </GridItem>
            <Body>
                {props.children}
            </Body>
        </GridLayout>
    )
}