import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as UserIcon } from "../Assets/user.svg";
import "./index.css";

export default function FeedLogin() {
    return (
        <div className="feed-login">
            <div className="profile-image">
                <UserIcon className="profile-image-avatar-placeholder" />
            </div>
            <div className="profile-dropdown">
                <Link className="profile-dropdown-link" to="/me">Me</Link>
                <Link className="profile-dropdown-link" to="/setup-account">Link Accounts</Link>
                <Link className="profile-dropdown-link" to="/edit-profile">Settings</Link>
                <div className="horizontal-rule"></div>
                <Link className="profile-dropdown-link" to="/logout">Logout</Link>
            </div>
        </div>
    )
}