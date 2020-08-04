json.array! @videos do |video|
    json.partial! 'api/videos/video', video: video
    json.videoUrl url_for(video.video_file)
end