class ChangeAlbumsReleaseDateToDateTime < ActiveRecord::Migration[7.0]
  def change
    remove_column :albums, :release_date
    add_column :albums, :release_date, :datetime
  end
end
