import { Image } from "@chakra-ui/react";
import React from "react";
import Video from "../../Video";

export default ({ mediaItem }) => {
  return mediaItem.type === "IMAGE" ? (
    <Image maxWidth="700px" margin="0 auto" src={mediaItem.url} />
  ) : (
    <Video videoUrl={mediaItem.url} thumbnailUrl={mediaItem.thumbnailUrl} />
  );
};
