import React from "react";
import ReactDOM from "react-dom";

const ReportModal = (props) => {
  return ReactDOM.createPortal(
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {props.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form action="">
              <div className="comment-report-inupts">
                <input className="report-radio me-3" type="radio" />
                <label className="report-label">Sexual content</label>
              </div>
              <div className="comment-report-inupts">
                <input className="report-radio me-3" type="radio" />
                <label className="report-label">
                  Violent or repulsive content
                </label>
              </div>
              <div className="comment-report-inupts">
                <input className="report-radio me-3" type="radio" />
                <label className="report-label">
                  Hateful or abusive content
                </label>
              </div>
              <div className="comment-report-inupts">
                <input className="report-radio me-3" type="radio" />
                <label className="report-label">Harassment or bullying</label>
              </div>
              <div className="comment-report-inupts">
                <input className="report-radio me-3" type="radio" />
                <label className="report-label">
                  Harmful or dangerous acts
                </label>
              </div>
              <div style={{ width: "100%" }}>
                <div>
                  <p className="txt-lg">Explain</p>
                </div>
                <textarea
                  className="report-explanation-input"
                  placeholder="(Optional)"
                ></textarea>
              </div>
              <div className="my-3">
                <span className="report-description">
                  Flagged entries and comments are reviewed by wPad staff 24
                  hours a day, seven days a week to determine whether they
                  violate Community Guidelines. Accounts are penalised for
                  Community Guidelines violations, and serious or repeated
                  violations can lead to account termination.
                </span>
              </div>
              <div>
                <button className="btn-bg-dark mt-5 mb-1" type="submit">
                  Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default ReportModal;
