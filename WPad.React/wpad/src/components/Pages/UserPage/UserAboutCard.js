import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const UserAboutCard = ({ user }) => {
  const registerDate = moment(user.registerDate).format("MMMM Do YYYY");
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));

  const renderAbout = (about) => {
    if (loggedUser != null) {
      if (loggedUser.id === user.id) {
        if (about == null || about === "") {
          return (
            <div className="user-about-card-edit-div">
              <span className="mb-2">Help people get to know you</span>
              <Link
                to={`/user/edit/${loggedUser.username}`}
                className="userPage-controls-edit-btn mb-3"
              >
                <i className="fa-solid fa-gear me-2"></i> Edit Profile
              </Link>
            </div>
          );
        } else {
          return <p>{about}</p>;
        }
      }
    } else if (about != null || about != "") {
      return <p>{about}</p>;
    }
  };

  const renderFbButton = (fbLink, username) => {
    if (fbLink == null || fbLink === "") {
      return (
        <div className="user-fb-link-div round-btn me-2">
          <Link to={`/user/${username}`} className="user-fb-link" href="">
            <i className="fa-brands fa-facebook-f"></i>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="user-fb-link-div round-btn me-2">
          <Link to={fbLink} className="user-fb-link" href="">
            <i className="fa-brands fa-facebook-f"></i>
          </Link>
        </div>
      );
    }
  };

  const renderInstaButton = (instLink, username) => {
    if (instLink == null || instLink === "") {
      return (
        <div className="user-ins-link-div round-btn me-2">
          <Link to={`/user/${username}`} className="user-ins-link">
            <i className="fa-brands fa-instagram"></i>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="user-ins-link-div round-btn me-2">
          <Link to={instLink} className="user-ins-link">
            <i className="fa-brands fa-instagram"></i>
          </Link>
        </div>
      );
    }
  };

  const renderTwButton = (twButton, username) => {
    if (twButton == null || twButton === "") {
      return (
        <div className="user-tw-link-div round-btn me-2">
          <Link to={`/user/${username}`} className="user-tw-link">
            <i className="fa-brands fa-twitter"></i>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="user-tw-link-div round-btn me-2">
          <Link to={twButton} className="user-tw-link">
            <i className="fa-brands fa-twitter"></i>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="user-about-card p-3">
      <div>{renderAbout(user.bio, loggedUser, user.id)}</div>
      <div className="mb-1">
        <span>
          <i className="fa-solid fa-location-dot location-dot me-2"></i>
          {user.location}
        </span>
      </div>
      <div>
        <p>
          <span className="joined me-2">Joined</span>
          {registerDate}
        </p>
      </div>
      <div className="user-social-links-div">
        <p className="mt-2">Share Profile</p>
        <div className="user-social-links">
          {renderFbButton(user.facebookLink, user.username)}
          {renderTwButton(user.twitterLink, user.username)}
          {renderInstaButton(user.instagramLink, user.username)}
        </div>
      </div>
    </div>
  );
};

export default UserAboutCard;
