import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";

import AddReply from "./AddReply";
import { getReplyForComment } from "../../../redux/actions/repliesAction";
import { imgUrl } from "../../../redux/actions/actionTypes";
import Reply from "./Reply";
import ReportModal from "./ReportModal";

const Comment = (props) => {
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));
  const [showReply, setShowReply] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [showAddReply, setShowAddReply] = useState(false);
  const [replySubmit, setReplySubmit] = useState(true);

  useEffect(() => {
    props.getReplies(props.comment.id);
  }, [replySubmit]);

  const handleShowReply = (value) => {
    setShowAddReply(value);
  };

  const handleReplies = (showReply) => {
    if (showReply) {
      return "replies-section d-none";
    } else {
      return "replies-section";
    }
  };

  const renderReport = (showReport) => {
    if (!showReport) {
      return "comment-footer-menu-report d-none";
    } else {
      return "comment-footer-menu-report";
    }
  };

  const renderAddReply = () => {
    if (showAddReply) {
      return (
        <AddReply
          commentId={props.comment.id}
          changeShowReply={handleShowReply}
          showReply={showAddReply}
        />
      );
    }
  };

  const renderReplyBtn = () => {
    if (props.comment.replies?.length) {
      return (
        <button
          onClick={() => setShowReply(!showReply)}
          className="replies-btn text-uppercase"
        >
          {props.comment.replies?.length} replies
          <i className="fa-solid fa-chevron-down"></i>
        </button>
      );
    } else {
      return;
    }
  };

  const renderReplies = () => {
    const replies = props.comment.replies;
    if (Array.isArray(replies) && replies.length) {
      return replies.map((reply) => {
        return <Reply key={reply.id} reply={reply} />;
      });
    } else {
      return <h3>Loading ...</h3>;
    }
  };

  const renderProfile = () => {
    if (!(Object.keys(props.comment.appUser.images) == 0)) {
      if (props.comment.appUser.images.length) {
        for (let i = 0; i < props.comment.appUser.images.length; i++) {
          if (props.comment.appUser.images[i].isAvatar == true) {
            return `${imgUrl}/${props.comment.appUser.images[i].name}`;
          }
        }
      } else {
        return `${imgUrl}/user.png`;
      }
    }
  };

  const renderCommentFooter = () => {
    if (loggedUser != null) {
      return (
        <div className="comment-footer py-2">
          <div className="me-3">
            <button
              onClick={() => setShowAddReply(!showAddReply)}
              className="comment-footer-reply-btn"
            >
              <i className="fa-regular fa-message me-2"></i>
              <span className="reply-txt">Reply</span>
            </button>
          </div>
          <div className="comment-footer-menu">
            <button
              onClick={() => setShowReport(!showReport)}
              className="comment-footer-menu-btn"
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <div className={renderReport(showReport)}>
              <button
                type="button"
                className="comment-footer-menu-report-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="fa-regular fa-flag me-2"></i>
                <span className="report-txt">Report</span>
              </button>
              <ReportModal title="Report comment" />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="comment">
      <div className="comment-side">
        <a href="">
          <img
            className="comment-user-avatar"
            src={renderProfile()}
            alt="User avatar"
          />
        </a>
      </div>
      <div style={{ width: "100%" }}>
        <div className="comment-body">
          <div className="comment-body-header">
            <a className="txt-username me-1" href="">
              {props.comment.appUser.userName}
            </a>
            <span className="single-dot me-1"></span>
            <span className="txt-time me-1">
              <TimeAgo date={props.comment.createdDate} />
            </span>
          </div>
          <div className="comment-body-content">
            <p>{props.comment.content}</p>
          </div>
          {renderCommentFooter()}
          {renderAddReply()}
          <div className="mb-2">{renderReplyBtn()}</div>
          <div className={handleReplies(showReply)}>{renderReplies()}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    replies: state.replyForCommentReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReplies: (commentId) => {
      dispatch(getReplyForComment(commentId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
