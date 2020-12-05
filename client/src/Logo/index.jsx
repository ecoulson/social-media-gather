import { Image } from "@chakra-ui/react";
import React from "react";

export default function Logo(props) {
    if (props.simple && props.white) {
        return <Image alt="logo" id={props.id} className="logo" src="/simple-alt-logo.png" />
    }
    if (props.simple) {
        return <Image alt="logo" id={props.id} className="logo" src="/simple-logo.png" />
    }
    if (props.white) {
        return <Image alt="logo" id={props.id} className="logo" src="/logo-white.png" />
    }
    return <Image alt="logo" id={props.id} className="logo" src="/logo.png" />
}