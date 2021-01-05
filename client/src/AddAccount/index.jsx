import React from "react";
import Panel from "../Panel";
import "./index.css";
import Button from "../Button";
import Input from "../Input";
import PlatformSelector from "../PlatformSelector";
import AccountSearch from "../AccountSearch"
import { useState } from "react";
import Axios from "axios";
import Cookie from "../Library/Cookie";

export default function AddAccount() {
    const [platform, setPlatform] = useState("twitch")
    const [platformIdMap, setPlatformIdMap] = useState(new Map());
    const [name, setName] = useState("");

    async function onRegister() {
        const user = await Axios.post("/api/register", {
            username: name,
            email: `${name}@test.com`
        });
        const registerRequests = [];
        platformIdMap.forEach((id, platform) => {
            registerRequests.push(Axios.post(`/api/register/${platform}/add`, { 
                id,
                userId: user.data._id
            }, {
                headers: {
                    "Authorization": `Bearer ${Cookie.getCookie("token")}`
                }
            }))
        })
        await Promise.all(registerRequests);
    }

    return (
        <Panel className="add-account-panel">
            <h1>Add account</h1>
            <Input value={name} onChange={setName} label="Enter Username" />
            <PlatformSelector platforms={platformIdMap} onPlatformChange={onPlatformChange(setPlatform)} />
            <Button onClick={onRegister} id="register-button">Register Account</Button>
            <AccountSearch onAccountSelection={onPlatformIdMap(platform, platformIdMap, setPlatformIdMap)} platform={platform} />
        </Panel>
    )
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