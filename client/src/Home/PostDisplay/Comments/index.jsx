import React from "react";
import Comment from "./Comment";
import TextDivider from "../../../TextDivider";

export default function Comments({ comments }) {
  if (!comments) {
    return null;
  }

  return (
    <>
      <TextDivider text="Comments" />
      {comments.map((comment, i) => (
        <Comment key={i} comment={comment} />
      ))}
    </>
  );
}
