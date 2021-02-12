import React from "react";
import Panel from "../Panel";
import "./index.css";
import Button from "../Button";
import Input from "../Input";
import PlatformSelector from "../PlatformSelector";
import AccountSearch from "../AccountSearch";
import { useState } from "react";
import Axios from "axios";

export default function AddAccount() {
  const [platform, setPlatform] = useState("twitch");
  const [platformIdMap, setPlatformIdMap] = useState(new Map());
  const [name, setName] = useState("");

  function generatePassword(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async function onRegister() {
    await Axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/creator/`, {
      channels: getChannels(),
      username: name,
      email: `${name}@unclaimed.account`,
      password: generatePassword(30),
      verified: false,
    });
  }

  function getChannels() {
    const channels = [];
    platformIdMap.forEach((channel, platform) => {
      channels.push({
        name: channel.username,
        subscriberCount: channel.subscriberCount,
        platform: platform.toUpperCase(),
        platformId: channel.platformId,
      });
    });
    return channels;
  }

  return (
    <Panel className="add-account-panel">
      <h1>Add account</h1>
      <Input value={name} onChange={setName} label="Pipe Username" />
      <Button onClick={onRegister} id="register-button">
        Register Account
      </Button>
      <h1>Link account</h1>
      <PlatformSelector
        platforms={platformIdMap}
        onPlatformChange={onPlatformChange(setPlatform)}
      />
      <AccountSearch
        onAccountSelection={onPlatformIdMap(
          platform,
          platformIdMap,
          setPlatformIdMap
        )}
        platform={platform}
      />
    </Panel>
  );
}

function onPlatformChange(setPlatform) {
  return (platform) => {
    setPlatform(platform);
  };
}

function onPlatformIdMap(platform, platformChannelMap, setPlatformIdMap) {
  return (channel) => {
    platformChannelMap.set(platform, channel);
    setPlatformIdMap(new Map(platformChannelMap));
  };
}
