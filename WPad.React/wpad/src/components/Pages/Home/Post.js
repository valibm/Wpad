import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import TimeAgo from "react-timeago";
import { Link, useLocation } from "react-router-dom";

import PostImage from "./PostImage";
import PostLike from "./PostLike";
import EntryRemoveModal from "./EntryRemoveModal";
import { followUser, unfollowUser } from "../../../redux/actions/userAction";
import { checkFollow } from "../../../redux/actions/userAction";
import { imgUrl } from "../../../redux/actions/actionTypes";
import { getUser } from "../../../redux/actions/userAction";

const Post = ({
  heading,
  userName,
  followCheck,
  followCheckRes,
  follow,
  unfollow,
  // userGet,
  // userRes,
  user,
}) => {
  const location = useLocation();
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));
  const [followMount, setFollowMount] = useState(true);
  const [followUpdate, setFollowUpdate] = useState(true);
  const [followState, setFollowState] = useState("");
  // const user = userRes.data;

  // useEffect(() => {
  //   if (loggedUser && loggedUser.id != heading.appUser.id) {
  //     followCheck(loggedUser.id, heading.appUser.id);
  //   }
  // }, [heading]);

  // useEffect(() => {
  //   if (loggedUser) {
  //     userGet(loggedUser.username);
  //   }
  // }, []);

  // console.log(user);

  const renderProfile = () => {
    if (heading.appUser.images.length) {
      for (let i = 0; i < heading.appUser.images.length; i++) {
        if (heading.appUser.images[i].isAvatar == true) {
          return `${imgUrl}/${heading.appUser.images[i].name}`;
        }
      }
    } else {
      return `${imgUrl}/user.png`;
    }
  };

  const renderContent = (content) => {
    if (window.location.href.indexOf("entry") != -1) {
      return (
        <div className="post-content mt-3">
          <p className="post-content-txt">{content}</p>
        </div>
      );
    } else {
      if (content.length > 500) {
        return (
          <div className="post-content mt-3">
            <p className="post-content-txt">
              {content.slice(0, 500)}{" "}
              <Link
                to={`/entry/${heading.id}`}
                className="readMore-btn"
                href="https://google.com"
              >
                Read More ...
              </Link>
            </p>
          </div>
        );
      } else {
        return (
          <div className="post-content mt-3">
            <p className="post-content-txt">{content}</p>
          </div>
        );
      }
    }
  };

  const handleFollow = () => {
    follow(heading.appUser.id, loggedUser.id);
    setFollowState("unfollow");
    // if (followMount) {
    //   setFollowMount(!followMount);
    // }
    // if (followMount) {
    //   setFollowUpdate(followCheckRes.data.state);
    // } else {
    //   setFollowUpdate(!followUpdate);
    // }
  };

  const handleUnfollow = () => {
    unfollow(heading.appUser.id, loggedUser.id);
    setFollowState("follow");
    // if (followMount) {
    //   setFollowMount(!followMount);
    // }
    // if (followMount) {
    //   setFollowUpdate(followCheckRes.data.state);
    // } else {
    //   setFollowUpdate(!followUpdate);
    // }
  };

  useEffect(() => {
    if (user) {
      alignFollowState();
    }
  }, []);

  const alignFollowState = () => {
    if (loggedUser && loggedUser.id != heading.appUser.id) {
      if (!(Object.keys(user) == 0)) {
        if (user.followees.length) {
          for (let i = 0; i < user.followees.length; i++) {
            if (user.followees[i].followeeId === heading.appUser.id) {
              return setFollowState("unfollow");
              // return (
              //   <button
              //     // onClick={handleUnfollow}
              //     className="unfollow-btn py-1"
              //   >
              //     Following
              //   </button>
              // );
            }
          }
          return setFollowState("follow");
          // return (
          //   <button
          //     // onClick={handleFollow}
          //     className="follow-btn py-1 px-3"
          //   >
          //     Follow +
          //   </button>
          // );
        } else {
          return setFollowState("follow");
          // return (
          //   <button
          //     // onClick={handleFollow}
          //     className="follow-btn py-1 px-3"
          //   >
          //     Follow +
          //   </button>
          // );
        }
      }
    }
    // else {
    //   return;
    // }
  };

  const renderFollowBtn = () => {
    if (loggedUser && loggedUser.id != heading.appUser.id) {
      if (followState === "follow") {
        return (
          <button onClick={handleFollow} className="follow-btn py-1 px-3">
            Follow +
          </button>
        );
      }
      if (followState === "unfollow") {
        return (
          <button onClick={handleUnfollow} className="unfollow-btn py-1">
            Following
          </button>
        );
      }
    } else {
      return;
    }
  };

  // const renderFollowBtn = () => {
  //   if (loggedUser && loggedUser.id != heading.appUser.id) {
  //     if (followMount) {
  //       if (followCheckRes.data.appUserId == loggedUser.id) {
  //         if (followCheckRes.data.followeeId == heading.appUser.id) {
  //           if (followCheckRes.data.state) {
  //             return (
  //               <button
  //                 key={heading.id}
  //                 onClick={handleFollow}
  //                 className="follow-btn py-1 px-3"
  //               >
  //                 Follow +
  //               </button>
  //             );
  //           } else {
  //             return (
  //               <button
  //                 key={heading.id}
  //                 onClick={handleUnfollow}
  //                 className="follow-btn py-1 px-3"
  //               >
  //                 Unfollow -
  //               </button>
  //             );
  //           }
  //         }
  //       } else {
  //         return;
  //       }
  //     } else {
  //       if (followUpdate) {
  //         return (
  //           <button
  //             key={heading.id}
  //             onClick={handleUnfollow}
  //             className="follow-btn py-1 px-3"
  //           >
  //             Unfollow -
  //           </button>
  //         );
  //       } else {
  //         return (
  //           <button
  //             key={heading.id}
  //             onClick={handleFollow}
  //             className="follow-btn py-1 px-3"
  //           >
  //             Follow +
  //           </button>
  //         );
  //       }
  //     }
  //   }
  // };

  const postClass = () => {
    if (location.pathname.includes("user")) {
      return "post-userpage";
    } else {
      return "post";
    }
  };

  return (
    <div className={`${postClass()} p-3 mb-3`}>
      <div className="post-header">
        <div className="post-user">
          <Link to={`/user/${heading.appUser.userName}`} className="user-sec">
            <img
              className="me-2 header-user-image"
              src={renderProfile()}
              alt="User avatar"
            />
            <h5>{userName}</h5>
          </Link>
          {renderFollowBtn()}
        </div>
        <div className="post-time-ago">
          <span className="view-span">
            <i className="fa-regular fa-eye mx-1"></i> {heading.channel.name}
            <span className="single-dot mx-1"></span>
            <TimeAgo date={heading.createdDate} />
          </span>
        </div>
      </div>
      <div className="post-body my-2">
        <Link to={`/entry/${heading.id}`} className="post-title">
          {heading.title}
        </Link>
        {renderContent(heading.content)}
        <PostImage images={heading.images} />
      </div>
      <div className="row post-footer py-2 pe-1">
        <PostLike heading={heading} />
        <div className="dropdown" style={{ display: "contents" }}>
          <button
            className="dropdown-toggle dropdown-title btn-normalize post-drp-btn"
            style={{ marginRight: "0.25rem" }}
            role="button"
            id="dropdownMenuLink1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>

          <ul
            className="dropdown-menu dropdown-list"
            aria-labelledby="dropdownMenuLink1"
          >
            <li>
              <button className="dropdown-item">
                <i className="fa-regular fa-bookmark me-2"></i>
                <span>Save</span>
              </button>
            </li>
            <li className="divider"></li>
            <li>
              <button className="dropdown-item">
                <i className="fa-regular fa-flag me-2"></i>
                <span>Report</span>
              </button>
            </li>
            <li className="divider"></li>
            <li>
              <button
                type="button"
                className="dropdown-item"
                data-bs-toggle={`modal`}
                data-bs-target={`#modal${heading.id}`}
              >
                <i className="fa-solid fa-trash-can me-2"></i>
                <span>Remove</span>
              </button>
              {/* <button className="dropdown-item">
                <i className="fa-solid fa-trash-can me-2"></i>
                <span>Remove</span>
              </button> */}
            </li>
          </ul>
        </div>
      </div>
      <EntryRemoveModal id={heading.id} userId={heading.appUser.id} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followCheckRes: state.checkFollowReducer,
    followRes: state.followUserReducer,
    unfollowRes: state.unfollowUserReducer,
    // userRes: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    followCheck: (userIc, recipientId) => {
      dispatch(checkFollow(userIc, recipientId));
    },
    follow: (userId, recipientId) => {
      dispatch(followUser(userId, recipientId));
    },
    unfollow: (userId, recipientId) => {
      dispatch(unfollowUser(userId, recipientId));
    },
    // userGet: (userId) => {
    //   dispatch(getUser(userId));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
