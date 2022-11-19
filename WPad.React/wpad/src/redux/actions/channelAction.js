import axios from "axios";
import * as actionTypes from "./actionTypes";

export function getChannelsSuccess(data) {
  return { type: actionTypes.GET_CHANNELS_SUCCES, payload: data };
}
export function getChannelsError(error) {
  return { type: actionTypes.GET_CHANNELS_ERROR, payload: error };
}

export const getAllChannels = () => (dispatch) => {
  axios
    .get(`${actionTypes.baseUrl}/channel`)
    .then((response) => {
      console.log(response);
      dispatch(getChannelsSuccess(response.data.data));
    })
    .catch((error) => {
      dispatch(getChannelsError(error));
    });
};
