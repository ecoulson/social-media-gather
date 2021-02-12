import Axios from "axios";

export default async function GetFollowedUsers(followedIds) {
  const responses = await Promise.all(
    followedIds.map((followId) => {
      console.log(followedIds);
      return Axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/users/id/${followId}`
      );
    })
  );
  return responses.map((response) => response.data.data.users[0]);
}
