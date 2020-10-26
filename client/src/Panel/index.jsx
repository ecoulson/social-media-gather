import React from "react";
import "./index.css";

export default function Panel(props) {
    return (
        <div className={`panel ${props.className}`}>
            {props.children}
        </div>
    )
}