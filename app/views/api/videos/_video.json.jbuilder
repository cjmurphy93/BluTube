json.extract! video, :id, :creator_id, :title, :description
json.videoUrl url_for(video.video_file)