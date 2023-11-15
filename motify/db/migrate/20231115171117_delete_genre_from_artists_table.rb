class DeleteGenreFromArtistsTable < ActiveRecord::Migration[7.0]
  def change
    remove_column :artists, :genre, :string
  end
end
