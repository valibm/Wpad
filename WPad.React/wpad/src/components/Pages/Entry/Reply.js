import React, { useState } from "react";
import TimeAgo from "react-timeago";

import ReportModal from "./ReportModal";
import { imgUrl } from "../../../redux/actions/actionTypes";

const Reply = (props) => {
  const [showReport, setShowReport] = useState(false);

  // console.log(props.reply);

  const renderReport = (showReport) => {
    if (!showReport) {
      return "reply-footer-menu-report d-none";
    } else {
      return "reply-footer-menu-report";
    }
  };

  const renderProfile = () => {
    if (!(Object.keys(props.reply.appUser.images) == 0)) {
      if (props.reply.appUser.images.length) {
        for (let i = 0; i < props.reply.appUser.images.length; i++) {
          if (props.reply.appUser.images[i].isAvatar == true) {
            return `${imgUrl}/${props.reply.appUser.images[i].name}`;
          }
        }
      } else {
        return `${imgUrl}/user.png`;
      }
    }
  };

  // console.log(props.reply);

  return (
    <div className="reply mb-2">
      <div className="reply-side">
        <a href="">
          <img className="reply-user-avatar" src={renderProfile()} alt="" />
        </a>
      </div>
      <div style={{ width: "100%" }}>
        <div className="reply-body">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="reply-body-header">
              <a className="me-1" href="">
                {props.reply.appUser.userName}
              </a>
              <span className="single-dot me-1"></span>
              <span className="reply-time-ago me-1">
                <TimeAgo date={props.reply.createdDate} />
              </span>
            </div>
            <div className="reply-footer-menu">
              <button
                onClick={() => setShowReport(!showReport)}
                className="reply-footer-menu-btn"
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
              <div className={renderReport(showReport)}>
                <button
                  type="button"
                  className="reply-footer-menu-report-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fa-regular fa-flag me-2"></i>
                  <span className="report-txt">Report</span>
                </button>
                <button type="button" className="reply-footer-menu-report-btn">
                  <i className="fa-solid fa-trash-can me-2"></i>
                  <span className="report-txt">Remove</span>
                </button>
                <ReportModal title="Report reply" />
              </div>
            </div>
          </div>
          <div className="reply-body-content">
            <p>
              <span className="replied-user me-2">@valibm229</span>
              {props.reply.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
