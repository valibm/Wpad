import axios from "axios";
import * as actionTypes from "../actions/actionTypes";

export function postHeadingSuccess(data) {
  return { type: actionTypes.POST_HEADING_SUCCES, payload: data };
}

export function postHeadingError(error) {
  return { type: actionTypes.POST_HEADING_ERROR, payload: error };
}

export function postHeading(headingState) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/heading/create`;
    await axios
      .post(url, headingState)
      .then((response) => {
        dispatch(postHeadingSuccess(response.data));
      })
      .catch((error) => {
        dispatch(postHeadingError(error));
      });
  };
}

export function addHeadingImageSuccess(data) {
  return { type: actionTypes.ADD_HEADING_IMAGE_SUCCES, payload: data };
}

export function addHeadingImageError(error) {
  return { type: actionTypes.ADD_HEADING_IMAGE_ERROR, payload: error };
}

export function addHeadingImages(imageFile, headingId) {
  return function (dispatch) {
    let url = `${actionTypes.baseUrl}/heading/addimage/${headingId}`;
    axios
      .post(url, imageFile, headingId)
      .then((response) => {
        // console.log(response);
        dispatch(addHeadingImageSuccess(response));
      })
      .catch((error) => {
        dispatch(addHeadingImageError(error));
      });
  };
}

export function getHeadingForUserSucces(data) {
  return { type: actionTypes.GET_HEADING_FOR_USER_SUCCES, payload: data };
}

export function getHeadingForUserError(error) {
  return { type: actionTypes.GET_HEADING_FOR_USER_ERROR, payload: error };
}

export function getHeadingForUser(userId) {
  return function (dispatch) {
    let url = `${actionTypes.baseUrl}/heading/user/${userId}`;
    axios
      .get(url, userId)
      .then((response) => {
        // console.log(response);
        dispatch(getHeadingForUserSucces(response.data.data));
      })
      .catch((error) => {
        dispatch(getHeadingForUserError(error));
      });
  };
}

export function getTrendsSucces(data) {
  return { type: actionTypes.GET_TRENDS_SUCCESS, payload: data };
}

export function getTrendsError(error) {
  return { type: actionTypes.GET_TRENDS_ERROR, payload: error };
}

export function getTrends() {
  return function (dispatch) {
    let url = `${actionTypes.baseUrl}/heading/trends`;
    axios
      .get(url)
      .then((response) => {
        dispatch(getTrendsSucces(response.data.data));
      })
      .catch((error) => {
        dispatch(getTrendsError(error));
      });
  };
}

export function getHeadingCountSucces(data) {
  return { type: actionTypes.GET_HEADINGS_COUNT_SUCCESS, payload: data };
}

export function getHeadingCountError(error) {
  return { type: actionTypes.GET_HEADINGS_COUNT_ERROR, payload: error };
}

export function getHeadingCount(userId) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/heading/count/${userId}`;
    await axios
      .get(url, userId)
      .then((response) => {
        dispatch(getHeadingCountSucces(response.data.data));
      })
      .catch((error) => {
        dispatch(getHeadingCountError(error));
      });
  };
}

export function getHeadingSucces(data) {
  return { type: actionTypes.GET_HEADING_SUCCES, payload: data };
}

export function getHeadingError(error) {
  return { type: actionTypes.GET_HEADING_ERROR, payload: error };
}

export function getHeading(headingId) {
  return function (dispatch) {
    let url = `${actionTypes.baseUrl}/heading/${headingId}`;
    axios
      .get(url, headingId)
      .then((response) => {
        dispatch(getHeadingSucces(response.data.data));
      })
      .catch((error) => {
        dispatch(getHeadingError(error));
      });
  };
}

