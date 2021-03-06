import { Image } from "@chakra-ui/react";
import React from "react";
import Video from "../../Video"

export default ({ mediaItem, thumbnail }) => {
    return mediaItem.type === "VIDEO" ?
        <Video thumbnailUrl={thumbnail.url} videoUrl={mediaItem.url} /> :
        <Image margin="0 auto" maxWidth="700px" src={mediaItem.url} />
}