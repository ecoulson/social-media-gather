import Axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../Button";
import Loader from "../Loader";
import Input from "../Input";
import Cookie from "../Library/Cookie";
import Panel from "../Panel";
import "./index.css";
import GetEndpoint from "../Library/GetEndpoint";

export default function EditProfile() {
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getMe() {
      const response = await Axios.get(`${GetEndpoint()}/api/auth/me`, {
        headers: {
          authorization: `Bearer ${Cookie.getCookie("token")}`,
        },
      });
      setUser(response.data);
      setEmail(response.data.email);
    }

    getMe();
  }, []);

  async function deleteProfile() {
    await Axios.delete(`${GetEndpoint()}/api/users/delete`, {
      headers: {
        authorization: `Bearer ${Cookie.getCookie("token")}`,
      },
    });
  }

  async function updateProfile() {
    await Axios.put(
      `${GetEndpoint()}/api/users/update`,
      {
        email: email,
      },
      {
        headers: {
          authorization: `Bearer ${Cookie.getCookie("token")}`,
        },
      }
    );
  }

  function renderPanel() {
    if (!user) {
      return <Loader />;
    }
    return (
      <>
        <h1 className="edit-profile-heading">Edit Profile</h1>
        <h2 className="edit-profile-heading">Update Contact Information</h2>
        <Input type="email" value={email} onChange={setEmail} label="email" />
        <Button onClick={updateProfile} id="update-profile">
          Update Profile
        </Button>
        <h2 className="edit-profile-heading">Delete Your Account</h2>
        <Button danger id="delete-profile" onClick={deleteProfile}>
          Delete Profile
        </Button>
      </>
    );
  }

  return (
    <>
      <Panel className="edit-profile-panel">{renderPanel()}</Panel>
    </>
  );
}
