import React, { useEffect, useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { searchHeadings } from "../../../redux/actions/headingAction";
import Invitation from "./Invitation";
import Trending from "./Trending";
import Post from "./Post";
import BrowseList from "./BrowseList";
import FollowingBrowseList from "./FollowingBrowseList";

const Home = (props) => {
  const [bodyName, setBodyName] = useState("browse");
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));
  const width = useWindowWidth();

  const renderBody = () => {
    if (bodyName === "browse") {
      return <BrowseList />;
    }
    if (bodyName === "home") {
      return <FollowingBrowseList />;
    }
    if (bodyName === "search") {
      if (items.length) {
        return (
          <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage
          >
            {items.map((item) => {
              return (
                <Post
                  key={item.id}
                  heading={item}
                  userName={item.appUser.userName}
                />
              );
            })}
          </InfiniteScroll>
        );
      } else {
        return (
          <div className="not-found p-3">
            <h3>
              No exact matches found for <span>"{value}"</span>
            </h3>
          </div>
        );
      }
    }
  };

  const renderControlls = () => {
    if (loggedUser != null) {
      return (
        <div className="home-controlls p-3 mb-4">
          <div className="home-controlls-btns">
            <button
              onClick={() => setBodyName("browse")}
              className={
                bodyName === "browse"
                  ? "browse-btn btn-normalize controll-active"
                  : "browse-btn btn-normalize"
              }
            >
              Browse
            </button>
            <button
              onClick={() => setBodyName("home")}
              className={
                bodyName === "home"
                  ? "browse-btn btn-normalize controll-active"
                  : "browse-btn btn-normalize"
              }
            >
              Home
            </button>
          </div>
        </div>
      );
    } else {
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.searchHeadings(value, 1);
    setBodyName("search");
  };

  useEffect(() => {
    setItems([...items, ...props.headings.data]);
    if (props.headings.data.length === 0) {
      sethasMore(false);
    } else {
      sethasMore(true);
    }
  }, [props.headings.data]);

  const fetchData = async () => {
    props.searchHeadings(value, page);
    setpage(page + 1);
  };

  return (
    <>
      {width > 769 ? (
        <div className="home-main">
          <div className="container home-gen">
            <div className="row g-3">
              <div className="col-8">
                <div className="search-section p-2 mb-3">
                  <form onSubmit={handleSubmit}>
                    <div className="input-group input-group-lg">
                      <input
                        type="text"
                        className="form-control home-search-input px-3"
                        onChange={(e) => {
                          if (e.target.value) {
                            setValue(e.target.value);
                            setItems([]);
                          } else {
                            setBodyName("browse");
                            setValue(e.target.value);
                            setItems([]);
                          }
                        }}
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        placeholder="Search for other entries ..."
                      />
                      <span
                        className="input-group-text home-search-icon"
                        id="inputGroup-sizing-lg"
                      >
                        <button type="submit" className="btn-normalize">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                {renderBody()}
              </div>
              <div className="col-4 home-left">
                {renderControlls()}
                <Invitation />
                <Trending />
                <div className="footer p-3">
                  <div className="footer-links">
                    <a href="">Terms of use</a>
                    <a href="">Content policy</a>
                  </div>
                  <span>Wpad Inc © 2022. All rights reserved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="home-main">
          <div className="container home-gen">
            <div className="row">
              <div className="col-12">
                <div className="home-controlls p-3 mb-4">
                  <div className="home-controlls-btns">
                    <button
                      onClick={() => setBodyName("browse")}
                      className={
                        bodyName === "browse"
                          ? "browse-btn btn-normalize controll-active"
                          : "browse-btn btn-normalize"
                      }
                    >
                      Browse
                    </button>
                    <button
                      onClick={() => setBodyName("home")}
                      className={
                        bodyName === "home"
                          ? "browse-btn btn-normalize controll-active"
                          : "browse-btn btn-normalize"
                      }
                    >
                      Home
                    </button>
                  </div>
                </div>
                <Invitation />
                <Trending />
                <div className="search-section p-2 mb-3">
                  <form action="">
                    <div className="input-group input-group-lg">
                      <input
                        type="text"
                        className="form-control home-search-input px-3"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-lg"
                        placeholder="Search for other entries ..."
                      />
                      <span
                        className="input-group-text home-search-icon"
                        id="inputGroup-sizing-lg"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </span>
                    </div>
                  </form>
                  <div className="result-count">
                    <p className="result-response">
                      0 <span className="result-response-mid">results for</span>
                      "salam"
                    </p>
                    <h3>No exact matches found</h3>
                  </div>
                </div>
                {renderBody()}
                <div className="footer p-3 d-none">
                  <div className="footer-links">
                    <a href="">Terms of use</a>
                    <a href="">Content policy</a>
                  </div>
                  <span>Wpad Inc © 2022. All rights reserved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    headings: state.searchHeadingsReducer,
  };
};

export default connect(mapStateToProps, { searchHeadings })(Home);
