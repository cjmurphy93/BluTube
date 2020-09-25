# == Schema Information
#
# Table name: videos
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :text
#  creator_id  :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Video < ApplicationRecord
    validates :title, :creator_id, presence: true

    has_one_attached :video_file

    belongs_to :creator,
    class_name: :User,
    primary_key: :id,
    foreign_key: :creator_id

    has_many :likes, as: :likeable
    
end
