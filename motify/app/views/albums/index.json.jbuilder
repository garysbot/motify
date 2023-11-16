# app/views/albums/index.json.jbuilder

json.array! @albums do |album|
  json.extract! album, :id, :title, :genre, :cover_img, :release_date, :record_company
  json.artist do
    artist = Artist.find(album.artist_id)
    json.extract! artist, :id, :artist_name, :verified
  end
end
