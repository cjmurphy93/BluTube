import * as APIUtil from '../util/video_api_util';

export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS';
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export const DELETE_VIDEO = 'DELETE_VIDEO';
export const RECEIVE_VIDEO_ERRORS = 'RECEIVE_VIDEO_ERRORS';
export const CLEAR_ERRORS ='CLEAR_ERRORS';

const receiveVideos = videos => ({
    type: RECEIVE_VIDEOS,
    videos
});

const receiveVideo = video => ({
    type: RECEIVE_VIDEO,
    video
});

const receiveErrors = errors => ({
    type: RECEIVE_VIDEO_ERRORS,
    errors
});

const clearErrors = () => ({
    type: CLEAR_ERRORS
})

const deleteVideo = video => ({
    type: DELETE_VIDEO,
    video
})

const fetchVideos = () => dispatch (
    APIUtil.fetchVideos().then(videos => (
        dispatch(receiveVideos(videos))
    ))
);

const fetchVideo = id => dispatch (
    APIUtil.fetchVideo(id).then(video => (
        dispatch(receiveVideo(video))
    ))
);

const createVideo = video => dispatch (
    APIUtil.createVideo(video).then(video => (
        dispatch(receiveVideo(video))
       ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);

const updateVideo = video => dispatch (
    APIUtil.updateVideo(video).then(video => (
        dispatch(receiveVideo(video))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);

const destroyVideo = video => dispatch (
    APIUtil.destroyVideo(video).then(video => (
        dispatch(deleteVideo(video))
    ))
);