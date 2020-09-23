# == Schema Information
#
# Table name: likes
#
#  id            :bigint           not null, primary key
#  user_id       :integer          not null
#  dislike       :boolean          default(FALSE)
#  likeable_type :string           not null
#  likeable_id   :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Like < ApplicationRecord
    validates :user_id, :likeable_type, :likeable_id, presence: true
    validates :user_id, uniqueness: { scope: [:likeable_type, :likeable_id] 
    validates :dislike, inclusion: { in: [true, false] }

    belongs_to :user

    belongs_to :likeable, polymorphic: true
end
