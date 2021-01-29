import Axios from "axios";

export default async function GetComments(postId, offset) {
  const response = await Axios.get(
    `/api/comments/youtube/${postId}?offset=${offset}`
  );
  return response.data.data.comments;
}
