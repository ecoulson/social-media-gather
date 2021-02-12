import Axios from "axios";
import GetEndpoint from "./GetEndpoint";

export default async function GetUser(id) {
  console.log(id);
  const userResponse = await Axios.get(`${GetEndpoint()}/api/users/id/${id}`);
  return userResponse.data.data.users[0];
}
