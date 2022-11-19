import React, { useState, useEffect } from "react";

import { imgUrl } from "../../../redux/actions/actionTypes";

const PostImage = ({ headingImages, getImages, headingId, images }) => {
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (images.length) {
      setMainImage(`${imgUrl}/${images[0].name}`);
    }
  }, []);

  const handleClick = (e) => {
    setMainImage(e.target.src);
  };

  const renderImages = () => {
    if (images.length) {
      if (images.length <= 1) {
        return (
          <div>
            <img
              className="image-fluid main-image"
              src={`${imgUrl}/${images[0].name}`}
            />
          </div>
        );
      } else {
        return (
          <React.Fragment>
            <div className="col-8 post-images-left">
              <img src={mainImage} className="main-image" />
            </div>
            <div className="col-4 post-images-right">
              {images.map((image) => {
                return (
                  <div
                    key={image.id}
                    className="side-image-div mb-1"
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    <img
                      className="side-image"
                      src={`${imgUrl}/${image.name}`}
                    />
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        );
      }
    } else {
      return;
    }
  };

  return <div className="row post-images">{renderImages()}</div>;
};

export default PostImage;
