# json.user do
#   json.extract! @user, :id, :email, :username, :birth_date, :gender, :optinmarketing, :created_at, :updated_at
# end

playlists = @user.playlists
# ! Updated to add playlists array to User object slice
json.user do
  json.extract! @user, :id, :email, :username, :birth_date, :gender, :optin_marketing, :created_at, :updated_at
  # Adding the playlists array
  json.playlists playlists
end
