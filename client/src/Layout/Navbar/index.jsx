import React from "react";
import { Link } from "react-router-dom";
import FeedLogin from "../../FeedLogin";
import Logo from "../../Logo";
import SearchBar from "../../SearchBar";
import MobileSearchPage from "./MobileSearchPage";
import "./index.css";
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as Search } from "../../Assets/search.svg";
import { ReactComponent as User } from "../../Assets/user.svg";
import Button from "../../Button";
import { useState } from "react";

export default function Navbar() {
    const [showSearch, setShowSearch] = useState(false);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    });

    if (isDesktopOrLaptop) {
        return (
            <div className="navbar-desktop">
                <div className="navbar-desktop-item">
                    <Link to="/"><Logo /></Link>
                </div>
                <div className="navbar-desktop-item">
                    <SearchBar />
                </div>
                <div className="navbar-desktop-item">
                    <FeedLogin />
                </div>
            </div>
        )
    }

    function renderModal() {
        return <MobileSearchPage hide={hide} showing={showSearch} />
    }

    function toggle(event) {
        event.stopPropagation();
        setShowSearch(!showSearch)
    }

    function hide() {
        setShowSearch(false);
    }

    return (
        <>
            {renderModal()}
            <div onClick={hide} className="navbar-mobile">
                <Button onClick={toggle} className="navbar-mobile-item">
                    <Search />
                </Button>
                <Button to="/" id="navbar-mobile-home" className="navbar-mobile-item">
                    <Logo id="navbar-mobile-home-logo" simple />
                </Button>
                <Button to="/me" className="navbar-mobile-item">
                    <User />
                </Button>
            </div>
        </>
    )
}