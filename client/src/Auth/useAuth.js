import { useHistory } from "react-router-dom";
import API from "../API/API";
import Cookie from "../Library/Cookie";

export default async () => {
  const history = useHistory();
  if (!Cookie.hasCookie("token")) {
    history.push("login");
  } else {
    const response = await API.isAuthenticated();
    if (!response.metadata.success) {
      history.push("login");
    }
  }
};
