class User < ApplicationRecord
  has_secure_password
  before_validation :ensure_session_token

  validates :username,
    uniqueness: true, 
    length: { in: 3..30 },
    format: { without: URI::MailTo::EMAIL_REGEXP, message: "Username can't be the same as your email address" }
  
  validates :email, 
    uniqueness: true,
    length: { in: 3..255 },
    format: { with: URI::MailTo::EMAIL_REGEXP }
  
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  has_many :playlists


  def self.find_by_credentials(credential, password)
    # Determine the field you need to query
    field = credential.match?(URI::MailTo::EMAIL_REGEXP) ? :email : :username
    
    # Find the user whose email/username is equal to `credential`
    user = User.find_by(field => credential)
    
    # Return falsey value if no such user exists or if password is incorrect
    user && user.authenticate(password) ? user : nil
  end

  def reset_session_token!
      self.session_token = SecureRandom::urlsafe_base64
      self.save!
      self.session_token
  end


  private

  def generate_unique_session_token
    loop do
      session_token = SecureRandom::urlsafe_base64
      return session_token unless @user.exists?(session_token: session_token)
    end
  end

  def ensure_session_token
      self.session_token ||= SecureRandom::urlsafe_base64
  end



end
