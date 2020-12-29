import Axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../Button";
import Form from "../Form";
import Input from "../Input";
import Cookie from "../Library/Cookie";
import "./index.css"

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    
    const submit = async (event) => {
        event.preventDefault();
        const response = await Axios.post("/api/auth/login", {
            username,
            password
        });
        if (response.data.data.token) {
            Cookie.setCookie("token", response.data.data.token, 10 * 365 * 24 * 60 * 60);
            history.push("/")
        }
    }

    return (
        <>
            <h2 className="login-title">Login</h2>
            <Form id="login-form" onSubmit={submit}>
                <Input alt label="username" id="login-username" onChange={setUsername} />
                <Input alt label="password" id="login-password" type="password" onChange={setPassword} />
                <Button id="login-button" type="submit" alt>Login</Button>
            </Form>
            <p className="login-register-container">
                Don't have an account yet? Click <Link to="/register">here</Link> to sign up!
            </p>
        </>
    )
}