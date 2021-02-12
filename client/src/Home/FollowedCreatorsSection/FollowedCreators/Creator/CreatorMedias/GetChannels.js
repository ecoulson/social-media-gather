import Axios from "axios";
import GetEndpoint from "../../../../../Library/GetEndpoint";

export default async function GetChannels(ids) {
  const response = await Axios.get(
    `${GetEndpoint()}/api/channel?ids=${ids.join(",")}`
  );
  return response.data.data.channels;
}
