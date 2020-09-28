json.extract! reply, :id, :body, :author_id, :commentable_type, :commentable_id
json.author reply.author
json.parentCommentAuthor reply.parent_comment_author