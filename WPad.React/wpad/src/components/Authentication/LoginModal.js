import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { imgUrl } from "../../redux/actions/actionTypes";

import { authLogin } from "../../redux/actions/authAction";

const LoginModal = (props) => {
  const [userState, setUserState] = useState({});
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserState({ ...userState, ...{ [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.login(userState);
  };

  const renderErrors = () => {
    if (props.loginR.error.length) {
      return props.loginR.error.map((eror) => {
        return <span className="validation-txt d-block my-1">*{eror}</span>;
      });
    }
  };

  return ReactDOM.createPortal(
    <>
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="login-modal">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="login-m-content">
                <h5 className="title-card">Log in to Wpad</h5>
                <div className="signin-buttons px-3">
                  <button className="fb-btn mt-1 mb-2">
                    <i className="fa-brands fa-square-facebook me-1"></i>
                    Log in with Facebook
                  </button>
                  <button className="g-btn mt-1 mb-2">
                    <img
                      className="g-color-img me-1"
                      src={`${imgUrl}/google_logo.png`}
                      alt=""
                    />
                    Log in with Google
                  </button>
                </div>
                <div className="hr-with-text">
                  <div className="horizontal-line"></div>
                  <span className="or">OR</span>
                  <div className="horizontal-line"></div>
                </div>
                <div className="text-center my-1">{renderErrors()}</div>
                <div className="px-3">
                  <form className="signin-form" onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label className="label-dark" htmlFor="signin-email">
                        Username or Email
                      </label>
                      <input
                        className="input-st"
                        onChange={handleChange}
                        type="text"
                        id="signin-email"
                        name="username"
                      />
                    </div>
                    <div className="">
                      <label className="label-dark" htmlFor="signin-password">
                        Password
                      </label>
                      <input
                        className="input-st"
                        onChange={handleChange}
                        type="password"
                        id="signin-password"
                        name="password"
                      />
                    </div>
                    <button type="submit" className="btn-bg-dark mt-4 mb-1">
                      Signin
                    </button>
                  </form>
                </div>
                <div className="login-modal-footer">
                  <a className="forgot-p my-2" href="/">
                    forgot password?
                  </a>
                  <span>
                    Don't have an account?
                    <Link to="/register" className="link-primary">
                      Sign up
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("#modal")
  );
};

const mapStateToProps = (state) => {
  return {
    loginR: state.loginReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginState) => {
      dispatch(authLogin(loginState));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