export function getHeadingImagesSuccess(data) {
  return { type: actionTypes.GET_HEADING_IMAGES_SUCCESS, payload: data };
}
export function getHeadingImagesError(error) {
  return { type: actionTypes.GET_HEADING_IMAGES_ERROR, payload: error };
}
export function getHeadingImages(headingId) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/heading/images/${headingId}`;
    axios
      .get(url, headingId)
      .then((res) => {
        dispatch(getHeadingImagesSuccess(res.data.data));
      })
      .catch((error) => {
        dispatch(getHeadingImagesError(error));
      });
  };
}

export function handleLikeSucces(data) {
  return { type: actionTypes.HANDLE_LIKE_SUCCESS, payload: data };
}
export function handleLikeError(error) {
  return { type: actionTypes.HANDLE_LIKE_ERROR, payload: error };
}
export function handleLike(headingId, userId) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/heading/handlelike/${headingId}/${userId}`;
    await axios
      .post(url)
      .then((res) => {
        dispatch(handleLikeSucces(res.data));
      })
      .catch((error) => {
        dispatch(handleLikeError(error));
      });
  };
}

export function getBrowseHeadingsSuccess(data) {
  return { type: actionTypes.GET_BROWSE_HEADING_SUCCESS, payload: data };
}
export function getBrowseHeadingsError(error) {
  return { type: actionTypes.GET_BROWSE_HEADING_ERROR, payload: error };
}
export function getBrowseHeadings(page) {
  return async function (dispatch) {
    const url = `${actionTypes.baseUrl}/heading/home/${page}`;
    await axios
      .get(url, page)
      .then((res) => {
        dispatch(getBrowseHeadingsSuccess(res.data.data));
      })
      .catch((error) => {
        dispatch(getBrowseHeadingsError(error));
      });
  };
}

export function getBrowseFollowingSuccess(data) {
  return { type: actionTypes.GET_BROWSE_FOLLOWING_SUCCESS, payload: data };
}
export function getBrowseFollowingError(error) {
  return { type: actionTypes.GET_BROWSE_FOLLOWING_ERROR, payload: error };
}
export function getBrowseFollowing(userId, page) {
  return async function (dispatch) {
    const url = `${actionTypes.baseUrl}/heading/home/${userId}/following/${page}`;
    await axios
      .get(url)
      .then((res) => {
        dispatch(getBrowseFollowingSuccess(res.data.data));
      })
      .catch((error) => {
        dispatch(getBrowseFollowingError(error));
      });
  };
}

export function searchHeadingsSuccess(data) {
  return { type: actionTypes.SEARCH_HEADING_SUCCESS, payload: data };
}
export function searchHeadingsError(error) {
  return { type: actionTypes.SEARCH_HEADING_ERROR, payload: error };
}

export function searchHeadings(value, page) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/heading/search/${value}/${page}`;
    await axios
      .get(url)
      .then((response) => {
        dispatch(searchHeadingsSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(searchHeadingsError(error.response.data.error));
      });
  };
}

export function getForChannelSuccess(data) {
  return { type: actionTypes.GET_FOR_CHANNEL_SUCCESS, payload: data };
}
export function getForChannelError(error) {
  return { type: actionTypes.GET_FOR_CHANNEL_ERROR, payload: error };
}

export function getForChannel(id, page) {
  return function (dispatch) {
    let url = `${actionTypes.baseUrl}/heading/channel/${id}/${page}`;
    axios
      .get(url)
      .then((response) => {
        dispatch(getForChannelSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(getForChannelError(error));
      });
  };
}

export function searchForChannelSuccess(data) {
  return { type: actionTypes.SEARCH_FOR_CHANNEL_SUCCESS, payload: data };
}
export function searchForChannelError(error) {
  return { type: actionTypes.SEARCH_FOR_CHANNEL_ERROR, payload: error };
}

export function searchForChannel(id, value, page) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/heading/channel/${id}/search/${value}/${page}`;
    await axios
      .get(url)
      .then((response) => {
        dispatch(searchForChannelSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(searchForChannelError(error.response.data.error));
      });
  };
}

export function removeHeadingSuccess(data) {
  return { type: actionTypes.REMOVE_HEADING_SUCCESS, payload: data };
}
export function removeHeadingError(error) {
  return { type: actionTypes.REMOVE_HEADING_ERROR, payload: error };
}

export function removeHeading(id) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/heading/${id}`;
    await axios
      .delete(url)
      .then((response) => {
        dispatch(removeHeadingSuccess(response.data));
      })
      .catch((error) => {
        dispatch(removeHeadingError(error.response.data.error));
      });
  };
}
