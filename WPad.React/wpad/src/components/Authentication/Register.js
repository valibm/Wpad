import { logDOM } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

import { imgUrl } from "../../redux/actions/actionTypes";
import { authRegister, loginError } from "../../redux/actions/authAction";
import Footer from "../Header/Footer";

const Register = (props) => {
  const defaultUserState = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
  };
  const [userState, setUserState] = useState(defaultUserState);
  const [disable, setDisable] = useState(true);
  const [formErors, setFormErrors] = useState([]);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submit) {
      props.registerAuth(userState);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserState({ ...userState, ...{ [name]: value } });
  };

  const handleKeyUp = (e) => {
    if (userState) {
      if (
        userState.firstname &&
        userState.lastname &&
        userState.username &&
        userState.email &&
        userState.password &&
        userState.confirmPassword &&
        userState.birthday
      ) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  };

  const renderErrors = () => {
    if (props.registrationRequest.error.length) {
      return props.registrationRequest.error.map((eror) => {
        return <span className="validation-txt d-block my-1">*{eror}</span>;
      });
    }
  };

  console.log(props.registrationRequest.data.statusCode);

  useEffect(() => {
    if (props.registrationRequest.data.statusCode === 200) {
      navigate("/");
    }
  }, [props.registrationRequest.data]);

  return (
    <>
      <div className="container-fluid">
        <div className="register-main">
          <div className="register-card col-md-6">
            <h5 className="title-card">Join Wpad</h5>
            <div className="register-buttons">
              <button className="fb-btn mt-1 mb-4">
                <i className="fa-brands fa-square-facebook me-1"></i>
                Signup with Facebook
              </button>
              <button className="g-btn mt-1 mb-4">
                <img
                  className="g-color-img me-1"
                  src={`${imgUrl}/google_logo.png`}
                  alt=""
                />
                Signup with Google
              </button>
            </div>
            <div className="hr-with-text">
              <div className="horizontal-line"></div>
              <span className="or">OR</span>
              <div className="horizontal-line"></div>
            </div>
            <div className="text-center my-1">{renderErrors()}</div>
            <div className="px-3">
              <form onSubmit={handleSubmit} className="register-form" action="">
                <div className="mb-3">
                  <label className="label-dark" htmlFor="signup-firstname">
                    Firstname
                  </label>
                  <input
                    className="input-st"
                    name="firstname"
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    type="text"
                    id="signup-firstname"
                  />
                </div>
                <div className="mb-3">
                  <label className="label-dark" htmlFor="signup-lastname">
                    Surname
                  </label>
                  <input
                    className="input-st"
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    name="lastname"
                    type="text"
                    id="signup-lastname"
                  />
                </div>
                <div className="mb-3">
                  <label className="label-dark" htmlFor="signup-username">
                    Username
                  </label>
                  <input
                    className="input-st"
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    name="username"
                    type="text"
                    id="signup-username"
                  />
                </div>
                <div className="mb-3">
                  <label className="label-dark" htmlFor="signup-email">
                    Email
                  </label>
                  <input
                    className="input-st"
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    name="email"
                    type="text"
                    id="signup-email"
                  />
                </div>
                <div className="mb-2">
                  <label className="label-dark">Birthday</label>
                  <input
                    className="input-st"
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    name="birthday"
                    type="date"
                    id="user-dob"
                    defaultValue="2000-12-20"
                  />
                </div>
                <div className="mb-3">
                  <label className="label-dark" htmlFor="signup-password">
                    Password
                  </label>
                  <input
                    className="input-st"
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    name="password"
                    type="password"
                    id="signup-password"
                  />
                </div>
                <div className="mb-3">
                  <label className="label-dark" htmlFor="signup-cpassword">
                    Confirm Password
                  </label>
                  <input
                    className="input-st"
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    name="confirmPassword"
                    type="password"
                    id="signup-cpassword"
                  />
                </div>
                <button
                  onClick={() => setSubmit(true)}
                  className="btn-bg-dark mt-5 mb-1"
                  type="submit"
                >
                  Signup
                </button>
              </form>
            </div>
            <div className="register-footer mt-3">
              <span>
                By continuing, you agree to Wpad's
                <a className="link-primary mx-1" href="">
                  Terms of Service
                </a>
                and
                <a className="link-primary mx-1" href="">
                  Privacy Policy.
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    registrationRequest: state.registerReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerAuth: (userState) => {
      dispatch(authRegister(userState));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
