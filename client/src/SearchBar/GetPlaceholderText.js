import Axios from "axios";

export default async function getPlaceholderText() {
  const res = await Axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/search/placeholder`
  );
  return res.data.data.users[0].username;
}
