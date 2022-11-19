import initialState from "../initialState";
import * as actionTypes from "../actions/actionTypes";

export function registerReducer(state = initialState.register, action) {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.REGISTER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function loginReducer(state = initialState.loginReducer, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      window.location.reload();
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
