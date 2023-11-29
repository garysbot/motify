class RemoveAlbumTrackNumFromSongs < ActiveRecord::Migration[7.0]
  def change
    remove_column :songs, :album_track_num, :integer
  end
end
