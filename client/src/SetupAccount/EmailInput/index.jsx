import React from "react";
import "./index.css";

export default function EmailInput() {
    return (
        <div className="email-input-container">
            <label htmlFor="email-input" className="email-input-label">
                Email
            </label>
            <input id="email-input" className="email-input" />
        </div>
    )
}