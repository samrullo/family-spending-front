import { getCookie } from "./get_csrf";
import { API_BASE_URL, LOGIN_ENDPOINT } from "./ApiEndpoints";

import axios from "axios";
export const loginUser = async (username, password) => {
  const csrf_token = getCookie("csrftoken");
  const response = await axios.post(
    `${API_BASE_URL}${LOGIN_ENDPOINT}`,
    {
      username: username,
      password: password,
    },
    {
      "X-CSRFToken": csrf_token,
    }
  );
  console.log(`response.data : ${response.data}`);
  const response_data = await response.data
  return response_data
};
