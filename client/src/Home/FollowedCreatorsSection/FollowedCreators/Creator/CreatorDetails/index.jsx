import React from "react";
import CreatorMedias from "../CreatorMedias";
import CreatorDetailsContainer from "./CreatorDetailsContainer";
import CreatorName from "./CreatorName";

export default function CreatorDetails({ user, channels }) {
  return (
    <CreatorDetailsContainer>
      <CreatorName user={user} />
      <CreatorMedias user={user} channels={channels} />
    </CreatorDetailsContainer>
  );
}
