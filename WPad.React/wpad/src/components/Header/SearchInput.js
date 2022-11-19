import React, { useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { searchUsers } from "../../redux/actions/userAction";
import { imgUrl } from "../../redux/actions/actionTypes";

const SearchInput = (props) => {
  const inputRef = useRef();

  const handleChange = (e) => {
    props.searchUsers(e.target.value);
  };

  const renderSearchBox = () => {
    if (inputRef.current?.value) {
      if (props.users.data.length) {
        if (props.users.data.length > 4) {
          return (
            <div className="search-user-list">
              <ul className="search-list">{renderSearchResult()}</ul>
            </div>
          );
        } else {
          return (
            <div className="search-user-list">
              <ul className="search-list">{renderSearchResult()}</ul>
            </div>
          );
        }
      } else {
        return (
          <div className="search-user-list">
            <ul className="search-list">
              <li className="search-redirect">
                <span>No results</span>
              </li>
            </ul>
          </div>
        );
      }
    }
    if (
      inputRef.current?.value == "" ||
      inputRef.current?.value === undefined
    ) {
      return;
    }
  };

  const renderSearchResult = () => {
    if (props.users.data.length > 4) {
      const usersArray = props.users.data.slice(0, 4);
      return usersArray.map((user, index) => {
        if (index != 3) {
          return (
            <React.Fragment key={user.id}>
              <li key={user.id} className="search-list-item">
                <Link to={`/user/${user.username}`}>
                  <img
                    className="search-list-image"
                    src={renderProfile(user)}
                    alt="User image"
                  />
                  <span className="search-list-text">{user.username}</span>
                </Link>
              </li>
              <li className="divider"></li>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={user.id}>
              <li key={user.id} className="search-list-item">
                <Link to={`/user/${user.username}`}>
                  <img
                    className="search-list-image"
                    src={renderProfile(user)}
                    alt="User image"
                  />
                  <span className="search-list-text">{user.username}</span>
                </Link>
              </li>
              <li className="divider"></li>
              <li className="search-redirect">
                <a>See more</a>
              </li>
            </React.Fragment>
          );
        }
      });
    } else {
      return props.users.data.map((user) => {
        return (
          <React.Fragment key={user.id}>
            <li className="search-list-item">
              <Link to={`/user/${user.username}`}>
                <img
                  className="search-list-image"
                  src={renderProfile(user)}
                  alt="User image"
                />
                <span className="search-list-text">{user.username}</span>
              </Link>
            </li>
            <li className="divider"></li>
          </React.Fragment>
        );
      });
    }
  };

  const renderProfile = (user) => {
    if (user.images.length) {
      for (let i = 0; i < user.images.length; i++) {
        if (user.images[i].isAvatar) {
          return `${imgUrl}/${user.images[i].name}`;
        }
      }
    } else {
      return `${imgUrl}/user.png`;
    }
  };

  return (
    <div className="search-gen-div">
      <form>
        <div className="input-group">
          <input
            ref={inputRef}
            onChange={handleChange}
            type="text"
            className="form-control header-search-input"
            placeholder="Search for other users ..."
          />
          <span
            className="input-group-text header-search-icon"
            id="basic-addon1"
          >
            <BiSearchAlt />
          </span>
        </div>
      </form>
      {renderSearchBox()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.searchUsersReducer,
  };
};

export default connect(mapStateToProps, { searchUsers })(SearchInput);
