import { Flex, Icon } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { AiFillYoutube, AiOutlineInstagram } from "react-icons/ai"
import { IconContext } from "react-icons";

const MediaIcon = styled(Icon)`
width: 26px;
height: 26px;
margin-left: -8px;
padding: 3px;
border-radius: 100px;
`;

const CreatorMedia = styled(Flex)`
margin-left: 10px;
`

export default function CreatorMedias(props) {
    function renderMedias() {
        let medias = [];
        if (props.user.instagramId) {
            medias.push(
                <IconContext.Provider value={{style: {
                    fill: "white",
                    background: "linear-gradient(45deg, rgba(9,198,17,1) 0%, rgba(209,121,23,1) 50%, rgba(139,0,255,1) 100%)"
                }}}>
                    <MediaIcon zIndex="5" as={AiOutlineInstagram} />
                </IconContext.Provider>
            );
        }
        if (props.user.youtubeId) {
            medias.push(
                <IconContext.Provider value={{style: {
                    fill: "white",
                    background: "red"
                }}}>
                    <MediaIcon zIndex="4" as={AiFillYoutube} />
                </IconContext.Provider>
            );
        }
        return medias;
    }

    return (
        <CreatorMedia>
            {renderMedias()}
        </CreatorMedia>
    )
}