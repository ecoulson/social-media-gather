import Axios from "axios";

export default async function getPlaceholderText() {
    const res = await Axios.get("/api/search/placeholder");
    return res.data.username;
}