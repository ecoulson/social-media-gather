import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";
import { ReactComponent as UserIcon } from "../../Assets/user.svg";
import { ReactComponent as Check } from "../../Assets/check.svg";
import Cookie from "../../Library/Cookie";
import GetEndpoint from "../../Library/GetEndpoint";

export default function SearchDropdown(props) {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState(null);

  useEffect(() => {
    async function getMe() {
      const response = await Axios.get(`${GetEndpoint()}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${Cookie.getCookie("token")}`,
        },
      });
      setMe(response.data.data.users[0]);
      getUsers();
    }

    async function getUsers() {
      if (props.username.length !== 0) {
        const response = await Axios.get(
          `${GetEndpoint()}/api/search?query=${props.username}`
        );
        setUsers(response.data.data.users.slice(0, 9));
      } else {
        hide();
      }
    }

    getMe();
  }, [props.username]);

  function hide() {
    setUsers([]);
  }

  function onClick(username) {
    return () => {
      if (props.onSelect) {
        props.onSelect();
      }
      search(username);
      hide();
    };
  }

  function search(username) {
    history.push(`/profile/${username}`);
  }

  if (users.length === 0) {
    return null;
  }

  function follow(user) {
    return async (event) => {
      event.stopPropagation();
      me.following.push(user.id);
      setMe(me);
      await Axios.put(`${GetEndpoint()}/api/users/follow/${user.id}`);
      updateFollowedUser(user, true);
    };
  }

  function updateFollowedUser(followedUser, followState) {
    setUsers(
      users.map((user) => {
        if (user.id === followedUser.id) {
          return {
            ...followedUser,
            isFollowing: followState,
          };
        } else {
          return user;
        }
      })
    );
  }

  function unfollow(user) {
    return async (event) => {
      event.stopPropagation();
      me.following.splice(me.following.indexOf(user.id), 1);
      setMe(me);
      await Axios.put(`${GetEndpoint()}/api/users/unfollow/${user.id}`);
      updateFollowedUser(user, false);
    };
  }
  return (
    <div className="search-dropdown">
      <p className="search-dropdown-users">Users</p>
      {users.map((user, i) => {
        return (
          <div
            key={i}
            className="search-dropdown-user-result"
            onClick={onClick(user.username)}
          >
            <span className="search-dropdown-username">
              <UserIcon className="search-dropdown-user-result-icon" />
              {user.username}
            </span>
            {renderFollowing(me, user)}
          </div>
        );
      })}
    </div>
  );

  function renderFollowing(me, user) {
    if (me.following.includes(user.id)) {
      return (
        <span onClick={unfollow(user)} className="search-dropdown-following">
          <Check className="dropdown-check" /> following
        </span>
      );
    }
    return (
      <span onClick={follow(user)} className="search-dropdown-follow">
        +follow
      </span>
    );
  }
}
