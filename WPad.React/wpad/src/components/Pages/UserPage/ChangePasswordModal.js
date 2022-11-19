import React from "react";
import ReactDOM from "react-dom";

const ChangePasswordModal = () => {
  return ReactDOM.createPortal(
    <div
      className="modal fade"
      id="changePasswordModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Change Password
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
              <div className="mb-3">
                <label className="label-dark" htmlFor="current-password">
                  Current Password
                </label>
                <input
                  className="input-st"
                  type="password"
                  id="current-password"
                />
              </div>
              <div className="Forgot-password-div mb-3">
                <a href="">forgot your password?</a>
              </div>
              <div className="mb-3">
                <label className="label-dark" htmlFor="new-password">
                  New Password
                </label>
                <input className="input-st" type="password" id="new-password" />
              </div>
              <div className="mb-3">
                <label className="label-dark" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  className="input-st"
                  type="password"
                  id="confirm-password"
                />
              </div>
              <button className="btn-bg-dark mt-5 mb-1" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default ChangePasswordModal;
