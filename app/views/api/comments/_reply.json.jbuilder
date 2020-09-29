json.extract! reply, :id, :body, :author_id, :commentable_type, :commentable_id
json.author do
    json.partial! "api/users/user", user: reply.author
end
json.parentCommentAuthor do
    json.partial! "api/users/user", user: reply.parent_comment_author
end