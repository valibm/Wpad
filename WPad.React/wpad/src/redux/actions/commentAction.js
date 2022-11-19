import axios from "axios";
import * as actionTypes from "../actions/actionTypes";

export function getCommentForHeadingSucces(data) {
  return { type: actionTypes.COMMENT_GET_SUCCESS, payload: data };
}

export function getCommentForHeadingError(error) {
  return { type: actionTypes.COMMENT_GET_ERROR, payload: error };
}

export function getCommentForHeading(headingId) {
  return function (dispatch) {
    let url = `${actionTypes.baseUrl}/comment/${headingId}`;
    axios
      .get(url, headingId)
      .then((response) => {
        dispatch(getCommentForHeadingSucces(response.data.data));
      })
      .catch((error) => {
        dispatch(getCommentForHeadingError(error));
      });
  };
}

export function getCommentUserImagesSuccess(data) {
  return { type: actionTypes.GET_COMMENT_USER_IMAGES_SUCCESS, payload: data };
}
export function getCommentUserImagesError(error) {
  return { type: actionTypes.GET_COMMENT_USER_IMAGES_ERROR, payload: error };
}
export function getCommentUserImages(userId) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/images/${userId}`;
    axios
      .get(url)
      .then((res) => {
        dispatch(getCommentUserImagesSuccess(res.data.data));
      })
      .catch((error) => {
        dispatch(getCommentUserImagesError(error));
      });
  };
}

export function postCommentSuccess(data) {
  return { type: actionTypes.POST_COMMENT_SUCCESS, payload: data };
}

export function postCommentError(error) {
  return { type: actionTypes.POST_COMMENT_ERROR, payload: error };
}

export function postComment(commentState) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/comment/create`;
    axios
      .post(url, commentState)
      .then((response) => {
        dispatch(postCommentSuccess(response.data));
      })
      .catch((error) => {
        dispatch(postCommentError(error));
      });
  };
}
