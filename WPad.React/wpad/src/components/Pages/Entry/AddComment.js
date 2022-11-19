import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { imgUrl } from "../../../redux/actions/actionTypes";
import { getUserImages } from "../../../redux/actions/userAction";
import { postComment } from "../../../redux/actions/commentAction";
import { getCommentForHeading } from "../../../redux/actions/commentAction";

const input = document.getElementById("add-comment-input");

const AddComment = (props) => {
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));
  const { id } = useParams();
  const inputRef = useRef();

  const defaultCommentState = {
    headingId: id,
    appUserId: loggedUser.id,
  };
  const [commentState, setCommentState] = useState(defaultCommentState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentState({ ...commentState, ...{ [name]: value } });
  };

  const handleSubmit = () => {
    props.postComment(commentState);
    props.changeSubmit(!props.commentSubmit);
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (props.postCommentRes.data.statusCode === 200) {
      props.getCommentForHeading(id);
    }
  }, [props.postCommentRes.data]);

  const renderProfile = () => {
    if (props.userImage.data.data) {
      for (let i = 0; i < props.userImage.data.data.length; i++) {
        if (props.userImage.data.data[i].isAvatar) {
          return (
            <a href="">
              <img
                style={{ objectFit: "cover" }}
                className="comment-user-avatar"
                src={`${imgUrl}/${props.userImage.data.data[i].name}`}
                alt="User avatar"
              />
            </a>
          );
        }
      }
    } else {
      return (
        <a>
          <img
            className="comment-user-avatar"
            src={`${imgUrl}/user.png`}
            alt="User avatar"
          />
        </a>
      );
    }
  };

  return (
    <div className="add-comment-section p-3 mb-3">
      <div className="add-comment">
        <div className="add-comment-side">{renderProfile()}</div>
        <div className="add-comment-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="add-comment-body-header mb-1">
              <input
                id="add-comment-input"
                type="text"
                onChange={handleChange}
                ref={inputRef}
                required
                autoComplete="off"
                placeholder="What are your thoughts?"
                name="content"
              />
            </div>
            <div className="add-comment-body-footer">
              <button
                className="text-uppercase add-comment-body-footer-cancel me-2"
                type="button"
                onClick={() => (inputRef.current.value = "")}
              >
                Cancel
              </button>
              <button
                className="text-uppercase add-comment-body-footer-comment ms-2"
                type="submit"
              >
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userImage: state.userImagesReducer,
    postCommentRes: state.postCommentReducer,
  };
};

export default connect(mapStateToProps, {
  getUserImages,
  postComment,
  getCommentForHeading,
})(AddComment);
