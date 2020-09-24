json.extract! user, :id, :first_name, :last_name, :email

if current_user && current_user.id == user.id
    likes = user.likes
    videoLikes = []

    likes.each do |like|
        if like.likeable_type == 'video'
            videoLikes.push(like)
        end
    end

    json.videoLikes videoLikes
end