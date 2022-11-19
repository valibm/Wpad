import * as actionTypes from "../actions/actionTypes";
import initialState from "../initialState";

export const commentForHeadingReducer = (
  state = initialState.comment,
  action
) => {
  switch (action.type) {
    case actionTypes.COMMENT_GET_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.COMMENT_GET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const commentUserImageReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.GET_COMMENT_USER_IMAGES_SUCCESS:
      // const isExist = () => {
      //   if (Array.isArray(state.data.$values) && state.data.$values.length) {
      //     console.log(state.data.$values);
      //     state.data.$values.some(
      //       (i) =>
      //         i.$id ===
      //         action.payload.$values.map((image) => {
      //           return image.$id;
      //         })
      //     );
      //   } else {
      //     return false;
      //   }
      // };

      // if (isExist) {
      //   return state.data;
      // }
      // console.log(action.payload);
      return {
        ...state,
        data: [action.payload, ...state.data],
        // data: [].concat(
        //   action.payload.$values,
        //   state.data.map((datas) => {
        //     return datas.$values.filter(
        //       (val) =>
        //         val.$id ===
        //         action.payload.map((vall) => {
        //           return vall.$values.$id;
        //         })
        //     );
        //   })
        // ),
      };
    case actionTypes.GET_COMMENT_USER_IMAGES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const postCommentReducer = (state = initialState.comment, action) => {
  switch (action.type) {
    case actionTypes.POST_COMMENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.POST_COMMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
