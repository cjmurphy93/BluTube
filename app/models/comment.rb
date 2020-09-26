# == Schema Information
#
# Table name: comments
#
#  id               :bigint           not null, primary key
#  body             :text             not null
#  author_id        :integer          not null
#  commentable_type :string           not null
#  commentable_id   :bigint           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Comment < ApplicationRecord
    validates :body, :author_id, :commentable_type, :commentable_id, presence: true

    belongs_to :author,
    class_name: :User,
    primary_key: :id,
    foreign_key: :author_id

    belongs_to :commentable, polymorphic: true

    has_many :comments, as: :commentable

    has_many :likes, as: :likeable

    def parent_comment_author
        Comment.find(self.commentable_id).author
    end

    # def total_comments_on_video
    #     video = Video.find(self.commentable_id)
    #     video.total_comments
    # end
end
