import { Divider } from "@chakra-ui/react";
import React from "react";
import FeedDateContainer from "./FeedDateContainer";
import FeedDateDivider from "./FeedDateDivider";
import FeedDateText from "./FeedDateText";

export default ({ date }) => {
    return (
        <FeedDateContainer>
            <FeedDateDivider />
            <FeedDateText date={date} />
        </FeedDateContainer>
    )
}