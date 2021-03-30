json.extract! user, :id, :first_name, :last_name, :email

if user.profile_pic.attached?
    json.profilePicUrl url_for(user.profile_pic)
end

if current_user && current_user.id == user.id
    likes = user.likes
    videoLikes = []

    likes.each do |like|
        if like.likeable_type == 'Video'
            videoLikes.push(like)
        end
    end

    
    json.videoLikes videoLikes
end