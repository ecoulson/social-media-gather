import { AspectRatio } from "@chakra-ui/react";
import React from "react";
import Logo from "../../../../Logo";
import NavbarItem from "../NavbarItem/NavbarItem";

export default function NavbarLogo() {
    return (
        <NavbarItem>
            <AspectRatio flex="1 1 auto" maxW="75px" ratio={1}>
                <Logo simple />
            </AspectRatio>
        </NavbarItem>
    )
}