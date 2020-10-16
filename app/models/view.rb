# == Schema Information
#
# Table name: views
#
#  id         :bigint           not null, primary key
#  video_id   :integer          not null
#  ip_address :string           not null
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class View < ApplicationRecord
    validates :video_id, :ip_address, presence: true

    belongs_to :user,
    class_name: :User,
    primary_key: :id,
    foreign_key: :user_id

    belongs_to :video,
    class_name: :Video,
    primary_key: :id,
    foreign_key: :video_id
end
