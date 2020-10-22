json.partial! "api/likes/like", like: @like

if @like.likeable_type == "Video"
    json.video do
        json.partial! 'api/videos/video', video: @like.likeable
    end
end

if @like.likeable_type == "Comment"
    json.comment do
        json.partial! 'api/comments/comment', comment: @like.likeable
    end
end