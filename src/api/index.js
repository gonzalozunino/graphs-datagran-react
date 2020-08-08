import axios from "axios";
import { REQUEST_URL } from "../utils/constants";

const get = (action = "/", params, source) => {
  return axios.get(`${REQUEST_URL}${action}`, {
    params: {
      ...params,
    },
    ...source,
  });
};

export default { get };
