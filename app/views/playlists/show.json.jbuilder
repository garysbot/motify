# app/views/playlists/show.json.jbuilder
json.extract! @playlist, :id, :title, :user_id, :created_at, :updated_at
json.songs @playlist.songs, :id, :title, :duration, :artist_id, :album_id
