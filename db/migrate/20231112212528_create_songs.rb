class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.bigint :artist, null: false, foreign_key: true, index: true
      t.bigint :album, null: false, foreign_key: true, index: true
      t.integer :duration, null: false
      t.integer :album_track_num, null: false
      t.string :title, null: false
      t.boolean :explicit, null: false

      t.timestamps
    end
  end
end
