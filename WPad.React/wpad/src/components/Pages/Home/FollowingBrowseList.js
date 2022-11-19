import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";

import Post from "./Post";
import { getBrowseFollowing } from "../../../redux/actions/headingAction";
import { getUser } from "../../../redux/actions/userAction";

const FollowingBrowseList = (props) => {
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);

  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));

  useEffect(() => {
    props.getBrowseFollowing(loggedUser.id, 1);
    if (loggedUser) {
      props.getUser(loggedUser.username);
    }
  }, []);

  useEffect(() => {
    setItems([...items, ...props.headings.data]);
    if (props.headings.data.length === 0) {
      sethasMore(false);
    } else {
      sethasMore(true);
    }
  }, [props.headings.data]);

  const fetchData = async () => {
    props.getBrowseFollowing(loggedUser.id, page);
    setpage(page + 1);
  };

  const renderContent = () => {
    if (loggedUser) {
      if (!(Object.keys(props.user.data) == 0)) {
        return (
          <InfiniteScroll
            dataLength={items.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>You have seen it all</b>
              </p>
            }
          >
            {items.map((item) => {
              return (
                <Post
                  key={item.id}
                  heading={item}
                  userName={item.appUser.userName}
                  user={props.user.data}
                />
              );
            })}
          </InfiniteScroll>
        );
      }
    } else {
      return (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You have seen it all</b>
            </p>
          }
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
    }
  };

  return renderContent();
};

const mapStateToProps = (state) => {
  return {
    headings: state.getBrowseFollowingReducer,
    user: state.userReducer,
  };
};

export default connect(mapStateToProps, { getBrowseFollowing, getUser })(
  FollowingBrowseList
);
