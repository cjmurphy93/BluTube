json.extract! video, :id, :creator_id, :title, :description
json.videoUrl url_for(video.video_file)
json.numLikes video.likes.where(dislike: false).count
json.numDislikes video.likes.where(dislike: true).count
json.createdAt video.created_at

json.creator do
     json.partial! "api/users/user", user: video.creator
end 