import React from "react";
import CreatorMedias from "../CreatorMedias";
import CreatorDetailsContainer from "./CreatorDetailsContainer";
import CreatorName from "./CreatorName";

export default function CreatorDetails({ user }) {
    return (
        <CreatorDetailsContainer>
            <CreatorName user={user} />
            <CreatorMedias user={user} />
        </CreatorDetailsContainer>
    )
}