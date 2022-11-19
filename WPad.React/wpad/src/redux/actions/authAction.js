import axios from "axios";
import * as actionTypes from "./actionTypes";

export function registerSuccess(data) {
  return { type: actionTypes.REGISTER_SUCCESS, payload: data };
}

export function registerError(error) {
  return { type: actionTypes.REGISTER_ERROR, payload: error };
}

export function authRegister(registerState) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/authentication/register`;
    axios
      .post(url, registerState)
      .then((response) => {
        dispatch(registerSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(registerError(error.response.data.error.errors));
      });
  };
}

export function loginSuccess(data) {
  return { type: actionTypes.LOGIN_SUCCESS, payload: data };
}

export function loginError(error) {
  return { type: actionTypes.LOGIN_ERROR, payload: error };
}

export function authLogin(loginState) {
  return async function (dispatch) {
    let url = `${actionTypes.baseUrl}/authentication/login`;
    axios
      .post(url, loginState)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem(
          "loginUser",
          JSON.stringify({
            id: res.data.data.id,
            username: res.data.data.username,
            email: res.data.data.email,
            roles: res.data.data.roles,
          })
        );
        dispatch(loginSuccess(res.data));
      })
      .catch((error) => {
        dispatch(loginError(error.response.data.error.errors));
      });
  };
}
