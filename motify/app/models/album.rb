class Album < ApplicationRecord
  # Associations
  belongs_to :artist
  has_many :songs, dependent: :destroy

  # Validations
  validates :title, presence: true, uniqueness: true
  validates :genre, presence: true
  validates :cover_img, presence: true
  validates :release_date, presence: true
  validates :artist_id, presence: true
end
