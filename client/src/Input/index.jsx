import React from "react";
import { useRef } from "react";
import "./index.css";

export function Input(props) {
    const containerRef = useRef();

    if (props.value && props.value.length > 0 && containerRef.current) {
        containerRef.current.querySelector("label").classList.add(getLabelFilledClass());
    }
    
    const customInput = (   
        <input 
            className={props.className ? props.className : "input-primary"}
            type={props.type}
            onBlur={props.label ? handleBlur : undefined}
            onFocus={props.label ? handleFocus : undefined}
            id={props.id ? props.id : "default-input"}
            autoComplete="off"
            value={props.value ? props.value : undefined}
            onChange={handleChange(props.onChange)} />
    );

    function handleBlur(event) {
        const parent = event.target.parentNode;
        const label = parent.querySelector("label");
        const input = parent.querySelector("input");
        if (input.value.length) {
            label.classList.add(getLabelFilledClass());
        } else {
            label.classList.remove(getLabelFilledClass());
        }
    }

    function handleFocus(event) {
        const parent = event.target.parentNode;
        const label = parent.querySelector("label");
        if (label && !label.classList.contains(getLabelFilledClass())) {
            label.classList.add(getLabelFilledClass());
        }
    }

    function getLabelFilledClass() {
        return props.alt ? "label-primary-alt-filled" : "label-primary-filled";
    }

    if (props.label) {
        return (
            <div ref={containerRef} className="input-container">
                <label htmlFor={props.id} className="label-primary">
                    {props.label}
                </label>
                {customInput}
            </div>
        )
    }

    return customInput;
}

function handleChange(handler) {
    return (event) => {
        handler(event.target.value);
    }
}