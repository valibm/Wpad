import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { imgUrl } from "../../../redux/actions/actionTypes";
import {
  changeUserAvatar,
  changeUserCover,
  getUser,
} from "../../../redux/actions/userAction";

const ChangeProfile = (props) => {
  const { user } = props;
  const [images, setImages] = useState([]);
  const [profileChange, setProfileChange] = useState(true);
  const [coverChange, setCoverChange] = useState(true);

  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));

  // useEffect(() => {
  //   props.GetImages(user.id);
  // }, [user, imageChange]);

  useEffect(() => {
    if (props.profile.data.statusCode == 200) {
      props.getUser(user.username);
    }
  }, [props.profile.data]);

  useEffect(() => {
    if (props.cover.data.statusCode == 200) {
      props.getUser(user.username);
    }
  }, [props.cover]);

  const handleProfileUpload = (e) => {
    const profileImage = e.target.files[0];
    const formData = new FormData();
    formData.append("imageFile", profileImage);
    props.changeProfile(formData, loggedUser.id);
    setProfileChange(!profileChange);
  };

  const handleCoverUpload = (e) => {
    const coverImage = e.target.files[0];
    const formData = new FormData();
    formData.append("imageFile", coverImage);
    props.changeCover(formData, loggedUser.id);
    setCoverChange(!coverChange);
  };

  console.log(user);

  const renderProfile = () => {
    if (user) {
      if (user.images.length == 0) {
        return (
          <div className="mb-2">
            <img
              className="img-fluid"
              src={`${imgUrl}/user.png`}
              alt="User profile image"
            />
          </div>
        );
      } else {
        if (user.images.length > 1) {
          return user.images.map((image) => {
            if (image.isAvatar) {
              return (
                <div key={image.id} className="mb-2">
                  <img
                    className="img-fluid"
                    src={`${imgUrl}/${image.name}`}
                    alt="User profile image"
                  />
                </div>
              );
            }
          });
        } else {
          if (user.images[0].isAvatar) {
            return (
              <div className="mb-2">
                <img
                  className="img-fluid"
                  src={`${imgUrl}/${user.images[0].name}`}
                  alt="User profile image"
                />
              </div>
            );
          } else {
            return (
              <div className="mb-2">
                <img
                  className="img-fluid"
                  src={`${imgUrl}/user.png`}
                  alt="User profile image"
                />
              </div>
            );
          }
        }
      }
    }
  };

  const renderCover = () => {
    if (user.images.length == 0) {
      return;
    } else {
      return user.images.map((image) => {
        if (image.isCover) {
          return (
            <div key={image.id} className="mb-2">
              <img
                className="img-fluid"
                src={`${imgUrl}/${image.name}`}
                alt="User background image"
              />
            </div>
          );
        } else {
          return;
        }
      });
    }
  };

  return (
    <div className="change-avatar">
      <div>
        <span className="change-avatar-header">Customize</span>
      </div>
      <div className="mt-3">
        <p className="light-p">Profile Picture</p>
      </div>
      <div className="change-avatar-pp">
        {renderProfile()}
        <label htmlFor="profileInput" className="add-image-btn">
          <i className="fa-solid fa-camera me-2"></i>
          <span>Change Profile</span>
          <input
            multiple={false}
            onChange={(e) => handleProfileUpload(e)}
            accept="image/*"
            name="imageFile"
            type="file"
            id="profileInput"
          />
        </label>
      </div>
      <div className="mt-4">
        <p className="light-p">Background</p>
      </div>
      <div className="change-avatar-pp">
        {renderCover()}
        <label htmlFor="coverInput" className="add-image-btn">
          <i className="fa-solid fa-camera me-2"></i>
          <span>Change Cover</span>
          <input
            multiple={false}
            onChange={(e) => handleCoverUpload(e)}
            accept="image/*"
            name="imageFile"
            type="file"
            id="coverInput"
          />
        </label>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    images: state.userImagesReducer,
    profile: state.changeAvatarReducer,
    cover: state.changeCoverReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProfile: (imageFile, userId) => {
      dispatch(changeUserAvatar(imageFile, userId));
    },
    changeCover: (imageFile, userId) => {
      dispatch(changeUserCover(imageFile, userId));
    },
    getUser: (username) => {
      dispatch(getUser(username));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfile);
