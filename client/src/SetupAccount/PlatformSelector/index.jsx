import React, { useState } from "react";
import { ReactComponent as Twitch } from "../../Assets/twitch.svg";
import { ReactComponent as YouTube } from "../../Assets/youtube.svg";
import { ReactComponent as Twitter } from "../../Assets/twitter.svg";
import "./index.css";

export default function PlatformSelector(props) {
    const [platform, setPlatform] = useState("twitch")

    return (
        <div className="platform-selector">
            <Twitch id="platform-icon-twitch" onClick={handleChange("twitch", setPlatform, props.onPlatformChange)} className={getPlatformClass("twitch", platform)} />
            <YouTube id="platform-icon-youtube" onClick={handleChange("youtube", setPlatform, props.onPlatformChange)} className={getPlatformClass("youtube", platform)} />
            <Twitter id="platform-icon-twitter" onClick={handleChange("twitter", setPlatform, props.onPlatformChange)} className={getPlatformClass("twitter", platform)} />
        </div>
    )
}

function handleChange(platform, setPlatform, changeListener) {
    return () => {
        setPlatform(platform);
        changeListener(platform);
    }
}

function getPlatformClass(platform, activePlatform) {
    return platform === activePlatform ?
        "platform-icon platform-active" :
        "platform-icon"
}