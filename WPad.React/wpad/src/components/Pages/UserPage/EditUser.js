import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Select from "react-select";

import { getUser, updateUserDetails } from "../../../redux/actions/userAction";
import Footer from "../../Header/Footer";
import ChangePasswordModal from "./ChangePasswordModal";
import ChangeProfile from "./ChangeProfile";

const EditUser = (props) => {
  const defaultDetailsState = {
    firstname: "",
    lastname: "",
    gender: "",
    bio: "",
    location: "",
    showName: false,
    facebookLink: "",
    twitterLink: "",
    instagramLink: "",
  };
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));
  const { username } = useParams();
  const user = props.user.data;
  const [images, setImages] = useState({});
  const [imageChange, setImageChange] = useState(true);
  const [detailsState, setDetailsState] = useState(defaultDetailsState);

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non-binary" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetailsState({ ...detailsState, ...{ [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.update(detailsState, loggedUser.id);
  };

  useEffect(() => {
    if (loggedUser == null) {
      navigate("/");
    } else {
      if (username != loggedUser.username) {
        navigate("/");
      }
    }
  });

  useEffect(() => {
    props.userGet(username);
  }, [username, imageChange]);

  useEffect(() => {
    if (user) {
      setDetailsState({
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        bio: user.bio,
        location: user.location,
        showName: user.showName,
        facebookLink: user.facebookLink,
        twitterLink: user.twitterLink,
        instagramLink: user.instagramLink,
      });
      setImages(user.images);
    }
  }, [user]);

  const renderErrors = () => {
    if (props.updateResponse.error.length) {
      return props.updateResponse.error.map((eror) => {
        return (
          <div className="my-2">
            <span style={{ color: "red" }}>* {eror}</span>
          </div>
        );
      });
    }
  };

  if (user) {
    return (
      <div className="edit-profile-g">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-12 mb-5">
              <div className="edit-profile-card">
                <div className="edit-profile-card-header">
                  <span className="mb-5">Account</span>
                  <p className="mt-3">Change your account information</p>
                </div>
                {renderErrors()}
                <div className="edit-profile-form-div">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="label-dark" htmlFor="edit-name">
                        Name
                      </label>
                      <input
                        className="input-st"
                        name="firstname"
                        defaultValue={detailsState.firstname}
                        onChange={handleChange}
                        type="text"
                        id="edit-name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="label-dark" htmlFor="edit-surname">
                        Surname
                      </label>
                      <input
                        className="input-st"
                        name="lastname"
                        defaultValue={detailsState.lastname}
                        onChange={handleChange}
                        type="text"
                        id="edit-surname"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="label-dark mb-2">Gender</label>
                      <Select
                        defaultValue={{
                          label: user.gender,
                          value: user.gender,
                        }}
                        onChange={(e) => {
                          setDetailsState({
                            ...detailsState,
                            ...{ gender: e.value },
                          });
                        }}
                        options={genders}
                        className="input-st"
                        name="gender"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="label-dark d-inline me-2">
                        Password
                      </label>
                      <button
                        type="button"
                        className="change-password-btn ms-2"
                        data-bs-toggle="modal"
                        data-bs-target="#changePasswordModal"
                      >
                        Change
                      </button>
                      <ChangePasswordModal />
                    </div>
                    <div className="mb-3">
                      <label className="label-dark" htmlFor="edit-location">
                        Location
                      </label>
                      <input
                        className="input-st"
                        defaultValue={detailsState.location}
                        onChange={handleChange}
                        type="text"
                        name="location"
                        id="edit-location"
                      />
                    </div>
                    {/* <div className="mb-3">
                      <label
                        className="label-dark d-inline me-2"
                        htmlFor="showName"
                      >
                        Show Name
                      </label>
                      <input
                        className="showName-check"
                        defaultChecked={detailsState.showName}
                        onChange={handleChange}
                        name="showName"
                        type="checkbox"
                        id="showName"
                      />
                    </div> */}
                    <div className="mb-3">
                      <label className="label-dark" htmlFor="edit-facebook">
                        Facebook
                      </label>
                      <input
                        className="input-st"
                        type="text"
                        defaultValue={detailsState.facebookLink}
                        onChange={handleChange}
                        name="facebookLink"
                        id="edit-facebook"
                        placeholder="Link to your facebook account (Optional)"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="label-dark" htmlFor="edit-twitter">
                        Twitter
                      </label>
                      <input
                        className="input-st"
                        type="text"
                        name="twitterLink"
                        defaultValue={detailsState.twitterLink}
                        onChange={handleChange}
                        id="edit-twitter"
                        placeholder="Link to your twitter account (Optional)"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="label-dark" htmlFor="edit-instagram">
                        Instagram
                      </label>
                      <input
                        className="input-st"
                        type="text"
                        defaultValue={detailsState.instagramLink}
                        onChange={handleChange}
                        name="instagramLink"
                        id="edit-instagram"
                        placeholder="Link to your instagram account (Optional)"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="label-dark mb-2" htmlFor="edit-about">
                        About
                      </label>
                      <div>
                        <textarea
                          id="edit-about"
                          name="bio"
                          defaultValue={detailsState.bio}
                          onChange={handleChange}
                          className="about-textArea"
                          placeholder="Help people get to know you"
                        ></textarea>
                      </div>
                    </div>
                    <button className="btn-bg-dark mt-5 mb-1" type="submit">
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12 mb-5">
              <ChangeProfile user={user} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return <h1 style={{ paddingTop: "100px" }}>Loading...</h1>;
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    updateResponse: state.updateUserReducer,
    profile: state.changeAvatarReducer,
    cover: state.changeCoverReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (detailsState, userId) => {
      dispatch(updateUserDetails(detailsState, userId));
    },
    userGet: (username) => {
      dispatch(getUser(username));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
