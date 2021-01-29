import React, { useEffect, useState } from "react";
import GetComments from "../../../Library/GetComments";
import Comment from "./Comment";
import TextDivider from "../../../TextDivider";

export default function Comments({ post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function handleGetComments() {
      const comments = await GetComments(post.id);
      setComments(comments);
    }

    if (post) {
      handleGetComments();
    }
  }, [post]);

  if (!post) {
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
