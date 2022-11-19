import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import UserCard from "./UserCard";
import {
  getFollowees,
  checkFollowRange,
} from "../../../redux/actions/userAction";

const FollowingsList = ({
  user,
  getFollowees,
  followees,
  checkFollowRange,
  checks,
}) => {
  const [followerIds, setFollowerIds] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));
  useEffect(() => {
    getFollowees(user.id);
  }, [user]);

  const renderBody = () => {
    if (Array.isArray(followees.data) && followees.data.length) {
      return followees.data.map((followee) => {
        if (loggedUser) {
          if (!(followee.id === loggedUser.id)) {
            return (
              <UserCard key={followee.id} follower={followee} user={user} />
            );
          }
        } else {
          return <UserCard key={followee.id} follower={followee} user={user} />;
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
    followees: state.getFolloweesReducer,
    checks: state.checkFollowRangeReducer,
  };
};

export default connect(mapStateToProps, { getFollowees, checkFollowRange })(
  FollowingsList
);
