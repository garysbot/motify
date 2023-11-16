json.extract! song, :id, :artist_id, :album_id, :duration, :album_track_num, :title, :explicit, :created_at, :updated_at
json.url song_url(song, format: :json)
