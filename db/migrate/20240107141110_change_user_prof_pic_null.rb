class ChangeUserProfPicNull < ActiveRecord::Migration[7.0]
  def change
    change_column :users, :user_prof_img, :string, null: true
  end
end
