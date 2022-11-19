import React, { useRef, useState } from "react";
import Comment from "./Comment";

const CommentList = (props) => {
  const comments = props.comments;

  console.log(comments);

  const renderComment = () => {
    return comments.map((comment) => {
      return <Comment key={comment.id} comment={comment} />;
    });
  };

  return <div className="comment-section p-3 mb-3">{renderComment()}</div>;
};

export default CommentList;
