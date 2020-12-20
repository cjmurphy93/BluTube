import * as APIUtil from "../util/video_api_util";

export const RECEIVE_VIDEOS = "RECEIVE_VIDEOS";
export const RECEIVE_VIDEO = "RECEIVE_VIDEO";
export const DELETE_VIDEO = "DELETE_VIDEO";
export const RECEIVE_VIDEO_ERRORS = "RECEIVE_VIDEO_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveVideos = (videos) => ({
  type: RECEIVE_VIDEOS,
  videos,
});

export const receiveVideo = (video) => ({
  type: RECEIVE_VIDEO,
  video,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_VIDEO_ERRORS,
  errors,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const deleteVideo = (video) => ({
  type: DELETE_VIDEO,
  video,
});

export const fetchVideos = () => (dispatch) =>
  APIUtil.fetchVideos().then((videos) => dispatch(receiveVideos(videos)));

export const fetchVideo = (id) => (dispatch) =>
  APIUtil.fetchVideo(id).then((video) => dispatch(receiveVideo(video)));

export const createVideo = (video) => (dispatch) =>
  APIUtil.createVideo(video).then(
    (video) => dispatch(receiveVideo(video)),
    (err) => dispatch(receiveErrors(err.responseJSON))
  );

export const updateVideo = (video, id) => (dispatch) =>
  APIUtil.updateVideo(video, id).then(
    (video) => dispatch(receiveVideo(video)),
    (err) => dispatch(receiveErrors(err.responseJSON))
  );

export const destroyVideo = (video) => (dispatch) =>
  APIUtil.destroyVideo(video).then((video) => dispatch(deleteVideo(video)));

export const searchVideos = (query) => (dispatch) =>
  APIUtil.searchVideos(query).then((results) => {
    dispatch(receiveVideos(results));
  });
