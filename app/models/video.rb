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
    has_one_attached :thumbnail

    belongs_to :creator,
    class_name: :User,
    primary_key: :id,
    foreign_key: :creator_id

    has_many :likes, as: :likeable
    
    has_many :comments, as: :commentable

    has_many :views,
    class_name: :View,
    primary_key: :id,
    foreign_key: :video_id

    def time_since_upload
        time_since = Time.now - Time.parse(self.created_at.to_s)
        minutes_since = (time_since / 1.minute).to_i
        hours_since = (time_since / 1.hour).to_i
        days_since = (time_since / 1.day).to_i
        weeks_since = (time_since / 1.week).to_i
        months_since = (time_since / 1.month).to_i
        years_since = (time_since / 1.year).to_i

        if years_since >= 1
            years_since === 1 ? "1 year ago" : "#{years_since} years ago"
        elsif months_since >= 1
            months_since === 1 ? "1 month ago" : "#{months_since} months ago"
        elsif weeks_since >= 1
            weeks_since === 1 ? "1 week ago" : "#{weeks_since} weeks ago"
        elsif days_since >= 1
            days_since === 1 ? "1 day ago" : "#{days_since} days ago"
        elsif hours_since >= 1
            hours_since === 1 ? "1 hour ago" : "#{hours_since} hours ago"
        elsif minutes_since >= 1
            minutes_since === 1 ? "1 minute ago" : "#{minutes_since} minutes ago"
        else
            "Just now"
        end
    end
end
