import React from "react";
import { Icon } from "@chakra-ui/react";
import styled from "@emotion/styled"
import { AiFillYoutube, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai"
import MediaIconType from "./Type";
import MediaIconProvider from "./MediaIconProvider";
import { FaTwitch } from "react-icons/fa";

const MediaIcon = styled(Icon)`
width: ${props => props.width ? props.width : 26}px;
height: ${props => props.height ? props.height : 26}px;
padding: 5px;
border-radius: 100px;
`;

const renderIcon = (type, width, height) => {
    switch (type) {
        case MediaIconType.INSTAGRAM:
            return <MediaIcon height={height} width={width} zIndex="5" as={AiOutlineInstagram} />;
        case MediaIconType.YOUTUBE:
            return <MediaIcon height={height} width={width} zIndex="4" as={AiFillYoutube} />;
        case MediaIconType.TWITCH:
            return <MediaIcon height={height} width={width} zIndex="3" as={FaTwitch} />
        case MediaIconType.TWITTER:
            return <MediaIcon height={height} width={width} zIndex="2" as={AiOutlineTwitter} />
        default:
            return null;
    }
}

export default ({ type, width, height }) => {
    return (
        <MediaIconProvider type={type}>
            {renderIcon(type, width, height)}
        </MediaIconProvider>
    )
}