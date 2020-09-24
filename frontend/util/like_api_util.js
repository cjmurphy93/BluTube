import { $CombinedState } from "redux"

export const createVideoLike = (videoId, dislike) => {
    return $.ajax({
        method: 'POST',
        url: `api/videos/${videoId}/likes`,
        data: { like: {
            likeable_type: 'video',
            likeable_id: videoId,
            dislike,
        }}
    });
};

export const removeVideoLike = (videoId) => {
  return $.ajax({
    method: 'DELETE',
    url: `api/videos/${videoId}/likes`,
    data: {
      like: {
        likeable_type: 'video',
        likeable_id: videoId,
      },
    },
  });
};