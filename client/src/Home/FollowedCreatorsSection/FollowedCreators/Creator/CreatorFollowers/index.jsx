import { Text } from "@chakra-ui/react";
import React from "react";
import ConvertNumberToPlaces from "../../../../../Library/ConvertNumberToPlaces";

export default function CreatorFollowers({ channels }) {
  const maxSubscribers = Math.max(
    ...channels.map((channel) => channel.subscriberCount)
  );
  return <Text>{ConvertNumberToPlaces(maxSubscribers)}</Text>;
}
