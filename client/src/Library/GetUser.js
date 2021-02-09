import Axios from "axios";

export default async function GetUser(id) {
  console.log(id);
  const userResponse = await Axios.get(`/api/users/id/${id}`);
  return userResponse.data.data.users[0];
}
