import * as actionTypes from "../actions/actionTypes";
import initialState from "../initialState";

export const postHeadingReducer = (state = initialState.heading, action) => {
  switch (action.type) {
    case actionTypes.POST_HEADING_SUCCES:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.POST_HEADING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const headingImagesReducer = (state = initialState.heading, action) => {
  switch (action.type) {
    case actionTypes.ADD_HEADING_IMAGE_SUCCES:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.ADD_HEADING_IMAGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const headingForUserReducer = (state = initialState.heading, action) => {
  switch (action.type) {
    case actionTypes.GET_HEADING_FOR_USER_SUCCES:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_HEADING_FOR_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const headingCountReducer = (state = initialState.heading, action) => {
  switch (action.type) {
    case actionTypes.GET_HEADINGS_COUNT_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_HEADINGS_COUNT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const headingReducer = (state = initialState.getHeading, action) => {
  switch (action.type) {
    case actionTypes.GET_HEADING_SUCCES:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_HEADING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getHeadingImagesReducer = (
  state = initialState.heading,
  action
) => {
  switch (action.type) {
    case actionTypes.GET_HEADING_IMAGES_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_HEADING_IMAGES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const handleLikeReducer = (state = initialState.heading, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_LIKE_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.HANDLE_LIKE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getBrowseHeadingsReducer = (
  state = initialState.heading,
  action
) => {
  switch (action.type) {
    case actionTypes.GET_BROWSE_HEADING_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_BROWSE_HEADING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getBrowseFollowingReducer = (
  state = initialState.heading,
  action
) => {
  switch (action.type) {
    case actionTypes.GET_BROWSE_FOLLOWING_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_BROWSE_FOLLOWING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const searchHeadingsReducer = (state = initialState.heading, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_HEADING_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.SEARCH_HEADING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getForChannelReducer = (state = initialState.heading, action) => {
  switch (action.type) {
    case actionTypes.GET_FOR_CHANNEL_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_FOR_CHANNEL_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const searchForChannelReducer = (
  state = initialState.heading,
  action
) => {
  switch (action.type) {
    case actionTypes.SEARCH_FOR_CHANNEL_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.SEARCH_FOR_CHANNEL_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getTrends = (state = initialState.heading, action) => {
  switch (action.type) {
    case actionTypes.GET_TRENDS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.GET_TRENDS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const removeHeading = (state = initialState.heading, action) => {
  switch (action.type) {
    case actionTypes.REMOVE_HEADING_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.REMOVE_HEADING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
