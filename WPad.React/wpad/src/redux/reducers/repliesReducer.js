import * as actionTypes from "../actions/actionTypes";
import initialState from "../initialState";

export const replyForCommentReducer = (state = initialState.reply, action) => {
  switch (action.type) {
    case actionTypes.REPLY_GET_SUCCESS:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case actionTypes.REPLY_GET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const postReplyReducer = (state = initialState.reply, action) => {
  switch (action.type) {
    case actionTypes.POST_REPLY_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.POST_REPLY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
