import { Flex } from "@chakra-ui/react";
import React from "react";
import Reaction from "./Reaction";

export default ({ reactions }) => {
    return (
        <Flex>
            {
                reactions.map(({type, value}) => {
                    return <Reaction type={type} value={value} />
                })
            }
        </Flex>
    )
}