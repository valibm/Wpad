import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import { getTrends } from "../../../redux/actions/headingAction";

const Trending = (props) => {
  useEffect(() => {
    props.getTrends();
  }, []);

  const renderPosts = () => {
    if (props.headings.data.length) {
      return props.headings.data.map((post) => {
        return (
          <div key={post.id} className="trend-post">
            <Link to={`/entry/${post.id}`} className="trend-title">
              {post.title}
            </Link>
            <div className="trend-stats">
              <span className="trend-views">
                <i className="fa-regular fa-eye mx-1"></i> {post.channel.name}
              </span>
              <span className="trend-time-ago">
                <span className="single-dot mx-1"></span>
                <TimeAgo date={post.createdDate} />
              </span>
            </div>
          </div>
        );
      });
    } else {
      return <span>There's no trending post for today.</span>;
    }
  };

  return (
    <div className="trending-today p-3 mb-4">
      <h3>Trending today</h3>
      {renderPosts()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    headings: state.getTrends,
  };
};

export default connect(mapStateToProps, { getTrends })(Trending);
