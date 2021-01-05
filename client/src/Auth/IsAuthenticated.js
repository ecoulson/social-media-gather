import Axios from "axios";
import Cookie from "../Library/Cookie";

async function isAuthenticated() {
    const response = await Axios.get("/api/auth/is-authenticated", {
        headers: {
            "Authorization": `Bearer ${Cookie.getCookie("token")}`
        }
    })
    return response.data.data.isAuthenticated;
}

export default isAuthenticated;