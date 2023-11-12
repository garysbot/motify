json.user do
  json.extract! @user, :id, :email, :username, :birth_date, :gender, :optinmarketing, :created_at, :updated_at
end

