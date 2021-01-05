import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../Button";
import FeedFetcher from "../FeedFetcher";
import { ReactComponent as Check } from "../Assets/check.svg";
import Cookie from "../Library/Cookie";
import "./index.css";
import { useRef } from "react";
import Panel from "../Panel";
import Feed from "../Home/Feed";

export default function Profile(props) {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false);
    const followButton = useRef(null);
    
    useEffect(() => {
        async function checkAuthenticated() {
            // if (!await isAuthenticated()) {
                // history.push('/')
            // } else {
            const response = await Axios.get(`/api/users/username/${props.match.params.username}`);
            setUser(response.data.data.users[0]);
            // }
        }
        
        async function isFollowing() {
            const response = await Axios.get(`/api/users/is-following/${props.match.params.username}`, {
                headers: {
                    authorization: `Bearer ${Cookie.getCookie("token")}`
                }
            });
            setFollowing(response.data.data.isFollowing);
        }

        checkAuthenticated();
        isFollowing();
    }, [props.match.params.username, history])

    async function follow() {
        await Axios.put(`/api/users/follow/${user.id}`);
        setFollowing(true);
        followButton.current.blur();
    }

    async function unfollow() {
        await Axios.put(`/api/users/unfollow/${user.id}`);
        setFollowing(false);
        followButton.current.blur();
    }

    if (!user) {
        return null;
    }

    function renderFollowButton() {
        if (following) {
            return <Button innerRef={followButton} onClick={unfollow} id="following-button">Following <Check className="following-check" /></Button>;
        }
        return <Button innerRef={followButton} id="follow-button" onClick={follow}>Follow</Button>;
    }
    return (
        <>
            <Panel className="profile-splash-container">
                <h1 className="profile-username">{user.username}</h1>
                {renderFollowButton()}
            </Panel>
            <FeedFetcher Component={Feed} feedUrl={`/api/feed/${user.id}`} />
        </>
    )
}