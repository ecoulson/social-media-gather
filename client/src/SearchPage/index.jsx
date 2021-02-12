import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Panel from "../Panel";
import Button from "../Button";
import "./index.css";
import Axios from "axios";
import { ReactComponent as User } from "../Assets/user.svg";
import { ReactComponent as Twitch } from "../Assets/twitch.svg";
import { ReactComponent as Twitter } from "../Assets/twitter.svg";
import { ReactComponent as Youtube } from "../Assets/youtube.svg";
import { ReactComponent as Instagram } from "../Assets/instagram.svg";
import { Link, useLocation } from "react-router-dom";
import GetEndpoint from "../Library/GetEndpoint";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
  const [users, setUsers] = useState([]);
  let query = useQuery();
  const queryString = query.get("query");

  useEffect(() => {
    async function getUsers() {
      const parameters = new URLSearchParams(window.location.search);
      const response = await Axios.get(
        `${GetEndpoint()}/api/search?query=${parameters.get("query")}`
      );
      setUsers(response.data.data.users);
    }

    getUsers();
  }, [queryString]);

  function renderPlatforms(user) {
    const logos = [];
    if (user.twitchId) {
      logos.push(<Twitch />);
    }
    if (user.twitterId) {
      logos.push(<Twitter />);
    }
    if (user.youtubeId) {
      logos.push(<Youtube />);
    }
    if (user.instagramId) {
      logos.push(<Instagram />);
    }
    return logos;
  }

  return (
    <Panel className="search-panel">
      <h1 className="search-panel-title">Results for "{query.get("query")}"</h1>
      <div className="search-panel-missing">
        <span>Can't find who you are looking for?</span>
        <Button to="/add-account">Add Them</Button>
      </div>
      {users.map((user) => {
        return (
          <Link className="search-page-result" to={`/profile/${user.username}`}>
            <User className="search-page-user" />
            <div className="search-page-user-info">
              <h1 className="search-page-user-name">{user.username}</h1>
              <div className="search-page-user-platforms">
                {renderPlatforms(user)}
              </div>
            </div>
          </Link>
        );
      })}
    </Panel>
  );
}
