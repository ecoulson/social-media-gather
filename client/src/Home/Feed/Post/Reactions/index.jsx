import { Flex } from "@chakra-ui/react";
import React from "react";
import Reaction from "./Reaction";

export default ({ reactions }) => {
    return (
        <Flex>
            {
                reactions.map(({type, value}, i) => {
                    return <Reaction key={i} type={type} value={value} />
                })
            }
        </Flex>
    )
}