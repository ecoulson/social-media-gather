import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function Button(props) {
    function getClass() {
        let className = "button-primary";
        if (props.danger) {
            className += " button-danger"
        }
        className += props.alt ? " button-alt" : "";
        return className + " " + props.className;
    }


    if (props.to) {
        return <Link id={props.id} className={getClass()} to={props.to}>{props.children}</Link>
    }
    return (
        <button 
            disabled={props.disabled} 
            id={props.id}
            ref={props.innerRef}
            onClick={props.onClick} 
            className={getClass()}>
                {props.children}
        </button>
    )
}