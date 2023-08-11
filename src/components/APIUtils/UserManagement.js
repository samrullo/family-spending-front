import { getCookie } from "./get_csrf";
import { API_BASE_URL, LOGIN_ENDPOINT } from "./ApiEndpoints";

import axios from "axios";
export const loginUser = async (username, password) => {
  const csrf_token = getCookie("csrftoken");
  console.log(`go csrf token before logging in user ${csrf_token}`)
  const response = await axios.post(
    `${API_BASE_URL}${LOGIN_ENDPOINT}`,
    {
      username: username,
      password: password,
    },
    {
      headers: {
        "X-CSRFToken": csrf_token,
      },
    }
  );
  console.log(`response.data : ${response.data}`);
  const response_data = await response.data;
  return response_data;
};
