import { GridItem, Text } from "@chakra-ui/react"
import React from "react"
import moment from "moment";
import styled from "@emotion/styled";

const Time = styled(Text)`
font-size: 14px;
`

export default ({ date }) => {
    return (
        <GridItem gridArea="time">
            <Time>{moment(date).format("h:mm a")}</Time>
        </GridItem>
    )
}