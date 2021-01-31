import { Avatar, Spacer } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreatorContainer from "./CreatorContainer";
import CreatorDetails from "./CreatorDetails";
import CreatorFollowers from "./CreatorFollowers";
import GetChannels from "./CreatorMedias/GetChannels";

export default function Creator({ user }) {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    (async () => {
      setChannels(await GetChannels(user.channels));
    })();
  }, [user]);

  return (
    <CreatorContainer href={`/profile/${user.username}`}>
      <Avatar user={user} />
      <CreatorDetails user={user} channels={channels} />
      <Spacer />
      <CreatorFollowers user={user} channels={channels} />
    </CreatorContainer>
  );
}
