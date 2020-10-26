import React from "react";
import "./index.css";

export default function Form(props) {
    function onSubmit(event) {
        event.preventDefault();
        if (props.onSubmit) {
            props.onSubmit(event);
        }
    }

    return (
        <form id={props.id} className="default-form" onSubmit={onSubmit}>
            {props.children}
        </form>
    )
}