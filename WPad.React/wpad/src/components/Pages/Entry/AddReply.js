import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { getReplyForComment } from "../../../redux/actions/repliesAction";
import { getCommentForHeading } from "../../../redux/actions/commentAction";
import { postReply } from "../../../redux/actions/repliesAction";

const input = document.getElementById("add-reply-input");

const AddReply = (props) => {
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));
  const { id } = useParams();

  const defaultCommentState = {
    commentId: props.commentId,
    appUserId: loggedUser.id,
  };
  const [replyState, setReplyState] = useState(defaultCommentState);
  const [replySubmit, setReplySubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReplyState({ ...replyState, ...{ [name]: value } });
  };

  const handleSubmit = (commentId) => {
    setReplyState({ ...replyState, ...{ commentId: commentId } });
    props.postReply(replyState);
    setReplySubmit(!replySubmit);
  };

  useEffect(() => {
    if (props.postReplyResp.data.statusCode === 200) {
      props.getCommentForHeading(id);
    }
    if (replySubmit) {
      props.changeShowReply(!props.showReply);
    }
  }, [props.postReplyResp.data]);

  return (
    <div className="add-reply">
      <div className="add-reply-side">{/* {renderProfile()} */}</div>
      <div className="add-reply-body">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(props.commentId);
          }}
        >
          <div className="add-reply-body-header mb-1">
            <input
              id="add-reply-input"
              type="text"
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder="What are your thoughts?"
              name="content"
            />
          </div>
          <div className="add-reply-body-footer">
            <button
              className="text-uppercase add-reply-body-footer-cancel me-2"
              type="button"
            >
              Cancel
            </button>
            <button
              className="text-uppercase add-reply-body-footer-reply ms-2"
              type="submit"
            >
              Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    postReplyResp: state.postReplyReducer,
  };
};

export default connect(mapStateToProps, {
  postReply,
  getReplyForComment,
  getCommentForHeading,
})(AddReply);
