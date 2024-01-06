json.array! @albums do |album|
  json.artist_name album.artist.artist_name
  json.extract! album, :id, :artist_id, :title, :genre, :cover_img, :release_date, :record_company, :songs
end
