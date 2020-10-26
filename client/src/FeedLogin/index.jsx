import React, { useEffect, useState } from "react";
import isAuthenticated from "../Auth/IsAuthenticated";
import { useHistory } from "react-router-dom";
import Button from "../Button";
import "./index.css";

export default function FeedLogin() {
    const history = useHistory();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuthentication() {
            if (!await isAuthenticated()) {
                history.push("/login")
                setAuthenticated(true)
            }
        }

        checkAuthentication();
    }, [history])

    return (
        <div className="feed-login">
            {authenticated ? 
                <Button to="/login">Login</Button> :
                [
                    <Button key={1} to="/edit-profile">Edit Profile</Button>,
                    <Button key={2} to="/logout">Logout</Button>
                ]
            }
        </div>
    )
}