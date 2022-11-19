import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { handleLike } from "../../../redux/actions/headingAction";

const PostLike = ({
  heading,
  handleLike,
  handleLikeRes,
  change,
  setChange,
}) => {
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));
  const [likeMount, setLikeMount] = useState(true);
  const [likeUpdate, setLikeUpdate] = useState(false);
  const [likeCount, setLikeCount] = useState({ value: heading.likeCount });

  const renderLikeBtn = () => {
    if (loggedUser) {
      if (likeMount) {
        if (heading.likes.length) {
          return heading.likes.map((like) => {
            if (like.appUserId === loggedUser.id) {
              return "btn-normalize post-footer-btn post-footer-btn-active";
            } else {
              return "btn-normalize post-footer-btn";
            }
          });
        } else {
          return "btn-normalize post-footer-btn";
        }
      } else {
        if (likeUpdate) {
          return "btn-normalize post-footer-btn";
        } else {
          return "btn-normalize post-footer-btn post-footer-btn-active";
        }
      }
    } else {
      return "btn-normalize post-footer-btn";
    }
  };

  const handleClick = () => {
    if (loggedUser && heading) {
      handleLike(heading.id, loggedUser.id);
      if (likeMount) {
        if (heading.likes.length) {
          heading.likes.map((like) => {
            if (like.appUserId === loggedUser.id) {
              setLikeUpdate(true);
            } else {
              setLikeUpdate(false);
            }
          });
        }
      }
      if (!likeMount) {
        if (!likeUpdate) {
          setLikeCount({ value: likeCount.value - 1 });
          setLikeUpdate(!likeUpdate);
        } else {
          setLikeCount({ value: likeCount.value + 1 });
          setLikeUpdate(!likeUpdate);
        }
      } else {
        if (likeUpdate) {
          setLikeCount({ value: likeCount.value - 1 });
        } else {
          setLikeCount({ value: likeCount.value + 1 });
        }
      }
      if (likeMount) {
        setLikeMount(!likeMount);
      }
      console.log(likeUpdate);
    }
  };

  return (
    <div className="col-sm-3 col-4 like-div me-3">
      <button type="button" onClick={handleClick} className={renderLikeBtn()}>
        <i className="fa-regular fa-thumbs-up me-2"></i>
        <span className="post-footer-btn-txt">{likeCount.value} LIKES</span>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    handleLikeRes: state.handleLikeReducer,
  };
};

export default connect(mapStateToProps, { handleLike })(PostLike);
