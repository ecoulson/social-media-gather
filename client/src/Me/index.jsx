import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import isAuthenticated from "../Auth/IsAuthenticated";
import Button from "../Button";
import FeedFetcher from "../FeedFetcher";
import Feed from "../Home/Feed";
import Cookie from "../Library/Cookie";
import Loader from "../Loader";
import Panel from "../Panel";
import "./index.css";

export default function Me() {
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        async function checkAuthenticated() {
            if (!(await isAuthenticated())) {
                history.push('/login')
            } else {
                getMe();
            }
        }


        async function getMe() {
            const response = await Axios.get("/api/auth/me", {
                headers: {
                    authorization: `Bearer ${Cookie.getCookie("token")}`
                }
            })
            setUser(response.data.data.users[0]);
        }

        checkAuthenticated();
    }, [history])

    if (!user) {
        return <Panel><Loader /></Panel>
    }

    return (
        <>
             <Panel className="options-panel">
                 <h1 className="me-username">{user.username}</h1>
                <Button to="/edit-profile">Edit Profile</Button>
                <Button to="/logout">Logout</Button>
            </Panel>
            <FeedFetcher Component={Feed} feedUrl={`/api/feed/${user.id}`} />
        </>
    )
}