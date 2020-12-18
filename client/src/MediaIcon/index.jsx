import React from "react";
import { Icon } from "@chakra-ui/react";
import styled from "@emotion/styled"
import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai"
import MediaIconType from "./Type";
import MediaIconProvider from "./MediaIconProvider";

const MediaIcon = styled(Icon)`
width: ${props => {
    console.log(props); 
    return props.width ? props.width : 26
}}px;
height: ${props => props.height ? props.height : 26}px;
padding: 3px;
border-radius: 100px;
`;

const renderIcon = (type, width, height) => {
    switch (type) {
        case MediaIconType.INSTAGRAM:
            return <MediaIcon height={height} width={width} zIndex="5" as={AiOutlineInstagram} />;
        case MediaIconType.YOUTUBE:
            return <MediaIcon height={height} width={width} zIndex="4" as={AiFillYoutube} />;
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