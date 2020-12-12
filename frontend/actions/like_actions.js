import * as APIUtil from "../util/like_api_util";

export const CREATE_VIDEO_LIKE = "CREATE_VIDEO_LIKE";
export const REMOVE_VIDEO_LIKE = "REMOVE_VIDEO_LIKE";
export const CREATE_COMMENT_LIKE = "CREATE_COMMENT_LIKE";
export const REMOVE_COMMENT_LIKE = "REMOVE_COMMENT_LIKE";

export const createVideoLike = (videoId, dislike) => (dispatch) => {
  return APIUtil.createVideoLike(videoId, dislike).then((payload) => {
    dispatch({
      type: CREATE_VIDEO_LIKE,
      payload,
    });
  });
};

export const deleteVideoLike = (videoId) => (dispatch) => {
  return APIUtil.removeVideoLike(videoId).then((payload) => {
    dispatch({
      type: REMOVE_VIDEO_LIKE,
      payload,
    });
  });
};

export const createCommentLike = (commentId, dislike) => (dispatch) => {
  return APIUtil.createCommentLike(commentId, dislike).then((payload) => {
    dispatch({
      type: CREATE_COMMENT_LIKE,
      payload,
    });
  });
};

export const deleteCommentLike = (commentId) => (dispatch) => {
  return APIUtil.removeCommentLike(commentId).then((payload) => {
    dispatch({
      type: REMOVE_COMMENT_LIKE,
      payload,
    });
  });
};
