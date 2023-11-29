class CreatePlaylists < ActiveRecord::Migration[7.0]
  def change
    create_table :playlists, id: :bigint, primary_key: :id do |t|
      t.bigint :user_id, null: false
      t.string :title, null: false
      t.timestamps
    end

    add_foreign_key :playlists, :users, column: :user_id
    add_index :playlists, :user_id
  end
end
