import React from "react";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import moment from "moment";

const FeedDateText = styled(Text)`
width: 225px;
border-radius: 50px;
border: 1px solid gray;
color: gray;
text-align: center;
position: absolute;
background-color: white;
`;

export default ({ date }) => {
    return <FeedDateText>{moment(date).format('dddd, MMMM Do')}</FeedDateText>
};