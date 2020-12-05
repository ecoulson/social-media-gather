import { AspectRatio } from "@chakra-ui/react";
import React from "react";
import Logo from "../../../../Logo";
import NavbarItem from "../NavbarItem/NavbarItem";
import styled from "@emotion/styled";

const LogoContainer = styled(NavbarItem)`
margin-right: 40px;
`

export default function NavbarLogo() {
    return (
        <LogoContainer>
            <AspectRatio flex="1 1 auto" maxW="75px" ratio={1}>
                <Logo simple />
            </AspectRatio>
        </LogoContainer>
    )
}