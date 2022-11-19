import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { addHeadingImages } from "../../../redux/actions/headingAction";
import { getHeadingForUser } from "../../../redux/actions/headingAction";

const AddPostImage = (props) => {
  const [submit, setSubmit] = useState(false);
  // console.log(props);
  const handleImageUpload = (e) => {
    const images = e.target.files;
    const arr = [...images];
    for (let i = 0; i < arr.length; i++) {
      const formData = new FormData();
      formData.append("imageFile", arr[i]);
      props.addHeadingImages(formData, props.headingId);
    }
    // setSubmit(true);
    // props.setChange(props.change);
    // props.getHeadingForUser(props.userId);
  };

  console.log(props.addImage);

  const handleClick = () => {
    props.setChange(props.change);
    props.getHeadingForUser(props.userId);
  };

  useEffect(() => {
    if (props.addImage.data.status === 204) {
      props.setChange(props.change);
      props.getHeadingForUser(props.userId);
    }
  }, [props.addImage.data]);

  return (
    <div className="add-post p-3 mb-3">
      <div className="add-post-header">
        <h3>Add Images</h3>
      </div>
      <div className="add-post-body">
        <div className="mb-3">
          <span className="post-title">{props.title}</span>
        </div>
        <div className="add-post-body-btns">
          <div>
            <label htmlFor="imageInput" className="add-image-btn">
              <i className="fa-solid fa-camera me-2"></i>
              <span>Add an Image</span>
              <input
                multiple
                onChange={(e) => handleImageUpload(e)}
                accept="image/*"
                name="imageFiles"
                type="file"
                id="imageInput"
              />
            </label>
          </div>
          <div>
            <button onClick={handleClick} className="share-btn">
              No need
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    addImage: state.headingImagesReducer,
  };
};

export default connect(mapStateToProps, {
  addHeadingImages,
  getHeadingForUser,
})(AddPostImage);
