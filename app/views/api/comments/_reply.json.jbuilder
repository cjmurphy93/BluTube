json.extract! reply, :id, :body, :author_id, :commentable_type, :commentable_id
json.author do
    json.partial! "api/users/user", user: reply.author
end
json.parentCommentAuthor do
    json.partial! "api/users/user", user: reply.parent_comment_author
end

json.numLikes reply.likes.where(dislike: false).count
json.numDislikes reply.likes.where(dislike: true).count

if !!current_user 
     json.likedByCurrentUser !!reply.likes.find_by(user_id: current_user.id, dislike: false)

     json.dislikedByCurrentUser !!reply.likes.find_by(user_id: current_user.id, dislike: true)
end