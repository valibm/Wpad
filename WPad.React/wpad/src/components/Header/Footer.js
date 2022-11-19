import React from "react";
import { imgUrl } from "../../redux/actions/actionTypes";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row justify-content-between footer-body py-4">
          <div className="footer-logo col-4">
            <img
              className="footer-logo-img"
              src={`${imgUrl}/wpad-light.png`}
              alt=""
            />
            <span>Wpad Inc © 2022. All rights reserved</span>
          </div>
          <div className="footer-list col-4">
            <a href="">Terms of use</a>
            <a href="">Content policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
