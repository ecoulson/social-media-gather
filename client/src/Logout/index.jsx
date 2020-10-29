import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookie from "../Library/Cookie";

export default function Logout() {
    const history = useHistory();

    useEffect(() => {
        Cookie.eraseCookie("token");
        history.push("/login");
    }, [history]);

    return (
        <div>
            Logging out...
        </div>
    )
}