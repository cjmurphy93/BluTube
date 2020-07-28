# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    validates :username, :email, :password_digest, :session_token, presence: true
    validates :username, :email, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true
    after_initialize :ensure_session_token

    attr_reader :password

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return user if user && user.is_password?(password)
        nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = User.generate_unique_session_token
        self.save!
        self.session_token
    end

    private

    def ensure_session_token
        self.session_token ||= self.class.generate_unique_session_token
    end

    def generate_unique_session_token
        self.session_token = SecureRandom.urlsafe_base64
        while User.find_by(session_token: self.session_token)
            self.session_token = SecureRandom.urlsafe_base64
        end
        self.session_token
    end


end
