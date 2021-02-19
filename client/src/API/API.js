import APIRequest from "./APIRequest";

const makeAPIRequst = (url, method) => {
  const request = new APIRequest(url);
  return request[method.toLowerCase()].bind(request);
};

export default {
  login: makeAPIRequst("auth/login", "POST"),
};
