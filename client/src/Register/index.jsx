import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Input } from "../Input";

export default function Register(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    async function onRegister() {
        const response = await Axios.post("/api/auth/register", {
            username, email, password
        })
        console.log(response.data);
        history.push("/login")
    }

    return (
        <div className="register">
            <Input onChange={setUsername} placeholder="username" />
            <Input onChange={setEmail} placeholder="email" />
            <Input onChange={setPassword} placeholder="password" />
            <button onClick={onRegister}>Register</button>
        </div>
    )
}