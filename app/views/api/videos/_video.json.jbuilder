json.extract! video, :id, :creator_id, :title, :description
json.videoUrl url_for(video.video_file)
json.creator do
     json.partial! "api/users/user", user: video.creator
end 