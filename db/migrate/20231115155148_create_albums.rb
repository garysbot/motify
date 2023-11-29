class CreateAlbums < ActiveRecord::Migration[7.0]
  def change
    # Creating the artists table
    create_table :artists do |t|
      t.string :artist_name, null: false, index: { unique: true }
      t.string :genre, null: false
      t.boolean :verified, null: false, default: false
      t.text :about_blurb, null: false
      t.string :about_img, null: false
      t.bigint :global_ranking
      t.bigint :monthly_listeners

      t.timestamps
    end

    # Creating the albums table
    create_table :albums do |t|
      t.references :artist, null: false, foreign_key: true
      t.string :title, null: false, index: { unique: true }
      t.string :genre, null: false
      t.string :cover_img, null: false
      t.bigint :release_date, null: false
      t.string :record_company

      t.timestamps
    end
  end
end
