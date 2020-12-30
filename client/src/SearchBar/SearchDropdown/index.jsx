import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";
import { ReactComponent as UserIcon } from "../../Assets/user.svg";
import { ReactComponent as Check } from "../../Assets/check.svg";

export default function SearchDropdown(props) {
    const history = useHistory();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            if (props.username.length !== 0) {
                const response = await Axios.get(`/api/search?query=${props.username}`);
                setUsers(response.data.data.users.slice(0, 9));
            } else {
                hide();
            }
        }

        getUsers();
    }, [props.username])

    function hide() {
        setUsers([])
    }

    function onClick(username) {
        return () => {
            if (props.onSelect) {
                props.onSelect();
            }
            search(username)
            hide();
        }
    }

    function search(username) {
        history.push(`/profile/${username}`)
    }

    if (users.length === 0) {
        return null;
    }

    function follow(user) {
        return async (event) => {
            event.stopPropagation();
            await Axios.post(`/api/users/follow/${user.username}`);
            updateFollowedUser(user, true);
        }
    }

    function updateFollowedUser(followedUser, followState) {
        setUsers(users.map((user) => {
            if (user.id === followedUser.id) {
                return {
                    ...followedUser,
                    following: followState
                }
            } else {
                return user;
            }
        }))
    }

    function unfollow(user) {
        return async (event) => {
            event.stopPropagation();
            await Axios.post(`/api/users/unfollow/${user.username}`);
            updateFollowedUser(user, false);
        }
    }

    return (
        <div className="search-dropdown">
            <p className="search-dropdown-users">Users</p>
            {users.map((user, i) => {
                return (
                    <div key={i} className="search-dropdown-user-result" onClick={onClick(user.username)}>
                        <span className="search-dropdown-username">
                            <UserIcon className="search-dropdown-user-result-icon" />
                            {user.username}
                        </span>
                        {renderFollowing(user)}
                    </div>
                )
            })}
        </div>
    )

    function renderFollowing(user) {
        if (user.following) {
            return <span onClick={unfollow(user)} className="search-dropdown-following"><Check className="dropdown-check" /> following</span>
        }
        return <span onClick={follow(user)} className="search-dropdown-follow">+follow</span>;
    }
}  