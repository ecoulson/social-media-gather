import React from "react";
import "./index.css";

export default function Account(props) {
  function handleClick() {
    props.onClick({
      platformId: props.id,
      username: props.username,
      subscriberCount: props.subscriberCount,
    });
  }

  return (
    <div onClick={handleClick} className="account-search-result">
      <img
        alt="avatar"
        className="account-search-profile-image"
        src={props.profilePicture}
      />
      <span className="account-search-profile-username">{props.username}</span>
    </div>
  );
}
