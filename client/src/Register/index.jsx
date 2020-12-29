import Axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../Button";
import Form from "../Form";
import Input from "../Input";
import "./index.css";

export default function Register(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    async function onRegister() {
        await Axios.post("/api/auth/register", {
            username, email, password
        })
        history.push("/login")
    }

    return (
        <>
            <h2 className="register-title">Sign Up</h2>
            <Form>
                <Input alt label="username" onChange={setUsername} />
                <Input alt label="email" onChange={setEmail} />
                <Input alt label="password" type="password" onChange={setPassword} />
                <Button id="register-button" alt onClick={onRegister}>Register</Button>
            </Form>
            <p className="register-login-container">
                Already have an account? Click <Link to="/login">here</Link> to login!
            </p>
        </>
    )
}