import React, { useState } from "react";
import { ReactComponent as Twitch } from "../../Assets/twitch.svg";
import { ReactComponent as YouTube } from "../../Assets/youtube.svg";
import { ReactComponent as Twitter } from "../../Assets/twitter.svg";
import { ReactComponent as Check } from "../../Assets/check.svg";
import "./index.css";

export default function PlatformSelector(props) {
    console.log(props);
    const [platform, setPlatform] = useState("twitch")

    function renderPlatformUsed(id) {
        if (props.platforms.has(id)) {
            return <Check className="platform-icon-check" />
        }
        return null;
    }

    return (
        <div className="platform-selector">
            <div className="platform-icon-container">
                {renderPlatformUsed("twitch")}
                <Twitch id="platform-icon-twitch" onClick={handleChange("twitch", setPlatform, props.onPlatformChange)} className={getPlatformClass("twitch", platform)} />
            </div>
            <div className="platform-icon-container">
                {renderPlatformUsed("youtube")}
                <YouTube id="platform-icon-youtube" onClick={handleChange("youtube", setPlatform, props.onPlatformChange)} className={getPlatformClass("youtube", platform)} />
            </div>
            <div className="platform-icon-container">
            {renderPlatformUsed("twitter")}
                <Twitter id="platform-icon-twitter" onClick={handleChange("twitter", setPlatform, props.onPlatformChange)} className={getPlatformClass("twitter", platform)} />
            </div>
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