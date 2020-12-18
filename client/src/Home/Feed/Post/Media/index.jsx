import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import ReactPlayer from "react-player";

const FeedPostBody = styled(Box)`
margin: 15px auto 5px;
grid-area: media;
width: 100%;
`

export default ({ url }) => {
    return (
        <FeedPostBody>
            <ReactPlayer width="100%" height="600px" url={url} controls />
        </FeedPostBody>
    )
}