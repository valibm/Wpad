import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { getHeading } from "../../../redux/actions/headingAction";
import { getCommentForHeading } from "../../../redux/actions/commentAction";
import Post from "../Home/Post";
import Footer from "../../Header/Footer";
import AddComment from "./AddComment";
import CommentList from "./CommentList";

const EntryPage = (props) => {
  const heading = props.heading.data;
  const comments = props.comments.data;
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));
  const [commentSubmit, setCommentSubmit] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    props.get(id);
    props.getComments(id);
  }, [commentSubmit]);

  const handleCommentSubmit = (value) => {
    setCommentSubmit(value);
  };

  console.log(comments);

  const renderAddPost = () => {
    if (loggedUser != null) {
      return (
        <div className="col-12 col-md-8">
          <AddComment
            headingId={heading.id}
            changeSubmit={handleCommentSubmit}
            commentSubmit={commentSubmit}
          />
        </div>
      );
    } else {
      return;
    }
  };

  const renderPost = () => {
    if (!(Object.keys(heading) == 0)) {
      return (
        <Post
          heading={heading}
          userName={heading.appUser.userName}
          page={"entry"}
        />
      );
    }
    return <h1>Loading...</h1>;
  };

  const renderComment = () => {
    if (Array.isArray(comments) && comments.length) {
      return (
        <div className="col-12 col-md-8">
          <CommentList comments={comments} />
        </div>
      );
    }
  };

  return (
    <>
      <div className="entry">
        <div className="container entry-gen">
          <div className="row justify-content-center g-3">
            <div className="col-12 col-md-8">{renderPost()}</div>
            {renderAddPost()}
            {renderComment()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    heading: state.headingReducer,
    comments: state.commentForHeadingReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get: (headingId) => {
      dispatch(getHeading(headingId));
    },
    getComments: (headingId) => {
      dispatch(getCommentForHeading(headingId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryPage);
