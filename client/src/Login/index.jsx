import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Input } from "../Input";
import Cookie from "../Library/Cookie";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    
    const submit = async () => {
        const response = await Axios.post("/api/auth/login", {
            username,
            password
        });
        if (response.data.token) {
            Cookie.setCookie("token", response.data.token, 10 * 365 * 24 * 60 * 60);
            history.push("/")
        }
    }

    return (
        <div className="login-page">
            <Link to="/register">Signup</Link>
            <Input placeholder="Username..." onChange={setUsername} />
            <Input placeholder="Password..." onChange={setPassword} />
            <button onClick={submit}>Login</button>
        </div>
    )
}