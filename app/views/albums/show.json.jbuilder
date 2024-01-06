json.extract! @album, :id, :artist_id, :title, :genre, :cover_img, :release_date, :record_company
json.artist_name @album.artist.artist_name

# # Adding songs array
json.songs @album.songs do |song|
  json.extract! song, :id, :duration, :title, :explicit, :song_url, :artist_id, :album_id
end
