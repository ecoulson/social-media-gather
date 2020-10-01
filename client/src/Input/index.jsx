import React from "react";

export function Input(props) {
    return <input placeholder={props.placeholder} onChange={handleChange(props.onChange)} />
}

function handleChange(handler) {
    return (event) => {
        handler(event.target.value);
    }
}