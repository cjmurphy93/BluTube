json.extract! video, :id, :creator_id, :title, :description
json.videoUrl url_for(video.video_file)
if video.thumbnail.attached?
     json.thumbnailUrl url_for(video.thumbnail)
end
json.numViews video.views.count
json.numLikes video.likes.where(dislike: false).count
json.numDislikes video.likes.where(dislike: true).count
json.createdAt video.created_at.strftime("%b %e, %Y")
json.timeSinceUpload video.time_since_upload

json.creator do
     json.partial! "api/users/user", user: video.creator
end

if !!current_user 
     json.likedByCurrentUser !!video.likes.find_by(user_id: current_user.id, dislike: false)

     json.dislikedByCurrentUser !!video.likes.find_by(user_id: current_user.id, dislike: true)
end