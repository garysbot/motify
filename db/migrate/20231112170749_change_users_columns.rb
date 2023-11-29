class ChangeUsersColumns < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :birth_date, :string, null: false
    add_column :users, :gender, :string, null: false
    add_column :users, :optinmarketing, :boolean, default: false
  end
end
