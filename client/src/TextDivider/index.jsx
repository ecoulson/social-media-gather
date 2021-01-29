import React from "react";
import Container from "./Container";
import Divider from "./Divider";
import Text from "./Text";

export default ({ text }) => {
    return (
        <Container>
            <Divider />
            <Text text={text} />
        </Container>
    )
}