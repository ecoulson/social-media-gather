import { Box, Text } from "@chakra-ui/react";
import React from "react";
import InstagramMedia from "./InstagramMedia";

export default ({ media }) => {
    return (
        <Box>
            {media.content.map(mediaItem => <InstagramMedia thumbnail={media.thumbnail} mediaItem={mediaItem} />)}
            <Text>{media.caption}</Text>
        </Box>
    )
}