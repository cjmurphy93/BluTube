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
require 'test_helper'

class ViewTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
