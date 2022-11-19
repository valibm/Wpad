import axios from "axios";
import * as actionTypes from "../actions/actionTypes";

export function getReplyForCommentSucces(data) {
  return { type: actionTypes.REPLY_GET_SUCCESS, payload: data };
}

export function getReplyForCommentError(error) {
  return { type: actionTypes.REPLY_GET_ERROR, payload: error };
}

export function getReplyForComment(commentId) {
  return function (dispatch) {
    let url = `${actionTypes.baseUrl}/reply/${commentId}`;
    axios
      .get(url, commentId)
      .then((response) => {
        dispatch(getReplyForCommentSucces(response?.data?.data));
      })
      .catch((error) => {
        dispatch(getReplyForCommentError(error));
      });
  };
}

export function postReplySuccess(data) {
  return { type: actionTypes.POST_REPLY_SUCCESS, payload: data };
}

export function postReplyError(error) {
  return { type: actionTypes.POST_REPLY_ERROR, payload: error };
}

export function postReply(replyState) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/reply/create`;
    axios
      .post(url, replyState)
      .then((response) => {
        dispatch(postReplySuccess(response.data));
      })
      .catch((error) => {
        dispatch(postReplyError(error));
      });
  };
}
