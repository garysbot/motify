class AddArtistIdToSongs < ActiveRecord::Migration[7.0]
  def change
    add_column :songs, :artist_id, :bigint, null: false
    add_index :songs, :artist_id
    add_column :songs, :album_id, :bigint, null: false
    add_index :songs, :album_id
    remove_column :songs, :artist, :bigint
    remove_column :songs, :album, :bigint
  end

end
