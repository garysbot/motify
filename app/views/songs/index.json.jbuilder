json.array! @songs do |song|
  json.extract! song, :id, :duration, :title, :explicit, :song_url
  json.album_title song.album.title
  json.artist_name song.artist.artist_name
  json.cover_img song.album.cover_img
end
