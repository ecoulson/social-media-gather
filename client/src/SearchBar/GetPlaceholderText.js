import Axios from "axios";
import GetEndpoint from "../Library/GetEndpoint";

export default async function getPlaceholderText() {
  const res = await Axios.get(`${GetEndpoint()}/api/search/placeholder`);
  return res.data.data.users[0].username;
}
