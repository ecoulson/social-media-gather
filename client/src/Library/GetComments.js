import Axios from "axios";
import GetEndpoint from "./GetEndpoint";

export default async function GetComments(postId, type, offset) {
  if (type) {
    const response = await Axios.get(
      `${GetEndpoint()}/api/comments/${getType(
        type
      )}/${postId}?offset=${offset}`
    );
    return response.data.data.comments;
  }
  return [];
}

function getType(type) {
  switch (type) {
    case "INSTAGRAM_POST":
      return "instagram";
    case "YOUTUBE_VIDEO":
      return "youtube";
    case "TWEET":
      return "twitter";
    default:
      return "fail";
  }
}
