import { GridItem, Text } from "@chakra-ui/react"
import React from "react"
import moment from "moment";

export default ({ date }) => {
    return (
        <GridItem gridArea="time">
            <Text>{moment(date).format("h:mm a")}</Text>
        </GridItem>
    )
}