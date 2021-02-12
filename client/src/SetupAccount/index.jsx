import React, { useEffect, useState } from "react";
import AccountSearch from "../AccountSearch";
import PlatformSelector from "../PlatformSelector";
import "./index.css";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Cookie from "../Library/Cookie";
import isAuthenticated from "../Auth/IsAuthenticated";
import Panel from "../Panel";
import Button from "../Button";
import GetEndpoint from "../Library/GetEndpoint";

export default function SignUp() {
  const [platform, setPlatform] = useState("twitch");
  const [platformChannelMap, setPlatformChannelMap] = useState(new Map());
  const history = useHistory();

  useEffect(() => {
    async function checkAuthentication() {
      if (!(await isAuthenticated())) {
        history.push("/login");
      }
    }
    checkAuthentication();
  });

  return (
    <Panel className="sign-up-container">
      <Button onClick={onRegister(platformChannelMap)} id="register-button">
        Register
      </Button>
      <PlatformSelector
        platforms={platformChannelMap}
        onPlatformChange={onPlatformChange(setPlatform)}
      />
      <AccountSearch
        onAccountSelection={onPlatformIdMap(
          platform,
          platformChannelMap,
          setPlatformChannelMap
        )}
        platform={platform}
      />
    </Panel>
  );
}

function onRegister(platformChannelMap) {
  return async () => {
    const registerRequests = [];
    platformChannelMap.forEach((id, platform) => {
      registerRequests.push(
        Axios.put(
          `${GetEndpoint()}/api/channel/${platform}/link/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${Cookie.getCookie("token")}`,
            },
          }
        )
      );
    });
    await Promise.all(registerRequests);
  };
}

function onPlatformChange(setPlatform) {
  return (platform) => {
    setPlatform(platform);
  };
}

function onPlatformIdMap(platform, platformIdMap, setPlatformChannelMap) {
  return (channel) => {
    platformIdMap.set(platform, channel);
    setPlatformChannelMap(new Map(platformIdMap));
  };
}
