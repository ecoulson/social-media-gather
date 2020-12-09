import Axios from "axios";
import Cookie from "../../../Library/Cookie";

export default async function GetMe() {
    return (await Axios.get("/api/auth/me", {
        headers: {
            authorization: `Bearer ${Cookie.getCookie("token")}`
        }
    })).data;
}