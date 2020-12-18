import React from "react";
import Author from "./Author";
import Time from "./Time";
import MoreIcon from "./MoreIcon";
import PostIcon from "./PostIcon";
import MediaIconType from "../../../../MediaIcon/Type";
import Layout from "./Layout";

export default () => {
    return (
        <Layout>
            <PostIcon type={MediaIconType.YOUTUBE} />
            <Author author="FNG" />
            <Time date={Date.now()} />
            <MoreIcon />
        </Layout>
    )
};