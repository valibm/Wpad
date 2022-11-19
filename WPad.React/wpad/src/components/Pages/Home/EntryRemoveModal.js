import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { HiOutlineExclamation } from "react-icons/hi";
import { connect } from "react-redux";

import { removeHeading } from "../../../redux/actions/headingAction";
import { getHeadingForUser } from "../../../redux/actions/headingAction";

const ReportModal = (props) => {
  const [id, setId] = useState(props.id);
  const [submit, setSubmit] = useState(true);

  useEffect(() => {
    if (props.resp.data.statusCode === 200) {
      props.getHeadingForUser(props.userId);
    }
  }, [props.resp]);

  const handleClick = () => {
    props.removeHeading(props.id);
    setSubmit(!submit);
  };

  return (
    <div
      className={`modal fade`}
      id={`modal${id}`}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              Remove heading
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss={`modal`}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="text-center">
              <HiOutlineExclamation size={120} style={{ color: "#ED2939" }} />
            </div>
            <div className="text-center">
              <span>
                Are you sure you want to remove your heading? This process can
                not be undone.{id}
              </span>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="modal-cancel"
              data-bs-dismiss={`modal`}
            >
              Close
            </button>
            <button
              type="button"
              className="modal-remove"
              data-bs-dismiss={`modal`}
              onClick={handleClick}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    resp: state.removeHeading,
  };
};

export default connect(mapStateToProps, { removeHeading, getHeadingForUser })(
  ReportModal
);
