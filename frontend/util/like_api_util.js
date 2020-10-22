export const createVideoLike = (videoId, dislike) => {
    return $.ajax({
        method: 'POST',
        url: `/api/videos/${videoId}/likes`,
        data: { like: {
            likeable_type: 'Video',
            likeable_id: videoId,
            dislike: dislike
        }}
    });
};

export const removeVideoLike = (videoId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/videos/${videoId}/likes`,
    data: {
      like: {
        likeable_type: 'Video',
        likeable_id: videoId,
      },
    },
  });
};

export const createCommentLike = (commentId, dislike) => {
    return $.ajax({
        method: 'POST',
        url: `/api/comments/${commentId}/likes`,
        data: { like: {
            likeable_type: 'Comment',
            likeable_id: commentId,
            dislike: dislike
        }}
    });
};

export const removeCommentLike = (commentId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/comments/${commentId}/likes`,
    data: {
      like: {
        likeable_type: 'Comment',
        likeable_id: commentId,
      },
    },
  });
};