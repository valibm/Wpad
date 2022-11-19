import { combineReducers } from "redux";
import { getAllChannelsReducer } from "./reducers/channelReducer";
import { registerReducer, loginReducer } from "./reducers/authReducer";
import {
  userReducer,
  updateUserReducer,
  changeAvatarReducer,
  changeCoverReducer,
  userImagesReducer,
  checkFollowReducer,
  checkFollowRangeReducer,
  followUserReducer,
  unfollowUserReducer,
  getFollowersReducer,
  getFolloweesReducer,
  checkFolloweeRangeReducer,
  searchUsersReducer,
} from "./reducers/userReducer";
import {
  postHeadingReducer,
  headingImagesReducer,
  headingForUserReducer,
  getHeadingImagesReducer,
  handleLikeReducer,
  headingReducer,
  headingCountReducer,
  getBrowseHeadingsReducer,
  getBrowseFollowingReducer,
  searchHeadingsReducer,
  getForChannelReducer,
  searchForChannelReducer,
  getTrends,
  removeHeading,
} from "./reducers/headingReducer";
import {
  commentForHeadingReducer,
  commentUserImageReducer,
  postCommentReducer,
} from "./reducers/commentReducer";
import {
  replyForCommentReducer,
  postReplyReducer,
} from "./reducers/repliesReducer";

const rootReducer = combineReducers({
  getAllChannelsReducer,
  registerReducer,
  loginReducer,
  userReducer,
  updateUserReducer,
  changeAvatarReducer,
  changeCoverReducer,
  userImagesReducer,
  postHeadingReducer,
  headingImagesReducer,
  headingForUserReducer,
  getHeadingImagesReducer,
  handleLikeReducer,
  headingReducer,
  commentForHeadingReducer,
  commentUserImageReducer,
  replyForCommentReducer,
  postCommentReducer,
  postReplyReducer,
  checkFollowReducer,
  checkFollowRangeReducer,
  followUserReducer,
  unfollowUserReducer,
  getFollowersReducer,
  headingCountReducer,
  getFolloweesReducer,
  checkFolloweeRangeReducer,
  getBrowseHeadingsReducer,
  getBrowseFollowingReducer,
  searchUsersReducer,
  searchHeadingsReducer,
  getForChannelReducer,
  searchForChannelReducer,
  getTrends,
  removeHeading,
});

export default rootReducer;
