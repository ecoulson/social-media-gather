import React from "react";
import { Link } from "@chakra-ui/react";
import NavbarItem from "../NavbarItem/NavbarItem";

export default function NavbarLink(props) {
    return (
        <NavbarItem>
            <Link href={props.to}>{props.children}</Link>
        </NavbarItem>
    )
}