import React from "react";
import "./index.css";

export default function Account(props) {
    return (
        <div onClick={handleClick(props.onClick, props.id)} className="account-search-result">
            <img className="account-search-profile-image" src={props.profilePicture} />
            <span className="account-search-profile-username">{props.username}</span>
        </div>
    )
}

function handleClick(onClick, id) {
    return () => {
        onClick(id)
    }
}