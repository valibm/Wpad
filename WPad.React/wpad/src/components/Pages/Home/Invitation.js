import React from "react";

const Invitation = () => {
  return (
    <div className="share p-3 mb-4">
      <div className="share-top py-5 px-2">
        <h3 className="share-title">Who's missing out?</h3>
        <h6 className="share-txt">Invite them to wpad</h6>
        <div className="invite-email">
          <img src="https://www.wattpad.com/img//invite-friends/ic_invite_wattpad@2x.png" />
        </div>
        <div className="email-provider">
          <form action="">
            <input
              className="invite-input me-2"
              placeholder="Email adress"
              type="text"
            />
            <button className="invite-btn" type="submit">
              Invite
            </button>
          </form>
        </div>
        <p className="response mt-3">You have succesfully sent an invite</p>
      </div>
      <div className="consent">
        <p>We won't contact anyone without your consent.</p>
      </div>
    </div>
  );
};

export default Invitation;
