import Axios from "axios";
import GetEndpoint from "../../../API/GetEndpoint";

export default async function GetFollowedUsers(followedIds) {
  const responses = await Promise.all(
    followedIds.map((followId) => {
      console.log(followedIds);
      return Axios.get(`${GetEndpoint()}/api/users/id/${followId}`);
    })
  );
  return responses.map((response) => response.data.data.users[0]);
}
