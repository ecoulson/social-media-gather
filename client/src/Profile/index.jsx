import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import isAuthenticated from "../Auth/IsAuthenticated";
import Button from "../Button";
import FeedFetcher from "../FeedFetcher";
import { ReactComponent as Check } from "../Assets/check.svg";
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
            const response = await Axios.get(`/api/users/get-by-username/${props.match.params.username}`);
            console.log(response.data);
            setUser(response.data);
            // }
        }

        async function isFollowing() {
            const response = await Axios.get(`/api/users/is-following/${props.match.params.username}`);
            setFollowing(response.data.isFollowing);
        }

        checkAuthenticated();
        isFollowing();
    }, [props.match.params.username, history])

    async function follow() {
        await Axios.post(`/api/users/follow/${props.match.params.username}`);
        setFollowing(true);
        followButton.current.blur();
    }

    async function unfollow() {
        await Axios.post(`/api/users/unfollow/${user.username}`);
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
            <FeedFetcher Component={Feed} feedUrl={`/api/users/get-user-posts/${user.username}`} />
        </>
    )
}