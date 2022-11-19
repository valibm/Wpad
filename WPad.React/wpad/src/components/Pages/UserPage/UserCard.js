import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { imgUrl } from "../../../redux/actions/actionTypes";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowees,
} from "../../../redux/actions/userAction";

const UserCard = ({
  user,
  follower,
  follow,
  followRes,
  unfollow,
  unfollowRes,
  followersGet,
  followeesGet,
  followers,
  followees,
}) => {
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));
  const [followState, setFollowState] = useState("");

  const renderProfile = () => {
    if (follower.images.length) {
      for (let i = 0; i < follower.images.length; i++) {
        if (follower.images[i].isAvatar == true) {
          return `${imgUrl}/${follower.images[i].name}`;
        }
      }
    } else {
      return `${imgUrl}/user.png`;
    }
  };

  const renderCover = () => {
    if (follower.images.length) {
      for (let i = 0; i < follower.images.length; i++) {
        if (follower.images[i].isCover == true) {
          return {
            backgroundImage: `url(${imgUrl}/${follower.images[i].name})`,
          };
        }
      }
    } else {
      return;
    }
  };

  const handleFollow = () => {
    if (loggedUser) {
      follow(follower.id, loggedUser.id);
      setFollowState("unfollow");
    }
  };

  const handleUnfollow = () => {
    if (loggedUser) {
      unfollow(follower.id, loggedUser.id);
      setFollowState("follow");
    }
  };

  useEffect(() => {
    if (followRes.data.statusCode === 200) {
      followersGet(loggedUser.id);
      followeesGet(loggedUser.id);
    }
    if (unfollowRes.data.statusCode === 200) {
      followersGet(loggedUser.id);
      followeesGet(loggedUser.id);
    }
  }, [followRes.data, unfollowRes.data]);

  useEffect(() => {
    alignFollowState();
  }, []);

  const alignFollowState = () => {
    if (user.followees.length) {
      for (let i = 0; i < user.followees.length; i++) {
        if (user.followees[i].followeeId === follower.id) {
          return setFollowState("unfollow");
        }
      }
      return setFollowState("follow");
    } else {
      return setFollowState("follow");
    }
  };

  // console.log(user);
  // console.log(follower);

  const renderFollowBtn = () => {
    if (loggedUser) {
      if (followState === "follow") {
        return (
          <button
            key={follow.followeeId}
            onClick={handleFollow}
            className="user-card-flw-btn"
          >
            <i className="fa-solid fa-user-plus me-2 flw-icon"></i>
            Follow
          </button>
        );
      }
      if (followState === "unfollow") {
        return (
          <button
            key={follow.followeeId}
            onClick={handleUnfollow}
            className="user-card-unflw-btn"
          >
            <i className="fa-solid fa-user-minus me-2 unflw-icon"></i>
            Following
          </button>
        );
      }
    }
  };

  return (
    <div className="col user-card-col">
      <div className="user-card">
        <div className="user-card-img-div" style={renderCover()}>
          <img
            className="user-card-img"
            src={renderProfile()}
            alt="User Avatar"
          />
        </div>
        <div className="user-card-txt-div">
          <Link
            to={`/user/${follower.username}`}
            className="user-card-fullname"
          >
            <span className="me-2">{follower.firstname}</span>
            <span>{follower.lastname}</span>
          </Link>
          <p className="user-card-username text-lowercase">
            @{follower.username}
          </p>
        </div>
        <div className="user-card-flw-btn-div mb-2 px-3">
          {renderFollowBtn()}
        </div>
        <div className="user-card-flwr-div">
          <span className="user-card-flwr-count">
            {follower.followers.length}
          </span>
          <p className="user-card-flwr-txt">Followers</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followRes: state.followUserReducer,
    unfollowRes: state.unfollowUserReducer,
    followers: state.getFollowersReducer,
    followees: state.getFolloweesReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId, recipientId) => {
      dispatch(followUser(userId, recipientId));
    },
    unfollow: (userId, recipientId) => {
      dispatch(unfollowUser(userId, recipientId));
    },
    followersGet: (userId) => {
      dispatch(getFollowers(userId));
    },
    followeesGet: (userId) => {
      dispatch(getFollowees(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
