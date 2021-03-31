@users.each do |user|
    json.set! user.id do
        json.extract! user, :id, :first_name, :last_name
        if user.profile_pic.attached?
            json.profilePicUrl url_for(user.profile_pic)
        end
    end
end