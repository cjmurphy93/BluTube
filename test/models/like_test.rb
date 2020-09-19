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
require 'test_helper'

class LikeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
