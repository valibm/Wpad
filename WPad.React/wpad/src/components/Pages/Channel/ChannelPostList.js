import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { getForChannel } from "../../../redux/actions/headingAction";
import Post from "../Home/Post";

const ChannelPostList = (props) => {
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);
  const { id } = useParams();

  useEffect(() => {
    props.getForChannel(id, 1);
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
    props.getForChannel(id, page);
    setpage(page + 1);
  };

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
            page={"channel"}
          />
        );
      })}
    </InfiniteScroll>
  );
};

const mapStateToProps = (state) => {
  return {
    headings: state.getForChannelReducer,
  };
};

export default connect(mapStateToProps, { getForChannel })(ChannelPostList);
