import React from "react";
import "./index.css";

export default function Logo(props) {
    if (props.simple) {
        return <img alt="logo" id={props.id} className="logo" src="/simple-logo.png" />
    }
    if (props.white) {
        return <img alt="logo" id={props.id} className="logo" src="/logo-white.png" />
    }
    return <img alt="logo" id={props.id} className="logo" src="/logo.png" />
}