import React, { useEffect, useState } from "react";
import AccountSearch from "../AccountSearch";
import PlatformSelector from "../PlatformSelector";
import "./index.css"
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Cookie from "../Library/Cookie";
import isAuthenticated from "../Auth/IsAuthenticated";
import Panel from "../Panel";
import Button from "../Button";

export default function SignUp() {
    const [platform, setPlatform] = useState("twitch")
    const [platformIdMap, setPlatformIdMap] = useState(new Map());
    const history = useHistory();

    useEffect(() => {
        async function checkAuthentication() {
            if (!await isAuthenticated()) {
                history.push('/login')
            }
        }
        checkAuthentication();
    })

    return (
        <Panel className="sign-up-container">
            <Button onClick={onRegister(platformIdMap)} id="register-button">Register</Button>
            <PlatformSelector platforms={platformIdMap} onPlatformChange={onPlatformChange(setPlatform)} />
            <AccountSearch onAccountSelection={onPlatformIdMap(platform, platformIdMap, setPlatformIdMap)} platform={platform} />
        </Panel>
    )
}

function onRegister(platformIdMap) {
    return async () => {
        const registerRequests = [];
        platformIdMap.forEach((id, platform) => {
            registerRequests.push(Axios.post(`/api/register/${platform}/`, { id }, {
                headers: {
                    "Authorization": `Bearer ${Cookie.getCookie("token")}`
                }
            }))
        })
        const registerResponse = await Promise.all(registerRequests);
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