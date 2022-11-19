import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import UserCard from "./UserCard";
import { getFollowers } from "../../../redux/actions/userAction";

const FollowersList = ({ user, getFollowers, followers }) => {
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));
  useEffect(() => {
    getFollowers(user.id);
  }, []);

  const renderBody = () => {
    if (Array.isArray(followers.data) && followers.data.length) {
      return followers.data.map((follower) => {
        if (loggedUser) {
          if (!(follower.id === loggedUser.id)) {
            return (
              <UserCard key={follower.id} follower={follower} user={user} />
            );
          }
        } else {
          return <UserCard key={follower.id} follower={follower} user={user} />;
        }
      });
    }
  };

  return (
    <div className="userPage-body">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2 g-lg-3">
          {renderBody()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followers: state.getFollowersReducer,
  };
};

export default connect(mapStateToProps, { getFollowers })(FollowersList);
