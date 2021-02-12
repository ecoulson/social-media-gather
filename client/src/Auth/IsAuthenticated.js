import Axios from "axios";
import Cookie from "../Library/Cookie";

async function isAuthenticated() {
  try {
    const response = await Axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/api/auth/is-authenticated`,
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
