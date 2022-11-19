import axios from "axios";
import * as actionTypes from "./actionTypes";

export function getUserSuccess(data) {
  return { type: actionTypes.GET_USER_SUCCESS, payload: data };
}
export function getUserError(error) {
  return { type: actionTypes.GET_USER_ERROR, payload: error };
}
export function getUser(username) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/${username}`;
    axios
      .get(url)
      .then((res) => {
        dispatch(getUserSuccess(res.data.data));
      })
      .catch((error) => {
        dispatch(getUserError(error));
      });
  };
}

export function getUserImagesSuccess(data) {
  return { type: actionTypes.GET_USER_IMAGES_SUCCESS, payload: data };
}
export function getUserImagesError(error) {
  return { type: actionTypes.GET_USER_IMAGES_ERROR, payload: error };
}
export function getUserImages(userId) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/images/${userId}`;
    axios
      .get(url)
      .then((res) => {
        dispatch(getUserImagesSuccess(res.data));
      })
      .catch((error) => {
        dispatch(getUserImagesError(error));
      });
  };
}

export function updateUserSuccess(data) {
  return { type: actionTypes.UPDATE_USER_SUCCES, payload: data };
}

export function updateUserError(error) {
  return { type: actionTypes.UPDATE_USER_ERROR, payload: error };
}

export function updateUserDetails(detailsState, userId) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/update/${userId}`;
    axios
      .post(url, detailsState, userId)
      .then((response) => {
        dispatch(updateUserSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateUserError(error?.response?.data?.error?.errors));
      });
  };
}

export function changeAvatarSuccess(data) {
  return { type: actionTypes.CHANGE_AVATAR_SUCCES, payload: data };
}
export function changeAvatarError(error) {
  return { type: actionTypes.CHANGE_AVATAR_ERROR, payload: error };
}

export function changeUserAvatar(imageFile, userId) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/update/avatar/${userId}`;
    axios
      .post(url, imageFile, userId)
      .then((response) => {
        dispatch(changeAvatarSuccess(response.data));
      })
      .catch((error) => {
        dispatch(changeAvatarError(error));
      });
  };
}

export function changeCoverSuccess(data) {
  return { type: actionTypes.CHANGE_COVER_SUCCES, payload: data };
}
export function changeCoverError(error) {
  return { type: actionTypes.CHANGE_COVER_ERROR, payload: error };
}

export function changeUserCover(imageFile, userId) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/update/cover/${userId}`;
    axios
      .post(url, imageFile, userId)
      .then((response) => {
        dispatch(changeCoverSuccess(response.data));
      })
      .catch((error) => {
        dispatch(changeCoverError(error));
      });
  };
}

export function checkFollowSuccess(data) {
  return { type: actionTypes.CHECK_FOLLOW_SUCCESS, payload: data };
}
export function checkFollowError(error) {
  return { type: actionTypes.CHECK_FOLLOW_ERROR, payload: error };
}

export function checkFollow(userId, recipientId) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/${userId}/check/${recipientId}`;
    await axios
      .get(url, userId, recipientId)
      .then((response) => {
        dispatch(checkFollowSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(checkFollowError(error));
      });
  };
}

export function checkFollowRangeSuccess(data) {
  return { type: actionTypes.CHECK_FOLLOW_RANGE_SUCCESS, payload: data };
}
export function checkFollowRangeError(error) {
  return { type: actionTypes.CHECK_FOLLOW_RANGE_ERROR, payload: error };
}

export function checkFollowRange(userId, recipientIds) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/${userId}/checkrange`;
    await axios
      .post(url, recipientIds)
      .then((response) => {
        dispatch(checkFollowRangeSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(checkFollowRangeError(error));
      });
  };
}

export function checkFolloweeRangeSuccess(data) {
  return { type: actionTypes.CHECK_FOLLOWEE_RANGE_SUCCESS, payload: data };
}
export function checkFolloweeRangeError(error) {
  return { type: actionTypes.CHECK_FOLLOWEE_RANGE_ERROR, payload: error };
}

export function checkFolloweeRange(userId, recipientIds) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/${userId}/checkrange`;
    await axios
      .post(url, recipientIds)
      .then((response) => {
        dispatch(checkFollowRangeSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(checkFollowRangeError(error));
      });
  };
}

export function followUserSuccess(data) {
  return { type: actionTypes.FOLLOW_USER_SUCCESS, payload: data };
}
export function followUserError(error) {
  return { type: actionTypes.FOLLOW_USER_ERROR, payload: error };
}

export function followUser(userId, recipientId) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/${userId}/follow/${recipientId}`;
    await axios
      .post(url, userId, recipientId)
      .then((response) => {
        dispatch(followUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(followUserSuccess(error));
      });
  };
}

export function unfollowUserSuccess(data) {
  return { type: actionTypes.FOLLOW_USER_SUCCESS, payload: data };
}
export function unfollowUserError(error) {
  return { type: actionTypes.FOLLOW_USER_ERROR, payload: error };
}

export function unfollowUser(userId, recipientId) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/${userId}/unfollow/${recipientId}`;
    await axios
      .post(url, userId, recipientId)
      .then((response) => {
        dispatch(unfollowUserSuccess(response.data));
      })
      .catch((error) => {
        dispatch(unfollowUserError(error));
      });
  };
}

export function getFolloweesSuccess(data) {
  return { type: actionTypes.GET_FOLLOWEE_SUCCESS, payload: data };
}
export function getFolloweesError(error) {
  return { type: actionTypes.GET_FOLLOWEE_ERROR, payload: error };
}

export function getFollowees(userId) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/followee/${userId}`;
    await axios
      .get(url, userId)
      .then((response) => {
        dispatch(getFolloweesSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(getFolloweesError(error));
      });
  };
}

export function getFollowersSuccess(data) {
  return { type: actionTypes.GET_FOLLOWERS_SUCCESS, payload: data };
}
export function getFollowersError(error) {
  return { type: actionTypes.GET_FOLLOWERS_ERROR, payload: error };
}

export function getFollowers(userId) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/follower/${userId}`;
    await axios
      .get(url, userId)
      .then((response) => {
        dispatch(getFollowersSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(getFollowersError(error));
      });
  };
}

export function searchUsersSuccess(data) {
  return { type: actionTypes.SEARCH_USERS_SUCCESS, payload: data };
}
export function searchUsersError(error) {
  return { type: actionTypes.SEARCH_USERS_ERROR, payload: error };
}

export function searchUsers(value) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/user/search/${value}`;
    await axios
      .get(url, value)
      .then((response) => {
        dispatch(searchUsersSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(searchUsersError(error));
      });
  };
}
