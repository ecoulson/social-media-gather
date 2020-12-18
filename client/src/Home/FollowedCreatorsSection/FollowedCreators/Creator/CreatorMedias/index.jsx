import React from "react";
import CreatorMediaContainer from "./CreatorMediaContainer";
import MediaIcon from "../../../../../MediaIcon";
import MediaIconType from "../../../../../MediaIcon/Type";

export default function CreatorMedias(props) {
    function renderMedias() {
        let medias = [];
        if (props.user.instagramId) {
            medias.push(<MediaIcon type={MediaIconType.INSTAGRAM} />);
        }
        if (props.user.youtubeId) {
            medias.push(<MediaIcon type={MediaIconType.YOUTUBE} />);
        }
        return medias;
    }

    return (
        <CreatorMediaContainer>
            {renderMedias()}
        </CreatorMediaContainer>
    )
}