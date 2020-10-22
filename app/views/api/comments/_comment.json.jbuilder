json.extract! comment, :id, :body, :author_id, :commentable_type, :commentable_id
json.author do
    json.partial! "api/users/user", user: comment.author
end
json.replies comment.comments do |reply|
    json.partial! '/api/comments/reply', reply: reply
end
json.replyCount comment.comments.length

json.numLikes comment.likes.where(dislike: false).count
json.numDislikes comment.likes.where(dislike: true).count

if !!current_user 
     json.likedByCurrentUser !!comment.likes.find_by(user_id: current_user.id, dislike: false)

     json.dislikedByCurrentUser !!comment.likes.find_by(user_id: current_user.id, dislike: true)
end