class Artist < ApplicationRecord
  # Associations
  has_many :albums, dependent: :destroy
  has_many :songs, dependent: :destroy

  # Validations
  validates :artist_name, presence: true, uniqueness: true
  validates :about_blurb, presence: true
  validates :about_img, presence: true

  def self.search(query)
    where("artist_name ILIKE ?", "%#{query}%")
  end
end
