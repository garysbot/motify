json.extract! @song, :id, :duration, :title, :explicit
json.album_title @song.album.title
json.artist_name @song.artist.artist_name
