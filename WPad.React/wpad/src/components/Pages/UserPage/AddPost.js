import React, { useEffect, useState } from "react";
import Select from "react-select";
import { connect } from "react-redux";

import { getAllChannels } from "../../../redux/actions/channelAction";
import { postHeading } from "../../../redux/actions/headingAction";
import AddPostImage from "./AddPostImage";

const AddPost = (props) => {
  const loggedUser = JSON.parse(localStorage.getItem("loginUser"));
  const defaultPostState = {
    title: "",
    content: "",
    channelId: "",
    appUserId: loggedUser.id,
  };
  const [channelOptions, setChannelOptions] = useState([]);
  const [postState, setPostState] = useState(defaultPostState);
  const [change, setChange] = useState(true);
  const [formErrors, setFormErrors] = useState({ title: "", channelId: "" });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostState({ ...postState, ...{ [name]: value } });
  };

  const handleSubmit = (e) => {
    setFormErrors(validate(postState));
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
    props.getChannel();
  }, []);

  useEffect(() => {
    if (!(Object.keys(props.channels.data) == 0)) {
      setChannelOptions(
        props.channels.data.map((channel) => {
          return { value: `${channel.id}`, label: `${channel.name}` };
        })
      );
    }
  }, [props.channels]);

  console.log(props.channels);

  useEffect(() => {
    if (!formErrors.title && !formErrors.channelId && isSubmit) {
      // setPostState({ ...postState, ...{ appUserId: loggedUser.id } });
      props.shareHeading(postState);
      setChange(!change);
    }
  }, [formErrors, isSubmit]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#fafafa",
      width: "100%",
      padding: "0.25rem 0",
      fontSize: "16px",
      border: "1px solid #eee",
    }),
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.channelId) {
      errors.channelId = "Channel is required";
    }
    return errors;
  };

  if (change) {
    return (
      <div className="add-post p-3 mb-3">
        <div className="add-post-header">
          <h3>Share a new heading</h3>
        </div>
        <div className="add-post-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                className="input-st"
                name="title"
                onChange={handleChange}
                placeholder="Title(Required)"
                type="text"
              />
              <span className="validation">
                {formErrors ? formErrors.title : ""}
              </span>
            </div>
            <div className="mb-3">
              <div>
                <textarea
                  name="content"
                  onChange={handleChange}
                  className="about-textArea"
                  placeholder="Text"
                ></textarea>
              </div>
            </div>
            <div className="mb-3">
              <Select
                placeholder="Choose a channel..."
                onChange={(e) => {
                  setPostState({
                    ...postState,
                    ...{ channelId: e.value },
                  });
                }}
                options={channelOptions}
                styles={customStyles}
              />
              <span className="validation">
                {formErrors ? formErrors.channelId : ""}
              </span>
            </div>
            <div
              style={{ justifyContent: "flex-end" }}
              className="mb-3 add-post-body-btns"
            >
              <div>
                <button type="submit" className="share-btn">
                  Share
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
  if (props.heading.data.data) {
    return (
      <AddPostImage
        setChange={(change) => {
          setChange(!change);
        }}
        title={props.heading.data.data.title}
        headingId={props.heading.data.data.id}
        userId={loggedUser.id}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    channels: state.getAllChannelsReducer,
    heading: state.postHeadingReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shareHeading: (headingState) => {
      dispatch(postHeading(headingState));
    },
    getChannel: () => {
      dispatch(getAllChannels());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
