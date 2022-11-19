import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { imgUrl } from "../../../redux/actions/actionTypes";
import { getHeadingCount } from "../../../redux/actions/headingAction";

const UserHeader = (props) => {
  const { user } = props;
  const { count } = props;

  useEffect(() => {
    props.getHeadingCount(user.id);
  }, []);

  const renderName = (showName, user) => {
    if (showName) {
      return (
        <h1 className="userPage-header-fullname-txt">
          {user.firstname} {user.lastname}
        </h1>
      );
    } else {
      return <h1 className="userPage-header-fullname-txt">{user.username}</h1>;
    }
  };

  const renderProfile = () => {
    if (!user.images.length) {
      return `${imgUrl}/user.png`;
    } else {
      for (let i = 0; i < user.images.length; i++) {
        if (user.images[i].isAvatar) {
          return `${imgUrl}/${user.images[i].name}`;
        }
      }
    }
  };

  const renderCover = () => {
    if (!user.images.length) {
      return {
        backgroundImage: "",
      };
    } else {
      for (let i = 0; i < user.images.length; i++) {
        if (user.images[i].isCover) {
          return {
            backgroundImage: `url(${imgUrl}/${user.images[i].name})`,
          };
        }
      }
    }
  };

  const renderCount = () => {
    if (!(Object.keys(count.data) == 0)) {
      return count.data.count;
    }
  };

  return (
    <div className="userPage-header" style={renderCover()}>
      <div className="mb-2">
        <img className="userPage-header-avatar" src={renderProfile()} alt="" />
      </div>
      <div className="userPage-header-fullname">
        {renderName(user.showName, user)}
      </div>
      <div>
        <p className="userPage-header-username text-lowercase">
          @{user.username}
        </p>
      </div>
      <div className="userPage-header-stats">
        <div className="mx-3">
          <span>{user.followees.length}</span>
          <p>Following</p>
        </div>
        <div className="mx-3">
          <span>{renderCount()}</span>
          <p>Entries</p>
        </div>
        <div className="mx-3">
          <span>{user.followers.length}</span>
          <p>Followers</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.headingCountReducer,
  };
};

export default connect(mapStateToProps, { getHeadingCount })(UserHeader);
