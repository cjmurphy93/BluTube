json.extract! comment, :id, :body, :author_id, :commentable_type, :commentable_id
json.author do
    json.partial! "api/users/user", user: comment.author
end
json.replies comment.comments do |reply|
    json.partial! '/api/comments/reply', reply: reply
end
json.replyCount comment.comments.length