import Axios from "axios";

export default async function GetChannels(ids) {
  const response = await Axios.get(`/api/channel?ids=${ids.join(",")}`);
  return response.data.data.channels;
}
