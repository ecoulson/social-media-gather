import Axios from "axios";
import Cookie from "../../../Library/Cookie";

export default async function GetMe() {
  return (
    await Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/auth/me`, {
      headers: {
        authorization: `Bearer ${Cookie.getCookie("token")}`,
      },
    })
  ).data.data.users[0];
}
