import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import DateDivider from "./DateDivider";
import Post from "./Post";
import moment from "moment";

const FeedContainer = styled(Flex)`
flex-direction: column;
max-height: calc(100vh - 75px);
border-right: 1px solid black;
overflow-y: scroll;
box-sizing: border-box;
padding-top: 4px;
`;

// const getDateMapping = (posts) => {
//     const map = new Map();
//     posts.forEach(post => {
//         const key = moment(post.publishedAt).format("D/M/YYYY");
//         if (!map.has(key)) {
//             map.set(key, [post])
//         } else {
//             map.get(key).push(post);
//         }
//     });
//     return map;
// }

const renderFeed = (posts) => {
    let currentDate = "";
    return posts.map((post, i) => {
        const newDate = moment(post.publishedAt).format("D/M/YYYY");
        if (newDate !== currentDate) {
            currentDate = newDate;
            return [
                <DateDivider date={post.publishedAt} />,
                <Post key={i} post={post} />
            ]
        } else {
            return <Post key={i} post={post} />
        }
    })
} 

export default ({ posts, scrollRef }) => {
    return (
        <FeedContainer ref={scrollRef}>
            {renderFeed(posts)}
        </FeedContainer>
    )
}
