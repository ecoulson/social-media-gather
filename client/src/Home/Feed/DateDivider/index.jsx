import React from "react";
import Container from "./Container";
import Divider from "./Divider";
import Text from "./Text";

export default ({ date }) => {
    return (
        <Container>
            <Divider />
            <Text date={date} />
        </Container>
    )
}