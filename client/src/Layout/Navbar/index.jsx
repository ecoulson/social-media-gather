import React from "react";
import { Link } from "react-router-dom";
import FeedLogin from "../../FeedLogin";
import Logo from "../../Logo";
import SearchBar from "../../SearchBar";
import "./index.css";

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-item">
                <Link to="/"><Logo /></Link>
            </div>
            <div className="navbar-item">
                <SearchBar />
            </div>
            <div className="navbar-item">
                <FeedLogin />
            </div>
        </div>
    )
}