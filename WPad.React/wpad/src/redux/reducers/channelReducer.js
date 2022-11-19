import initialState from "../initialState";
import * as actionTypes from "../actions/actionTypes";

export const getAllChannelsReducer = (
  state = initialState.channels,
  action
) => {
  switch (action.type) {
    case actionTypes.GET_CHANNELS_SUCCES:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_CHANNELS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
