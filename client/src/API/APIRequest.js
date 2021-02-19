import Axios from "axios";
import GetEndpoint from "./GetEndpoint";

export default class APIRequest {
  constructor(url) {
    this.url = url;
  }

  get(config) {
    return Axios.get(`${GetEndpoint()}/api/${this.url}`, config);
  }

  post(data, config) {
    return Axios.post(`${GetEndpoint()}/api/${this.url}`, data, config);
  }

  put(data, config) {
    return Axios.put(`${GetEndpoint()}/api/${this.url}`, data, config);
  }

  delete(config) {
    return Axios.delete(`${GetEndpoint()}/api/${this.url}`, config);
  }
}
