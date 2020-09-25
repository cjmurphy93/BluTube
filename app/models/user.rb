# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    PASSWORD_REQUIREMENTS = /\A
        (?=.{8,}) # password length is >= 8
        (?=.*\d) # password has at least 1 number
        (?=.*[A-Za-z]) # password has at least 1 letter
    /x
    
    
    validates :first_name, :last_name, :email, :password_digest, :session_token, presence: true
    validates :email, :session_token, uniqueness: true
    validates :password, format: PASSWORD_REQUIREMENTS, allow_nil: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'is not a valid email address.' }

    after_initialize :ensure_session_token

    attr_reader :password

    has_many :created_videos,
    class_name: :Video,
    primary_key: :id,
    foreign_key: :creator_id

    has_many :likes

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user
        user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        generate_unique_session_token
        save!
        self.session_token
    end

    private

    def ensure_session_token
        generate_unique_session_token unless self.session_token
    end

    def new_session_token
        SecureRandom.urlsafe_base64
    end

    def generate_unique_session_token
        self.session_token = new_session_token
        while User.find_by(session_token: self.session_token)
            self.session_token = new_session_token
        end
        self.session_token
    end


end
