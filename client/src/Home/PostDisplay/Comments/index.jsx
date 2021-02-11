import React from "react";
import Comment from "./Comment";
import TextDivider from "../../../TextDivider";
import { Text } from "@chakra-ui/react";

export default function Comments({ comments }) {
  const renderComments = () => {
    if (!comments || comments.length == 0) {
      return <Text textAlign="center">No Comments on this post.</Text>;
    }
    return comments.map((comment, i) => <Comment key={i} comment={comment} />);
  };

  return (
    <>
      <TextDivider text="Comments" />
      {renderComments()}
    </>
  );
}
