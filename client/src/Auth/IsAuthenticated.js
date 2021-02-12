import Axios from "axios";
import Cookie from "../Library/Cookie";
import GetEndpoint from "../Library/GetEndpoint";

async function isAuthenticated() {
  try {
    const response = await Axios.get(
      `${GetEndpoint()}/api/auth/is-authenticated`,
      {
        headers: {
          Authorization: `Bearer ${Cookie.getCookie("token")}`,
        },
      }
    );
    return response.data.data.isAuthenticated;
  } catch (error) {
    return false;
  }
}

export default isAuthenticated;
