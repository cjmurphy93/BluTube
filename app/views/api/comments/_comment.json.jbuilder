json.extract! comment, :id, :body, :author_id, :commentable_type, :commentable_id
json.author comment.author
json.replies comment.comments do |reply|
    json.partial! '/api/comments/reply', reply: reply
end
jron.replyCount comment.comments.length