import Axios from "axios";
import Cookie from "../../../Library/Cookie";
import GetEndpoint from "../../../Library/GetEndpoint";

export default async function GetMe() {
  return (
    await Axios.get(`${GetEndpoint()}/api/auth/me`, {
      headers: {
        authorization: `Bearer ${Cookie.getCookie("token")}`,
      },
    })
  ).data.data.users[0];
}
