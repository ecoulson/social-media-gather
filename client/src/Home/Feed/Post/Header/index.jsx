import React from "react";
import Author from "./Author";
import Time from "./Time";
import MoreIcon from "./MoreIcon";
import PostIcon from "./PostIcon";
import MediaIconType from "../../../../MediaIcon/Type";
import Layout from "./Layout";

export default ({ date, type, author }) => {
    return (
        <Layout>
            <PostIcon type={getIconType(type)} />
            <Author author={author} />
            <Time date={date} />
            <MoreIcon />
        </Layout>
    )
};

const getIconType = type => {
    switch (type) {
        case "YOUTUBE_VIDEO":
            return MediaIconType.YOUTUBE;
        case "TWITCH_VIDEO":
        case "TWITCH_STREAM":
            return MediaIconType.TWITCH;
        case "TWEET":
            return MediaIconType.TWITTER;
        case "INSTAGRAM":
            return MediaIconType.INSTAGRAM;
        default:
            return null;
    }
}