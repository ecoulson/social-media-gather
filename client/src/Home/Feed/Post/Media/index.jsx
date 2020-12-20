import { Box, Image, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import Instagram from "./Instagram";
import Tweet from "./Tweet";
import Video from "./Video";

const FeedPostBody = styled(Box)`
margin: 15px auto 5px;
grid-area: media;
width: 100%;
`

export default ({ media, type }) => {
    return (
        <FeedPostBody>
            {renderMedia(type)(media)}
        </FeedPostBody>
    )
}

const renderMedia = (type) => {
    switch (type) {
        case "TWITCH_VIDEO":
        case "TWITCH_STREAM":
        case "YOUTUBE_VIDEO":
            return renderVideo;
        case "TWEET":
            return renderTweet;
        case "INSTAGRAM":
            return renderInstagramPost;
    }
}

const renderVideo = ({ live, url, thumbnailUrl }) => {
    return <Video isLive={live} thumbnailUrl={thumbnailUrl} videoUrl={url} />
}

const renderTweet = (media) => {
    return <Tweet media={media} />
}

const renderInstagramPost = (media) => {
    return <Instagram media={media} />
}