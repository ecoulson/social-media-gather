import API from "./API";
import APIError from "./APIError";

export default async (username, password) => {
  try {
    const response = await API.login({
      password,
      username,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.data;
    } else if (error.request) {
      return new APIError("Invalid request").data();
    } else {
      return new APIError("Something went wrong").data();
    }
  }
};
