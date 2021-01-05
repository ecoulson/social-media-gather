import { Box, Text } from "@chakra-ui/react";
import React from "react";
import TweetMedia from "./TweetMedia";

export default ({ media }) => {
    return (
        <Box>
            <Text>{media.text}</Text>
            {media.content.map(mediaItem => <TweetMedia mediaItem={mediaItem} />)}
        </Box>
    )
}