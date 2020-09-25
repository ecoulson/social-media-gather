import React, { useState } from "react";
import AccountSearch from "./AccountSearch";
import PlatformSelector from "./PlatformSelector";
import "./index.css"
import EmailInput from "./EmailInput";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function SignUp() {
    const [platform, setPlatform] = useState("twitch")
    const [platformIdMap, setPlatformIdMap] = useState(new Map());
    const [email, setEmail] = useState("");

    return (
        <div className="sign-up-container">
            <h1 className="sign-up-title">Sign Up</h1>
            <Link className="feed-link" to="/">Feed</Link>
            <EmailInput onChange={setEmail} />
            <button onClick={onRegister(platformIdMap, email)} className="register-button">Register</button>
            <PlatformSelector onPlatformChange={onPlatformChange(setPlatform)} />
            <AccountSearch onAccountSelection={onPlatformIdMap(platform, platformIdMap, setPlatformIdMap)} platform={platform} />
        </div>
    )
}

function onRegister(platformIdMap, email) {
    return async () => {
        const registerUserResponse = await Axios.post("/api/register/", { email })
        const registerRequests = [];
        platformIdMap.forEach((id, platform) => {
            registerRequests.push(Axios.post(`/api/register/${platform}/${registerUserResponse.data._id}`, { id }))
        })
        const registerResponse = await Promise.all(registerRequests);
        console.log(registerResponse.forEach((response) => {console.log(response.data)}));
    }
}

function onPlatformChange(setPlatform) {
    return platform => {
        setPlatform(platform);
    }
}

function onPlatformIdMap(platform, platformIdMap, setPlatformIdMap) {
    return (id) => {
        platformIdMap.set(platform, id);
        setPlatformIdMap(new Map(platformIdMap));
    }
}