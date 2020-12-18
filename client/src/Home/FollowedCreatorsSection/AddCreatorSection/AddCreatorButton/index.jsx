import { Button, Icon, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { FaPlus } from 'react-icons/fa';

const AddCreatorButton = styled(Button)`
width: 100%;
padding: 30px 5px;
background-color: white;
border: 1px solid black;
position: relative;
border-radius: 10px;
`;

const PlusIcon = styled(Icon)`
width: 30px;
height: 30px;
position: absolute;
left: 25px;
`

export default () => {
    return (
        <AddCreatorButton>
            <PlusIcon as={FaPlus} />
            <Text>Add your favorite creator!</Text>
        </AddCreatorButton>
    )
}