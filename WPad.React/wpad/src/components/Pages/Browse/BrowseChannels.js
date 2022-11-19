import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { imgUrl } from "../../../redux/actions/actionTypes";
import { getAllChannels } from "../../../redux/actions/channelAction";
import Footer from "../../Header/Footer";

const BrowseChannels = (props) => {
  useEffect(() => {
    props.getAllChannels();
  }, []);

  const renderChannels = () => {
    if (Array.isArray(props.channels.data) && props.channels.data.length) {
      return props.channels.data.map((channel) => {
        return (
          <div className="col">
            <Link
              to={`/channels/${channel.id}`}
              className="channel-card"
              style={{
                backgroundImage: `url(${imgUrl}/${channel.image.name})`,
              }}
            >
              {channel.name}
              <span>{channel.description}</span>
            </Link>
          </div>
        );
      });
    }
  };

  return (
    <>
      <div className="container browse-g mb-5">
        <h1 className="browse-title g-lg-3 g-2">Browse Channels</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-2 g-lg-3 channel-list">
          {renderChannels()}
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return { channels: state.getAllChannelsReducer };
};

export default connect(mapStateToProps, { getAllChannels })(BrowseChannels);
