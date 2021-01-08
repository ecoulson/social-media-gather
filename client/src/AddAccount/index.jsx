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

    function generatePassword(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    async function onRegister() {
        const userMessage = await Axios.post("/api/auth/register", {
            username: name,
            email: `${name}@unclaimed.account`,
            password: generatePassword(30)
        });
        const user = userMessage.data.data.users[0];
        const registerRequests = [];
        platformIdMap.forEach(async (id, platform) => {
            await Axios.put(`/api/channel/${platform}/link/${id}/with/${user.id}`, {}, {
                headers: {
                    "Authorization": `Bearer ${Cookie.getCookie("token")}`
                }
            });
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