class ImagesToPlaylistsAndSongs < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :user_prof_img, :string, null: false
    add_column :playlists, :playlist_cover_img, :string, null: false
    change_column :albums, :release_date, :datetime
  end
end
