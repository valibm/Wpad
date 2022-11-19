import * as actionTypes from "../actions/actionTypes";
import initialState from "../initialState";

export const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userImagesReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_IMAGES_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_USER_IMAGES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateUserReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_SUCCES:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.UPDATE_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const changeAvatarReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_AVATAR_SUCCES:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.CHANGE_AVATAR_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const changeCoverReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_COVER_SUCCES:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.CHANGE_COVER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const checkFollowReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.CHECK_FOLLOW_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.CHECK_FOLLOW_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const checkFollowRangeReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.CHECK_FOLLOW_RANGE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.CHECK_FOLLOW_RANGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const checkFolloweeRangeReducer = (
  state = initialState.user,
  action
) => {
  switch (action.type) {
    case actionTypes.CHECK_FOLLOWEE_RANGE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.CHECK_FOLLOWEE_RANGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const followUserReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.FOLLOW_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.FOLLOW_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const unfollowUserReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.UNFOLLOW_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getFollowersReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_FOLLOWERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getFolloweesReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.GET_FOLLOWEE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_FOLLOWEE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const searchUsersReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.SEARCH_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
