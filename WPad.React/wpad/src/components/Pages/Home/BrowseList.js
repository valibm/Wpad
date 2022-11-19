import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";

import * as actionTypes from "../../../redux/actions/actionTypes";
import Post from "./Post";
import { getBrowseHeadings } from "../../../redux/actions/headingAction";
import { getUser } from "../../../redux/actions/userAction";

const BrowseList = (props) => {
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));

  //   useEffect(() => {
  //     const getPosts = async (page) => {
  //       const url = `${actionTypes.baseUrl}/heading/home/${page}`;
  //       await axios
  //         .get(url, page)
  //         .then((res) => {
  //           setItems(res.data.data.$values);
  //         })
  //         .catch((error) => {
  //           console.log(error.response);
  //         });
  //     };

  //     getPosts(1);
  //   }, []);

  //   const fetchPosts = async () => {
  //     const url = `${actionTypes.baseUrl}/heading/home/${page}`;
  //     return await axios
  //       .get(url, page)
  //       .then((res) => {
  //         // console.log(res.data.data.$values);
  //         return res.data.data.$values;
  //       })
  //       .catch((error) => {
  //         return error.response;
  //       });
  //   };

  //   const fetchData = async () => {
  //     const postsFormServer = await fetchPosts();
  //     // console.log(postsFormServer);
  //     setItems([...items, ...postsFormServer]);
  //     if (postsFormServer.length === 0) {
  //       sethasMore(false);
  //     }
  //     setpage(page + 1);
  //   };

  useEffect(() => {
    props.getBrowseHeadings(1);
    if (loggedUser) {
      props.getUser(loggedUser.username);
    }
  }, []);

  useEffect(() => {
    setItems([...items, ...props.headings.data]);
    if (!props.headings.data.length) {
      sethasMore(false);
    } else {
      sethasMore(true);
    }
  }, [props.headings.data]);

  const fetchData = async () => {
    props.getBrowseHeadings(page);
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
    headings: state.getBrowseHeadingsReducer,
    user: state.userReducer,
  };
};

export default connect(mapStateToProps, { getBrowseHeadings, getUser })(
  BrowseList
);
