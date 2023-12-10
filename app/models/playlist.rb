class Playlist < ApplicationRecord
  belongs_to :user
  has_many :playlists_songs
  has_many :songs, through: :playlists_songs
  accepts_nested_attributes_for :songs

  validates :user_id, presence: true
  validates :title, presence: true

  def self.search(query)
    where("title ILIKE ?", "%#{query}%")
  end
end