import Axios from "axios";

export default async function GetUser(id) {
  console.log(id);
  const userResponse = await Axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/users/id/${id}`
  );
  return userResponse.data.data.users[0];
}
