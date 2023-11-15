class Song < ApplicationRecord
  # Associations
  belongs_to :artist
  belongs_to :album
  has_many :playlists_songs
  has_many :playlists, through: :playlists_songs
  has_many :liked_songs
  has_many :users, through: :liked_songs

  # Validations
  validates :artist_id, presence: true
  validates :album_id, presence: true
  validates :length, presence: true
  validates :title, presence: true
  validates :explicit, inclusion: { in: [true, false] }
end
