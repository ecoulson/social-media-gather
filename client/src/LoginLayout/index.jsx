import React from "react";
import "./index.css";
import Logo from "../Logo";

export default function LoginLayout(props) {
    return (
        <div className="login-layout">
            <div className="login-layout-container">
                <div className="login-container">
                    <Logo white id="login-logo" />
                    <hr width="90%"></hr>
                    {props.children}
                </div>
            </div>
        </div>
    )
}