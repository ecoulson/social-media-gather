import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import Card from "../../../Components/Card";
import ItemAnimationController from "../../../Animations/ListAnimation/ItemAnimationController";
import ListAnimationController from "../../../Animations/ListAnimation/ListAnimationController";

const ActionsCard = ({ children }) => (
  <Card margin="25px auto" width="300px" height="60px">
    {children}
  </Card>
);

const ActionLink = styled(Link)`
  color: #1b98e0;
  transition: 0.1s ease;
  &:hover {
    font-weight: 600;
  }
`;

const ActionFlex = styled(Flex)`
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  height: 100%;
`;

export default () => (
  <ActionsCard>
    <ListAnimationController autoWrapChildren={false}>
      <ActionFlex>
        <ItemAnimationController>
          <ActionLink to="/login">Sign In</ActionLink>
        </ItemAnimationController>
      </ActionFlex>
    </ListAnimationController>
  </ActionsCard>
);
