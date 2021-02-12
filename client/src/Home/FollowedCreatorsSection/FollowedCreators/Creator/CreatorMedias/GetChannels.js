import Axios from "axios";

export default async function GetChannels(ids) {
  const response = await Axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/channel?ids=${ids.join(",")}`
  );
  return response.data.data.channels;
}
