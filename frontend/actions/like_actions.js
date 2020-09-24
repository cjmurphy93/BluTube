import * as APIUtil from '../util/like_api_util';

export const CREATE_VIDEO_LIKE = 'CREATE_VIDEO_LIKE';
export const REMOVE_VIDEO_LIKE = 'REMOVE_VIDEO_LIKE';

export const createVideoLike = (videoId, dislike) => dispatch => {
    return APIUtil.createVideoLike(videoId, dislike).then(payload => {
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