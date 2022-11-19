import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getHeadingForUser } from "../../../redux/actions/headingAction";
import Post from "../Home/Post";

const UserPostList = ({ user, getHeadings, headings }) => {
  useEffect(() => {
    getHeadings(user.id);
  }, []);

  const renderBody = () => {
    if (headings.data.length) {
      return headings?.data?.map((heading) => {
        return (
          <Post
            key={heading.id}
            heading={heading}
            userName={heading.appUser.userName}
            page={"user"}
          />
        );
      });
    } else {
      return (
        <div className="userpage-nopost p-3 mb-3">
          <h3>This user hasn't shared any entries yet.</h3>
        </div>
        // <div
        //   className="py-3"
        //   style={{ display: "flex", justifyContent: "center" }}
        // >
        //   <div className="spinner-grow" role="status">
        //     <span className="visually-hidden">Loading...</span>
        //   </div>
        //   <div className="spinner-grow" role="status">
        //     <span className="visually-hidden">Loading...</span>
        //   </div>
        //   <div className="spinner-grow" role="status">
        //     <span className="visually-hidden">Loading...</span>
        //   </div>
        //   <div className="spinner-grow" role="status">
        //     <span className="visually-hidden">Loading...</span>
        //   </div>
        //   <div className="spinner-grow" role="status">
        //     <span className="visually-hidden">Loading...</span>
        //   </div>
        // </div>
      );
    }
  };

  return <div>{renderBody()}</div>;
};

const mapStateToProps = (state) => {
  return {
    headings: state.headingForUserReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHeadings: (userId) => {
      dispatch(getHeadingForUser(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPostList);
