import React from "react";
import Navbar from "./Navbar";
import "./index.css";

export default function Layout(props) {
    return (
        <div className="layout">
            <Navbar />
            {props.children}
        </div>
    )
}