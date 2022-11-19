import React, { useState, useEffect } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

import { getUser } from "../../../redux/actions/userAction";
import UserHeader from "./UserHeader";
import UserAboutCard from "./UserAboutCard";
import Footer from "../../Header/Footer";
import AddPost from "./AddPost";
import UserPostList from "./UserPostList";
import FollowingsList from "./FollowingsList";
import FollowersList from "./FollowersList";

const UserPage = (props) => {
  const [bodyName, setBodyName] = useState("about");
  const width = useWindowWidth();
  const { username } = useParams();
  const location = useLocation();
  const user = props.user.data;
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));

  useEffect(() => {
    props.getUser(username);
  }, [username]);

  // useEffect(() => {
  // window.location.reload();
  // setBodyName("about");
  //   console.log("salam");
  // }, [location.pathname]);

  const renderBody = (bodyName) => {
    if (bodyName === "about") {
      return (
        <div className="userPage-body">
          <div className="container">
            <div className="row g-3">
              <div className="col-md-4 col-12">
                <UserAboutCard user={user} />
              </div>
              <div className="col-md-8 col-12">
                {renderAddPost()}
                <UserPostList user={user} />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (bodyName === "followers") {
      return <FollowersList user={user} />;
    } else {
      return <FollowingsList user={user} />;
    }
  };

  const renderAddPost = () => {
    if (loggedUser != null) {
      if (loggedUser.id === user.id) {
        return <AddPost />;
      }
    }
  };

  const renderEditBtn = () => {
    if (loggedUser != null) {
      if (loggedUser.id === user.id) {
        return (
          <Link
            to={`/user/edit/${loggedUser.username}`}
            className="userPage-controls-edit-btn"
          >
            <i className="fa-solid fa-gear me-2"></i> Edit Profile
          </Link>
        );
      }
    }
  };

  if (user && user.images) {
    return (
      <>
        <section className="user-page mb-5">
          <UserHeader user={user} />
          <div className="userPage-controls mb-4">
            <div className="container">
              {width > 576 ? (
                <div className="row userPage-controls-g">
                  <div className="col-xxl-3 col-lg-4 col-sm-8 col-12 userPage-controls-g-btns">
                    <button
                      onClick={() => setBodyName("about")}
                      className={
                        bodyName === "about"
                          ? "userPage-controls-btn btn-normalize px-3 active"
                          : "userPage-controls-btn btn-normalize px-3"
                      }
                    >
                      About
                    </button>
                    <button
                      onClick={() => setBodyName("followers")}
                      className={
                        bodyName === "followers"
                          ? "userPage-controls-btn btn-normalize px-3 active"
                          : "userPage-controls-btn btn-normalize px-3"
                      }
                    >
                      Followers
                    </button>
                    <button
                      onClick={() => setBodyName("following")}
                      className={
                        bodyName === "following"
                          ? "userPage-controls-btn btn-normalize px-3 active"
                          : "userPage-controls-btn btn-normalize px-3"
                      }
                    >
                      Following
                    </button>
                  </div>
                  <div className="col-lg-2 col-md-3 col-sm-4 col-12 userPage-controls-edit-div">
                    {renderEditBtn()}
                  </div>
                </div>
              ) : (
                <div className="row userPage-controls-g">
                  <div className="col-lg-2 col-md-3 col-sm-4 col-12 userPage-controls-edit-div">
                    {renderEditBtn()}
                  </div>
                  <div className="col-xxl-3 col-lg-4 col-sm-8 col-12 userPage-controls-g-btns">
                    <button className="userPage-controls-btn btn-normalize px-3">
                      About
                    </button>
                    <button className="userPage-controls-btn btn-normalize px-3">
                      Followers
                    </button>
                    <button className="userPage-controls-btn btn-normalize px-3">
                      Following
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {renderBody(bodyName)}
        </section>
        <Footer />
      </>
    );
  }
  return <h1>Loading...</h1>;
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
  };
};

export default connect(mapStateToProps, { getUser })(UserPage);
