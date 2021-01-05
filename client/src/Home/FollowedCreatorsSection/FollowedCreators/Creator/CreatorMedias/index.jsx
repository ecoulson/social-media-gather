import React from "react";
import CreatorMediaContainer from "./CreatorMediaContainer";
import MediaIcon from "../../../../../MediaIcon";
import MediaIconType from "../../../../../MediaIcon/Type";

export default function CreatorMedias(props) {
    function renderMedias() {
        let medias = [];
        if (props.user.instagramId) {
            medias.push(<MediaIcon key={1} type={MediaIconType.INSTAGRAM} />);
        }
        if (props.user.youtubeId) {
            medias.push(<MediaIcon key={2} type={MediaIconType.YOUTUBE} />);
        }
        if (props.user.twitchId) {
            medias.push(<MediaIcon key={3} type={MediaIconType.TWITCH} />)
        }
        if (props.user.twitterId) {
            medias.push(<MediaIcon key={4} type={MediaIconType.TWITTER} />)
        }
        return medias;
    }

    return (
        <CreatorMediaContainer>
            {renderMedias()}
        </CreatorMediaContainer>
    )
}