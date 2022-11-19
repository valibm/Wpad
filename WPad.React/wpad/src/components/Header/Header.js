import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

import { imgUrl } from "../../redux/actions/actionTypes";
import LoginModal from "../Authentication/LoginModal";
import SearchInput from "./SearchInput";
import UserView from "./UserView";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("loginUser"));

  const renderContent = () => {
    if (token != null) {
      return <UserView userData={userData} />;
    } else {
      return (
        <>
          <button
            className="login-modal-btn"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            Login
          </button>
          <LoginModal />
        </>
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((m) => !m);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <Link to="/">
            <img
              className="header-logo-img"
              src={`${imgUrl}/wpad-2.png`}
              alt="Logo image"
            />
          </Link>
        </div>
        <nav className={`header-content-nav ${menuOpen ? "isMenu" : ""}`}>
          <div>
            <ul className="nav-list">
              <li className="nav-list-item">
                <SearchInput />
              </li>
              <li className="nav-list-item">
                <Link to="/channels" className="nav-list-item-link">
                  Channels
                </Link>
              </li>
              <li className="nav-list-item">
                <a className="nav-list-item-link">Rooms</a>
              </li>
            </ul>
          </div>
          {renderContent()}
        </nav>
        <div className="header-content-toggle">
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
