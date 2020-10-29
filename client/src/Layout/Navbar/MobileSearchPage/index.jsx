import React from "react";
import SearchBar from "../../../SearchBar";
import "./index.css";

export default function SearchPage(props) {
    function getClass() {
        return props.showing ?
            "mobile-search-page mobile-search-page-active" :
            "mobile-search-page"
    }

    return (
        <div className={getClass()}>
            <span className="mobile-close-model" onClick={props.hide}>X</span>
            <SearchBar onSelect={props.hide} />
        </div>
    )
}