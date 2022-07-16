import axios from "axios";
import * as actions from "../api";

// Exemplo do tipo de action que será passado a este middleware
// const action = {
//   type: "apiCallBegan", // ou por exemplo 'apiRequest'
//   payload: {
//     url: "/bugs",
//     method: "get",
//     data: {},
//     onSuccess: "bugReceived",
//     onError: "apiRequestFailed",
//   },
// };

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) {
      return next(action);
    }

    next(action);

    const { url, method, data, onSuccess, onError } = action.payload;

    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url,
        method,
        data,
      });
      // General
      dispatch(actions.apiCallSuccess(response.data));
      // Specific (caso o onError esteja definido ao fazer o meu dispatch no index.js por exemplo)
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: response.data });
      }
    } catch (error) {
      // General
      dispatch(actions.apiCallFailed(error));
      // Specific (caso o onError esteja definido ao fazer o meu dispatch no index.js por exemplo)
      if (onError) {
        dispatch({ type: onError, payload: error });
      }
    }
  };

export default api;
