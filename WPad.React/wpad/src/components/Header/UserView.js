import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getUserImages } from "../../redux/actions/userAction";
import { imgUrl } from "../../redux/actions/actionTypes";

const UserView = (props) => {
  const { userData } = props;
  const [images, setImages] = useState([]);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginUser");
    window.location.reload();
  };

  useEffect(() => {
    props.getUserImages(userData.id);
  }, [userData]);

  useEffect(() => {
    if (props.images.data.data) {
      setImages(props.images.data.data);
    }
  }, [props.images]);

  const renderProfile = (images) => {
    if (images.length == 0) {
      return `${imgUrl}/user.png`;
    } else {
      for (let i = 0; i < images.length; i++) {
        if (images[i].isAvatar) {
          return `${imgUrl}/${images[i].name}`;
        }
      }
    }
  };

  return (
    <div className="dropdown">
      <Link
        className="dropdown-toggle dropdown-title"
        to={`user/${userData.username}`}
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-offset="0,20"
      >
        <img
          className="header-user-image"
          src={renderProfile(images)}
          alt="Profile picture"
        />
        {props.userData.username}
      </Link>
      <ul
        className="dropdown-menu dropdown-list"
        aria-labelledby="dropdownMenuLink"
      >
        <li>
          <Link to={`/user/${userData.username}`} className="dropdown-item">
            My Profile
          </Link>
        </li>
        <li className="divider"></li>
        <li>
          <a className="dropdown-item">Notification</a>
        </li>
        <li className="divider"></li>
        <li>
          <button onClick={logOut} className="dropdown-item" href="#">
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    images: state.userImagesReducer,
  };
};

export default connect(mapStateToProps, { getUserImages })(UserView);
