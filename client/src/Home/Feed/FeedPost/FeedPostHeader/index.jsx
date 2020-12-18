import React from "react";
import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import MediaIcon from "../../../../MediaIcon";
import MediaIconType from "../../../../MediaIcon/Type";

const FeedPostHeading = styled(Flex)`

`;

export default () => {
    return (
        <FeedPostHeading>
            <MediaIcon height={50} width={50} type={MediaIconType.INSTAGRAM} />
        </FeedPostHeading>
    )
};